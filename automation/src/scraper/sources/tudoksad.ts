import { getPage, delay } from "../utils/browser.js";
import { cleanWebsiteUrl } from "../utils/parser.js";

interface ScrapedCompany {
    name: string;
    website: string | null;
    phone: string | null;
    address: string | null;
    email: string | null;
    sector: string;
    city: string;
}

export async function scrapeTudoksad(startPage = 1, endPage = 15) {
    console.log(`🔍 Scraping Tudoksad Academy (Pages ${startPage}-${endPage})`);

    const page = await getPage();
    const companies: ScrapedCompany[] = [];

    try {
        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
            const url = `https://akademi.tudoksad.org.tr/company/index?lang=tr&page=${pageNum}`;
            console.log(`  📄 Processing Page ${pageNum}: ${url}`);

            try {
                await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
                // Check if page has any rows
                const hasRows = await page.$("table tbody tr");
                if (!hasRows) {
                    console.log("    ⚠️ No rows found. Stopping pagination.");
                    break;
                }

                const pageCompanies = await page.evaluate(() => {
                    // @ts-ignore
                    const rows = Array.from(document.querySelectorAll("table tbody tr"));

                    return rows.map(row => {
                        const cells = row.querySelectorAll("td");
                        if (cells.length < 3) return null;

                        const name = cells[1]?.textContent?.trim() || "";
                        const detailsCell = cells[2];
                        const detailsHtml = detailsCell.innerHTML;

                        // INLINED EXTRACTION LOGIC
                        let address = null;
                        if (detailsHtml.includes("<b>Merkez Adresi</b>:")) {
                            const part = detailsHtml.split("<b>Merkez Adresi</b>:")[1];
                            if (part) address = part.split("<br>")[0].trim();
                        }

                        let phone = null;
                        if (detailsHtml.includes("<b>İş Yeri Telefon No</b>:")) {
                            const part = detailsHtml.split("<b>İş Yeri Telefon No</b>:")[1];
                            if (part) phone = part.split("<br>")[0].trim();
                        }

                        // Extract email
                        const emailLink = detailsCell.querySelector('a[href^="mailto:"]');
                        let email = emailLink ? emailLink.getAttribute("href")?.replace("mailto:", "").trim() : null;

                        if (!email && detailsHtml.includes("<b>Kurumsal E-Posta Adresi</b>:")) {
                            const part = detailsHtml.split("<b>Kurumsal E-Posta Adresi</b>:")[1];
                            if (part) email = part.split("<br>")[0].trim();
                        }

                        // Extract website
                        const links = Array.from(detailsCell.querySelectorAll("a"));
                        // @ts-ignore
                        const webLink = links.find(l => !l.href.startsWith("mailto:") && l.href.startsWith("http"));
                        // @ts-ignore
                        let website = webLink ? webLink.href : null;

                        if (!website && detailsHtml.includes("<b>Web Adresi</b>:")) {
                            const part = detailsHtml.split("<b>Web Adresi</b>:")[1];
                            if (part) website = part.split("<br>")[0].trim();
                        }

                        // Clean website simple check
                        if (website && website.includes("javascript")) website = null;
                        // Remove HTML tags if any (basic)
                        if (website && website.includes("<")) website = website.split("<")[0];
                        if (email && email.includes("<")) email = email.split("<")[0];

                        let city = "Unknown";
                        if (address) {
                            const parts = address.split(/[\s,/]+/);
                            const lastPart = parts[parts.length - 1];
                            if (lastPart && lastPart.length > 2) city = lastPart;
                        }

                        return {
                            name,
                            address,
                            phone,
                            email: email || null,
                            website: website || null,
                            sector: "Döküm",
                            city
                        };
                    }).filter(c => c !== null && c.name);
                });

                console.log(`    ✅ Found ${pageCompanies.length} companies on page ${pageNum}`);

                // Add to main list
                for (const c of pageCompanies) {
                    if (c) {
                        companies.push(c);
                    }
                }

                // Check "Next" button
                const nextBtn = await page.$('.pagination .next a, ul.pagination li.next a');
                if (!nextBtn) {
                    console.log("    ⏹️ Last page reached (no 'next' button).");
                    break;
                }

                await delay(1000);

            } catch (pError) {
                console.error(`    ❌ Error on page ${pageNum}:`, pError);
            }
        }
    } catch (error) {
        console.error("❌ Error scraping Tudoksad:", error);
    } finally {
        await page.close();
    }

    return companies;
}
