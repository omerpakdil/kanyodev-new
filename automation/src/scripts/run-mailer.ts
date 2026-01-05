import { prepareEmails, sendPendingEmails } from "../mailer/index.js";

async function run() {
    console.log("📧 Manual Mailer Run");

    await prepareEmails(5); // Prepare 5 draft emails

    console.log("Wait 2 seconds...");
    await new Promise(r => setTimeout(r, 2000));

    // Uncomment to actually send
    // await sendPendingEmails();
    console.log("Sending disabled in manual script by default. Uncomment to send.");
}

run().catch(console.error);
