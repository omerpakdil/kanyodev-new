import "dotenv/config";

export const config = {
    supabase: {
        url: process.env.SUPABASE_URL!,
        serviceKey: process.env.SUPABASE_SERVICE_KEY!,
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY!,
    },
    resend: {
        apiKey: process.env.RESEND_API_KEY!,
        senderEmail: process.env.SENDER_EMAIL || "info@kanyodev.com",
        replyToEmail: process.env.REPLY_TO_EMAIL || "info@kanyodev.com",
    },
    limits: {
        scrapeDelayMs: parseInt(process.env.SCRAPE_DELAY_MS || "5000"),
        dailyMailLimit: parseInt(process.env.DAILY_MAIL_LIMIT || "100"),
    },
};
