import { getPage, delay, closeBrowser } from "./utils/browser.js";
import { extractEmails, extractPhones, cleanWebsiteUrl } from "./utils/parser.js";
import { insertCompany, checkCompanyExists } from "../db/queries.js";
import { config } from "../config/index.js";
import { scrapeGoogleMaps } from "./sources/google-maps.js";
import { scrapeTudoksad } from "./sources/tudoksad.js";
import { scrapeOdtuTeknokent } from "./sources/odtu.js";
import { scrapeAriTeknokent } from "./sources/ari-teknokent.js";

// Scrape from company website to get email
export async function scrapeCompanyWebsite(url: string): Promise<{
    email: string | null;
    phone: string | null;
    content: string;
}> {
    const page = await getPage();

    try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
        await delay(2000);

        const html = await page.content();

        // Safety check for page handle
        if (page.isClosed()) throw new Error("Page closed unexpectedly");

        const contactLink = await page.$('a[href*="iletisim"], a[href*="contact"], a[href*="bize-ulasin"]');
        if (contactLink) {
            try {
                await contactLink.click();
                await delay(2000);
            } catch (e) {
                console.log(`    ⚠️ Could not click contact link: ${e instanceof Error ? e.message : String(e)}`);
            }
        }

        const contactHtml = await page.content();
        const fullHtml = html + contactHtml;

        const emails = extractEmails(fullHtml);
        const phones = extractPhones(fullHtml);

        const textContent = await page.evaluate(() => {
            const body = document.body;
            const scripts = body.querySelectorAll("script, style, noscript");
            scripts.forEach((s) => s.remove());
            return body.innerText.slice(0, 10000);
        });

        return {
            email: emails[0] || null,
            phone: phones[0] || null,
            content: textContent,
        };
    } catch (error) {
        // Suppress common navigation errors
        const msg = error instanceof Error ? error.message : String(error);
        if (!msg.includes("Node is either not clickable")) {
            console.error(`❌ Error scraping ${url}:`, msg.slice(0, 100));
        }
        return { email: null, phone: null, content: "" };
    } finally {
        try {
            if (page && !page.isClosed()) await page.close();
        } catch (e) { }
    }
}

export async function runScraper(sources: { sector: string; city: string }[]) {
    console.log("🚀 Starting scraper...");

    let totalScraped = 0;

    for (const source of sources) {
        let companies: any[] = [];
        let sourceName = "google_maps"; // Default

        if (source.sector === "TUDOKSAD") {
            companies = await scrapeTudoksad();
            sourceName = "tudoksad";
        } else if (source.sector === "ODTU") {
            companies = await scrapeOdtuTeknokent();
            sourceName = "odtu";
        } else if (source.sector === "ARI") {
            companies = await scrapeAriTeknokent();
            sourceName = "ari_teknokent";
        } else {
            companies = await scrapeGoogleMaps(source.sector, source.city, 10);
            sourceName = "google_maps";
        }

        for (const company of companies) {
            // Check if already exists in DB to save time
            // Only check if we are in ODTU or Tudoksad mode where we re-scrape list every time?
            // Actually good for all.
            const exists = await checkCompanyExists(company.website, company.name);
            if (exists) {
                console.log(`  ⏭️ Skipped (Already in DB): ${company.name}`);
                continue;
            }

            // Filter: check mostly for website, but allow if email exists (e.g. from Tudoksad list directly)

            const hasWebsite = !!company.website;
            const hasEmail = !!company.email;

            if (!hasWebsite && !hasEmail) {
                console.log(`  ⏭️ Skipped (No Web/Email): ${company.name}`);
                continue;
            }

            try {
                // If website found, try to scrape email from it if we don't have one
                let webEmail = null;
                if (company.website && !company.email) {
                    console.log(`    🕷️ Scraping website for email: ${company.website}`);
                    const { email } = await scrapeCompanyWebsite(company.website);
                    if (email) {
                        webEmail = email;
                        console.log(`    📧 Found email: ${email}`);
                    }
                }

                // IMPORTANT: Exclude address manually to prevent "column not found" error if schema is not updated
                // AND exclude source_url if present in company object but not in table
                const { address, source_url, ...companyData } = company as any;

                const finalEmail = company.email || webEmail;

                if (!finalEmail) {
                    console.log(`  ⏭️ Skipped (No Email): ${company.name}`);
                    continue;
                }

                await insertCompany({
                    ...companyData,
                    email: finalEmail,
                    source: sourceName,
                    scraped_at: new Date().toISOString(),
                });
                totalScraped++;
                console.log(`  ✅ Saved: ${company.name}`);
            } catch (error: any) {
                if (error.code === "23505") { // Unique violation
                    console.log(`  ⏭️  Skipped (duplicate): ${company.name}`);
                } else {
                    console.error(`  ❌ Error saving ${company.name}:`, error.message);
                }
            }
        }
    }

    await closeBrowser();
    console.log(`\n✨ Scraping complete. Total: ${totalScraped} companies`);

    return totalScraped;
}
