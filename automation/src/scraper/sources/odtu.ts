import { getPage } from "../utils/browser.js";

export interface OdtuCompany {
    name: string;
    website: string | null;
    source_url: string;
}

export async function scrapeOdtuTeknokent(): Promise<OdtuCompany[]> {
    console.log(`🔍 Scraping ODTU Teknokent Firm List...`);

    const page = await getPage();
    const url = "https://odtuteknokent.com.tr/tr/firmalar/tum-firmalar.php";
    const companies: OdtuCompany[] = [];

    try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

        // Wait for table
        await page.waitForSelector("table.table-striped", { timeout: 10000 });

        const params = await page.evaluate(() => {
            // @ts-ignore
            const rows = Array.from(document.querySelectorAll("table.table-striped tr"));
            // Skip header (first row usually has th)

            return rows.map(row => {
                const cells = row.querySelectorAll("td");
                if (cells.length < 2) return null;

                const name = cells[0]?.textContent?.trim() || "";

                const link = cells[1]?.querySelector("a");
                const website = link ? link.href : null;

                if (!name) return null;

                return {
                    name,
                    website: website || null
                };
            }).filter(c => c !== null);
        });

        console.log(`    ✅ Found ${params.length} companies in ODTU list.`);

        for (const p of params) {
            if (p) {
                companies.push({
                    name: p.name,
                    website: p.website,
                    source_url: url
                });
            }
        }

    } catch (error) {
        console.error("❌ Error scraping ODTU Teknokent:", error);
    } finally {
        await page.close();
    }

    return companies;
}
