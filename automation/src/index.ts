import { runScraper } from "./scraper/index.js";
import { runAnalyzer } from "./analyzer/index.js";
import { prepareEmails, sendPendingEmails } from "./mailer/index.js";
import cron from "node-cron";

async function main() {
    console.log("🤖 KanyoDev Automation System Started");

    // Schedule tasks

    // 1. Scrape new companies (Every Monday at 09:00)
    cron.schedule("0 9 * * 1", async () => {
        console.log("⏰ Running scheduled scraping...");
        await runScraper([
            { sector: "yazılım", city: "istanbul" },
            { sector: "e-ticaret", city: "istanbul" }
        ]);
    });

    // 2. Analyze companies (Every day at 10:00)
    cron.schedule("0 10 * * *", async () => {
        console.log("⏰ Running scheduled analysis...");
        await runAnalyzer(20);
    });

    // 3. Prepare emails (Every day at 11:00)
    cron.schedule("0 11 * * *", async () => {
        console.log("⏰ Running scheduled email preparation...");
        await prepareEmails(20);
    });

    // 4. Send emails (Every weekday at 14:00)
    cron.schedule("0 14 * * 1-5", async () => {
        console.log("⏰ Running scheduled email sending...");
        await sendPendingEmails();
    });

    console.log("📅 Schedules set up. Waiting for triggers...");
}

// Allow manual execution via command line arguments
if (process.argv.includes("--run-all")) {
    (async () => {
        console.log("🔥 Running full pipeline manually...");
        // await runScraper([...]);
        await runAnalyzer(5);
        await prepareEmails(5);
        await sendPendingEmails();
    })();
} else {
    main();
}
