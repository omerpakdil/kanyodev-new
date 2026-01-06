import { getPage, delay } from "../utils/browser.js";
import { extractEmails } from "../utils/parser.js";

interface MarmaraCompany {
    name: string;
    website: string | null;
    email: string | null;
    phone: string | null;
    sector: string;
    city: string;
}

export async function scrapeMarmaraTeknokent(): Promise<MarmaraCompany[]> {
    console.log(`🔍 Scraping Marmara Teknokent...`);

    const page = await getPage();
    const companies: MarmaraCompany[] = [];
    const url = "https://marmarateknokent.com.tr/firmalar/";

    try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        await delay(2000);

        // Extract all company cards from the page
        const companyData = await page.evaluate(() => {
            const results: { name: string; website: string | null; phone: string | null; sector: string }[] = [];

            // Find all h3 elements which contain company names
            const headings = document.querySelectorAll("h3");

            headings.forEach((h3) => {
                const link = h3.querySelector("a");
                if (!link) return;

                const name = link.textContent?.trim() || "";
                let website = link.getAttribute("href") || null;

                // Clean website URL - remove #new_tab suffix
                if (website) {
                    website = website.replace(/#new_tab$/, "").trim();
                    // Skip if it's just a hash or internal link
                    if (website === "#" || website.startsWith("#") || !website.includes(".")) {
                        website = null;
                    }
                }

                // Try to find category/sector - look for text before the heading
                let sector = "Teknoloji";
                const parent = h3.parentElement;
                if (parent) {
                    const prevSibling = h3.previousElementSibling;
                    if (prevSibling && prevSibling.textContent) {
                        const sectorText = prevSibling.textContent.trim();
                        if (sectorText && sectorText.length < 50) {
                            sector = sectorText;
                        }
                    }
                }

                // Try to find phone from nearby text
                let phone: string | null = null;
                const cardText = parent?.textContent || "";
                const phoneMatch = cardText.match(/Telefon\s*:\s*([\d\s\-\+\(\)]+)/i);
                if (phoneMatch) {
                    phone = phoneMatch[1].trim();
                }

                if (name && website) {
                    results.push({ name, website, phone, sector });
                }
            });

            return results;
        });

        console.log(`  📦 Found ${companyData.length} companies with websites`);

        // Now visit each company website to extract email
        for (const company of companyData) {
            if (!company.website) continue;

            console.log(`  🕷️ Checking: ${company.name} - ${company.website}`);

            try {
                const email = await scrapeEmailFromWebsite(company.website);

                if (email) {
                    console.log(`    ✅ Found email: ${email}`);
                    companies.push({
                        name: company.name,
                        website: company.website,
                        email,
                        phone: company.phone,
                        sector: company.sector,
                        city: "İstanbul"
                    });
                } else {
                    console.log(`    ⏭️ No email found`);
                }

                await delay(1000); // Rate limiting between requests
            } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                console.log(`    ❌ Error: ${msg.slice(0, 80)}`);
            }
        }

    } catch (error) {
        console.error("❌ Error scraping Marmara Teknokent:", error);
    } finally {
        await page.close();
    }

    console.log(`  ✅ Total companies with emails: ${companies.length}`);
    return companies;
}

async function scrapeEmailFromWebsite(websiteUrl: string): Promise<string | null> {
    const page = await getPage();

    try {
        // Ensure URL has protocol
        let url = websiteUrl;
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
        await delay(1500);

        // Get initial page HTML
        let html = await page.content();
        let emails = extractEmails(html);

        if (emails.length > 0) {
            return filterBestEmail(emails);
        }

        // Try to find and click contact link
        const contactSelectors = [
            'a[href*="iletisim"]',
            'a[href*="contact"]',
            'a[href*="bize-ulasin"]',
            'a[href*="bize_ulasin"]',
            'a[href*="bizeulasin"]',
            'a[href*="hakkimizda"]',
            'a:has-text("İletişim")',
            'a:has-text("Contact")',
            'a:has-text("Bize Ulaşın")'
        ];

        for (const selector of contactSelectors) {
            try {
                const contactLink = await page.$(selector);
                if (contactLink) {
                    const href = await contactLink.evaluate(el => el.getAttribute("href"));

                    // If it's a valid link, navigate to it
                    if (href && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
                        let contactUrl = href;
                        if (!contactUrl.startsWith("http")) {
                            const baseUrl = new URL(url);
                            contactUrl = new URL(href, baseUrl.origin).toString();
                        }

                        await page.goto(contactUrl, { waitUntil: "domcontentloaded", timeout: 10000 });
                        await delay(1000);

                        html = await page.content();
                        emails = extractEmails(html);

                        if (emails.length > 0) {
                            return filterBestEmail(emails);
                        }
                    }
                    break;
                }
            } catch (e) {
                // Continue trying other selectors
            }
        }

        // Last resort: check for mailto links
        const mailtoEmail = await page.evaluate(() => {
            const mailtoLink = document.querySelector('a[href^="mailto:"]');
            if (mailtoLink) {
                const href = mailtoLink.getAttribute("href");
                return href?.replace("mailto:", "").split("?")[0] || null;
            }
            return null;
        });

        if (mailtoEmail) {
            return mailtoEmail;
        }

        return null;

    } catch (error) {
        return null;
    } finally {
        try {
            if (!page.isClosed()) await page.close();
        } catch (e) { }
    }
}

function filterBestEmail(emails: string[]): string | null {
    if (emails.length === 0) return null;

    // Prefer info@, contact@, iletisim@, hello@ emails
    const preferredPrefixes = ["info", "contact", "iletisim", "hello", "destek", "support"];

    for (const prefix of preferredPrefixes) {
        const match = emails.find(e => e.toLowerCase().startsWith(prefix + "@"));
        if (match) return match;
    }

    // Filter out noreply, no-reply emails
    const filtered = emails.filter(e => {
        const lower = e.toLowerCase();
        return !lower.includes("noreply") && !lower.includes("no-reply") && !lower.includes("mailer-daemon");
    });

    return filtered[0] || emails[0];
}
