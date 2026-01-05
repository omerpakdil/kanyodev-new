import puppeteer, { Browser, Page } from "puppeteer";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--disable-gpu",
            ],
        });
    }
    return browser;
}

export async function getPage(): Promise<Page> {
    const b = await getBrowser();
    const page = await b.newPage();

    // Set viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Block images and fonts for faster loading
    await page.setRequestInterception(true);
    page.on("request", (req) => {
        if (["image", "font", "media"].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    return page;
}

export async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
    }
}

export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
