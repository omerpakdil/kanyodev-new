import { getPage, delay } from "../utils/browser.js";
import { cleanWebsiteUrl } from "../utils/parser.js";
import { config } from "../../config/index.js";

interface ScrapedCompany {
    name: string;
    website: string | null;
    phone: string | null;
    address: string | null;
    email: string | null;
    sector: string;
    city: string;
}

export async function scrapeGoogleMaps(sector: string, city: string, maxResults = 20) {
    console.log(`🔍 Scraping Google Maps: ${sector} in ${city}`);

    const page = await getPage();
    const companies: ScrapedCompany[] = [];

    try {
        const query = `${sector} ${city}`;
        const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

        console.log(`  📍 Analyzing: ${url}`);

        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        // Cookie dialog bypass
        try {
            const acceptButton = await page.$('button[aria-label="Accept all"], button[jsname="b3VHJd"]');
            if (acceptButton) await acceptButton.click();
        } catch (e) { }

        await delay(3000);

        // Scroll to load more results
        await autoScroll(page);

        // Extract links
        const placeLinks = await page.$$eval('a[href*="/maps/place/"]', (links) =>
            links.map(l => l.getAttribute("href")).filter(link => link && !link.includes("/contrib/"))
        );

        const uniqueLinks = [...new Set(placeLinks)].slice(0, maxResults);
        console.log(`  📍 Found ${uniqueLinks.length} places. Processing...`);

        for (const link of uniqueLinks) {
            if (!link) continue;

            try {
                await page.goto(link, { waitUntil: "domcontentloaded", timeout: 30000 });
                await delay(1500);

                const data = await page.evaluate(() => {
                    const name = document.querySelector("h1")?.textContent?.trim() || "";

                    const websiteBtn = document.querySelector('a[data-item-id="authority"]');
                    const website = websiteBtn ? (websiteBtn as HTMLAnchorElement).href : null;

                    const phoneBtn = document.querySelector('button[data-tooltip="Telefon numarasını kopyala"], button[data-item-id^="phone:"]');
                    let phone = phoneBtn
                        ? (phoneBtn.getAttribute("aria-label")?.replace("Telefon: ", "").trim() || phoneBtn.textContent?.trim() || null)
                        : null;

                    if (phone && phone.startsWith("0")) phone = "+9" + phone;

                    const addressBtn = document.querySelector('button[data-item-id="address"]');
                    const address = addressBtn ? addressBtn.getAttribute("aria-label")?.replace("Adres: ", "").trim() : null;

                    return { name, website, phone, address };
                });

                // Filter: Only add companies with a WEBSITE
                if (data.name && data.website) {
                    companies.push({
                        name: data.name,
                        website: cleanWebsiteUrl(data.website),
                        email: null,
                        phone: data.phone || null,
                        address: data.address || null,
                        sector,
                        city
                    });
                    console.log(`    📍 Found: ${data.name} (Web: ${data.website})`);
                } else {
                    console.log(`    ⏭️ Skipped (No website): ${data.name}`);
                }

            } catch (e) {
                console.error(`    ❌ Error processing place:`, e);
            }
        }

    } catch (error) {
        console.error("❌ Error scraping Google Maps:", error);
    } finally {
        await page.close();
    }

    return companies;
}

async function autoScroll(page: any) {
    await page.evaluate(async () => {
        const wrapper = document.querySelector('div[role="feed"]');
        if (!wrapper) return;

        await new Promise<void>((resolve) => {
            let totalHeight = 0;
            let distance = 1000;
            const scrollHeight = wrapper.scrollHeight;
            let timer = setInterval(() => {
                wrapper.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(timer);
                resolve();
            }, 10000);
        });
    });
}
