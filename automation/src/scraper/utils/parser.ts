import * as cheerio from "cheerio";

export function extractEmails(html: string): string[] {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = html.match(emailRegex) || [];

    // Filter out common fake emails
    const filtered = matches.filter((email) => {
        const lower = email.toLowerCase();
        return (
            !lower.includes("example") &&
            !lower.includes("test") &&
            !lower.includes("placeholder") &&
            !lower.endsWith(".png") &&
            !lower.endsWith(".jpg")
        );
    });

    return [...new Set(filtered)];
}

export function extractPhones(html: string): string[] {
    // Turkish phone number patterns
    const phoneRegex = /(?:\+90|0)?[\s.-]?(?:5\d{2}|[2-4]\d{2})[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}/g;
    const matches = html.match(phoneRegex) || [];
    return [...new Set(matches.map(normalizePhone))];
}

function normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("90")) return "+" + digits;
    if (digits.startsWith("0")) return "+9" + digits;
    return "+90" + digits;
}

export function parseCompanyFromHtml(
    html: string,
    selectors: {
        name?: string;
        website?: string;
        email?: string;
        phone?: string;
        sector?: string;
        city?: string;
    }
) {
    const $ = cheerio.load(html);

    const getText = (selector?: string) => {
        if (!selector) return null;
        return $(selector).first().text().trim() || null;
    };

    const getHref = (selector?: string) => {
        if (!selector) return null;
        return $(selector).first().attr("href") || null;
    };

    return {
        name: getText(selectors.name),
        website: getHref(selectors.website) || getText(selectors.website),
        email: getText(selectors.email) || extractEmails(html)[0] || null,
        phone: getText(selectors.phone) || extractPhones(html)[0] || null,
        sector: getText(selectors.sector),
        city: getText(selectors.city),
    };
}

export function cleanWebsiteUrl(url: string): string {
    if (!url) return url;

    // Add protocol if missing
    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    // Remove trailing slash
    url = url.replace(/\/$/, "");

    return url;
}
