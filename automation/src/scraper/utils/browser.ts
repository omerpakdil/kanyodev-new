import puppeteer, { Browser, Page } from "puppeteer-core";
import { existsSync } from "fs";

let browser: Browser | null = null;

// Common Chrome paths on Windows
const CHROME_PATHS = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

function findChrome(): string | undefined {
    for (const path of CHROME_PATHS) {
        if (existsSync(path)) return path;
    }
    return undefined;
}

export async function getBrowser(): Promise<Browser> {
    if (!browser) {
        const executablePath = findChrome();

        browser = await puppeteer.launch({
            headless: true,
            executablePath, // Use system Chrome if found
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
