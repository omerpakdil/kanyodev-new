import { prepareEmails, sendPendingEmails } from "../mailer/index.js";

const limit = parseInt(process.argv[2] || "1");
const shouldSend = process.argv[3] === "--send";

async function run() {
    console.log(`📧 Manual Mailer Run (limit: ${limit})`);

    await prepareEmails(limit);

    if (shouldSend) {
        console.log("📤 Sending emails...");
        await sendPendingEmails();
    } else {
        console.log("ℹ️  Mail gönderimi kapalı. Göndermek için: npm run mail 1 --send");
    }
}

run().catch(console.error);
