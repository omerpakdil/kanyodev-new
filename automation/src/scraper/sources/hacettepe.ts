import { getPage, delay } from "../utils/browser.js";
import { extractEmails } from "../utils/parser.js";

interface HacettepeCompany {
    name: string;
    website: string | null;
    email: string | null;
    phone: string | null;
    sector: string;
    city: string;
}

const CATEGORIES = [
    { name: "Bilgisayar ve İletişim Teknolojileri", slug: "bilgisayar_ve_iletisim_teknolojileri-16" },
    { name: "Elektronik", slug: "elektronik-17" },
    { name: "Danışmanlık", slug: "danismanlik-18" },
    { name: "Enerji", slug: "enerji-19" },
    { name: "Gıda ve Hayvancılık", slug: "gida_sanayi-20" },
    { name: "İnşaat, Mühendislik ve Mimarlık", slug: "insaat_muhendislik_mimarlik-21" },
    { name: "Kimya, Kozmetik ve Temizlik", slug: "kimya_kozmetik_temizlik-22" },
    { name: "Madencilik", slug: "madencilik-23" },
    { name: "Medya ve İletişim", slug: "medya_iletisim-24" },
    { name: "Otomotiv, Makine ve Teçhizat", slug: "otomotiv_makine-25" },
    { name: "Sağlık, İlaç ve Medikal", slug: "saglik_ilac_medikal-26" },
    { name: "Savunma Sanayi ve Havacılık", slug: "savunma_sanayi_havacilik-27" },
    { name: "Telekomünikasyon", slug: "telekomunikasyon-28" },
    { name: "Yazılım", slug: "yazilim-29" },
    { name: "Diğer", slug: "diger-30" }
];

const BASE_URL = "https://www.hacettepeteknokent.com.tr";

export async function scrapeHacettepeTeknokent(): Promise<HacettepeCompany[]> {
    console.log(`🔍 Scraping Hacettepe Teknokent (15 categories)...`);

    const page = await getPage();
    const companies: HacettepeCompany[] = [];

    try {
        for (let i = 0; i < CATEGORIES.length; i++) {
            const category = CATEGORIES[i];
            console.log(`\n📁 [${i + 1}/15] Category: ${category.name}`);

            const categoryUrl = `${BASE_URL}/tr/firma_rehberi/${category.slug}`;

            try {
                await page.goto(categoryUrl, { waitUntil: "networkidle2", timeout: 30000 });
                await delay(1500);

                // Get all company detail page links
                const companyLinks = await page.evaluate(() => {
                    const links = Array.from(document.querySelectorAll('a[href*="/tr/firma/"]'));
                    return links.map(link => ({
                        href: link.getAttribute("href"),
                        name: link.textContent?.trim() || ""
                    })).filter(l => l.href && l.name && !l.name.includes("Hacettepe"));
                });

                // Remove duplicates
                const uniqueLinks = companyLinks.filter((link, index, self) =>
                    index === self.findIndex(l => l.href === link.href)
                );

                console.log(`  📦 Found ${uniqueLinks.length} companies`);

                // Visit each company detail page
                for (const link of uniqueLinks) {
                    if (!link.href) continue;

                    const companyUrl = link.href.startsWith("http") ? link.href : `${BASE_URL}${link.href}`;

                    try {
                        const companyData = await scrapeCompanyDetail(companyUrl, link.name, category.name);

                        if (companyData && companyData.email) {
                            companies.push(companyData);
                            console.log(`    ✅ ${companyData.name} - ${companyData.email}`);
                        } else if (companyData && !companyData.email) {
                            console.log(`    ⏭️ No email: ${link.name}`);
                        }

                        await delay(500);
                    } catch (error) {
                        console.log(`    ❌ Error: ${link.name}`);
                    }
                }

            } catch (catError) {
                console.error(`  ❌ Error in category ${category.name}:`, catError instanceof Error ? catError.message : catError);
            }
        }

    } catch (error) {
        console.error("❌ Error scraping Hacettepe Teknokent:", error);
    } finally {
        await page.close();
    }

    console.log(`\n✅ Total companies with emails: ${companies.length}`);
    return companies;
}

