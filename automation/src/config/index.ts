import "dotenv/config";

export const config = {
    supabase: {
        url: process.env.SUPABASE_URL!,
        serviceKey: process.env.SUPABASE_SERVICE_KEY!,
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY!,
    },
    smtp: {
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
        user: process.env.SMTP_USER!,
        password: process.env.SMTP_PASSWORD!,
        senderEmail: process.env.SENDER_EMAIL || "info@kanyodev.com",
        replyToEmail: process.env.REPLY_TO_EMAIL || "info@kanyodev.com",
    },
    limits: {
        scrapeDelayMs: parseInt(process.env.SCRAPE_DELAY_MS || "5000"),
        dailyMailLimit: parseInt(process.env.DAILY_MAIL_LIMIT || "100"),
    },
};
