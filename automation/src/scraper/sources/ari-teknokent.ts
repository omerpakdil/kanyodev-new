import { getPage, delay } from "../utils/browser.js";

interface AriCompany {
    name: string;
    website: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    sector: string;
}

export async function scrapeAriTeknokent(startPage = 1, endPage = 33): Promise<AriCompany[]> {
    console.log(`🔍 Scraping Arı Teknokent (Pages ${startPage}-${endPage})`);

    const page = await getPage();
    const companies: AriCompany[] = [];

    try {
        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
            const url = `https://www.ariteknokent.com.tr/tr/teknoloji-firmalari/teknokentli-firmalar?page=${pageNum}`;
            console.log(`  📄 Processing Page ${pageNum}/${endPage}`);

            try {
                await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
                await delay(1500);

                // Get all company card IDs from data-row-id attribute
                const cardIds = await page.$$eval(".card[data-row-id]", cards =>
                    cards.map(card => card.getAttribute("data-row-id")).filter(Boolean)
                );

                console.log(`    📦 Found ${cardIds.length} company cards`);

                // Fetch each company's details via API
                for (const rowId of cardIds) {
                    try {
                        const apiUrl = `https://www.ariteknokent.com.tr/tr/getCompanyInformations?rowID=${rowId}`;

                        const response = await page.evaluate(async (url) => {
                            const res = await fetch(url);
                            return res.json();
                        }, apiUrl);

                        if (response && response.company) {
                            const company = response.company;
                            const sector = response.sector?.title_tr || "Teknoloji";

                            const name = company.title || "";
                            const website = company.website || null;
                            const phone = company.phone || null;
                            const city = company.city || null;

                            if (website) {
                                console.log(`      🏢 ${name} - ${website}`);
                                companies.push({
                                    name,
                                    website,
                                    email: null,
                                    phone,
                                    city,
                                    sector
                                });
                            } else {
                                console.log(`      ⏭️ Skipped (No website): ${name}`);
                            }
                        }

                        await delay(200); // Rate limit API calls

                    } catch (apiError) {
                        console.error(`      ❌ API error for ${rowId}:`, apiError instanceof Error ? apiError.message : apiError);
                    }
                }

                await delay(500);

            } catch (pageError) {
                console.error(`    ❌ Error on page ${pageNum}:`, pageError instanceof Error ? pageError.message : pageError);
            }
        }
    } catch (error) {
        console.error("❌ Error scraping Arı Teknokent:", error);
    } finally {
        await page.close();
    }

    console.log(`  ✅ Total companies with websites: ${companies.length}`);
    return companies;
}