async function scrapeCompanyDetail(url: string, companyName: string, sector: string): Promise<HacettepeCompany | null> {
    const page = await getPage();

    try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
        await delay(1000);

        const html = await page.content();

        // Extract emails from page
        let emails = extractEmails(html);

        // Filter out teknokent's own email and invalid emails
        emails = emails.filter(email => {
            const lower = email.toLowerCase();
            return !lower.includes("hacettepeteknokent") &&
                !lower.includes("example") &&
                !lower.includes("sentry") &&
                !lower.includes("wixpress") &&
                !lower.endsWith(".png") &&
                !lower.endsWith(".jpg");
        });

        // Extract website from page text
        const websiteMatch = html.match(/(?:www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?|https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)/gi);
        let website: string | null = null;

        if (websiteMatch) {
            // Filter out teknokent's own website and social media
            const validWebsites = websiteMatch.filter(w => {
                const lower = w.toLowerCase();
                return !lower.includes("hacettepeteknokent") &&
                    !lower.includes("facebook") &&
                    !lower.includes("twitter") &&
                    !lower.includes("instagram") &&
                    !lower.includes("linkedin") &&
                    !lower.includes("youtube");
            });
            if (validWebsites.length > 0) {
                website = validWebsites[0];
                if (!website.startsWith("http")) {
                    website = "https://" + website;
                }
            }
        }

        // Extract phone
        const phoneMatch = html.match(/(?:\+90|0)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}/);
        const phone = phoneMatch ? phoneMatch[0] : null;

        // Case 1: Email exists -> save
        if (emails.length > 0) {
            return {
                name: companyName,
                website,
                email: filterBestEmail(emails),
                phone,
                sector,
                city: "Ankara"
            };
        }

        // Case 2: Only website exists -> try to scrape email from website
        if (website && emails.length === 0) {
            const scrapedEmail = await scrapeEmailFromWebsite(website);
            if (scrapedEmail) {
                return {
                    name: companyName,
                    website,
                    email: scrapedEmail,
                    phone,
                    sector,
                    city: "Ankara"
                };
            }
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

async function scrapeEmailFromWebsite(websiteUrl: string): Promise<string | null> {
    const page = await getPage();

    try {
        let url = websiteUrl;
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 12000 });
        await delay(1500);

        // Get initial page HTML
        let html = await page.content();
        let emails = extractEmails(html);

        // Filter valid emails
        emails = filterValidEmails(emails);

        if (emails.length > 0) {
            return filterBestEmail(emails);
        }

        // Try to find and navigate to contact page
        const contactSelectors = [
            'a[href*="iletisim"]',
            'a[href*="contact"]',
            'a[href*="bize-ulasin"]',
            'a[href*="bize_ulasin"]',
            'a[href*="bizeulasin"]'
        ];

        for (const selector of contactSelectors) {
            try {
                const contactLink = await page.$(selector);
                if (contactLink) {
                    const href = await contactLink.evaluate(el => el.getAttribute("href"));

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
                        emails = filterValidEmails(emails);

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

        // Check for mailto links
        const mailtoEmail = await page.evaluate(() => {
            const mailtoLink = document.querySelector('a[href^="mailto:"]');
            if (mailtoLink) {
                const href = mailtoLink.getAttribute("href");
                return href?.replace("mailto:", "").split("?")[0] || null;
            }
            return null;
        });

        if (mailtoEmail && !mailtoEmail.includes("hacettepeteknokent")) {
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

function filterValidEmails(emails: string[]): string[] {
    return emails.filter(email => {
        const lower = email.toLowerCase();
        return !lower.includes("example") &&
            !lower.includes("sentry") &&
            !lower.includes("wixpress") &&
            !lower.includes("hacettepeteknokent") &&
            !lower.endsWith(".png") &&
            !lower.endsWith(".jpg");
    });
}

function filterBestEmail(emails: string[]): string | null {
    if (emails.length === 0) return null;

    // Prefer info@, contact@, iletisim@, hello@ emails
    const preferredPrefixes = ["info", "contact", "iletisim", "hello", "destek", "support", "sales"];

    for (const prefix of preferredPrefixes) {
        const match = emails.find(e => e.toLowerCase().startsWith(prefix + "@"));
        if (match) return match;
    }

    // Filter out noreply emails
    const filtered = emails.filter(e => {
        const lower = e.toLowerCase();
        return !lower.includes("noreply") && !lower.includes("no-reply");
    });

    return filtered[0] || emails[0];
}
