import { Resend } from "resend";
import { config } from "../config/index.js";
import { getPendingEmails, updateEmailStatus, getTodayEmailCount, insertEmail, getAnalysesWithoutEmail, updateSourceLastScraped } from "../db/queries.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const resend = new Resend(config.resend.apiKey);
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateEmailContent(companyName: string, sector: string, analysis: any) {
    const prompt = `
    KanyoDev adlı yazılım şirketi için potansiyel müşteri maili taslağı oluştur.
    
    Hedef Şirket: ${companyName}
    Sektör: ${sector}
    Tespit Edilen İhtiyaçlar: ${analysis.identified_needs.join(", ")}
    Önerilen Hizmetler: ${analysis.suggested_services.join(", ")}
    Şirket Özeti: ${analysis.website_summary}

    Kurallar:
    1. Konu satırı dikkat çekici ama clickbait olmayan profesyonel bir başlık olsun.
    2. Mail içeriği samimi, saygılı ve doğrudan değere odaklanan bir yapıda olsun.
    3. Analiz sonuçlarına atıfta bulun ("Web sitenizi incelediğimizde..." gibi).
    4. KanyoDev'in modern teknolojiler (Next.js, AI, Otomasyon) kullandığını belirt.
    5. HTML formatında (sadece body içeriği, <br> kullan) olsun.
    6. Sonunda 15 dakikalık ücretsiz danışmanlık çağrısı (Call to Action) olsun.
    
    Çıktı Formatı JSON:
    {
      "subject": "...",
      "html_body": "..."
    }
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("JSON parse error:", text);
        return null;
    }
}

export async function prepareEmails(limit = 10) {
    console.log("✍️  Preparing emails...");
    const analyses = await getAnalysesWithoutEmail(limit);

    for (const item of analyses) {
        const company = item.companies;
        // @ts-ignore
        if (!company.email) {
            console.log(`  ⏭️ Skipped ${company.name}: No email address`);
            continue;
        }

        const emailContent = await generateEmailContent(company.name, company.sector, item);

        if (emailContent) {
            await insertEmail({
                company_id: company.id,
                analysis_id: item.id,
                subject: emailContent.subject,
                body: emailContent.html_body,
                status: "pending"
            });
            console.log(`  ✅ Email prepared for ${company.name}`);
        }

        // Rate limit generation
        await new Promise(r => setTimeout(r, 2000));
    }
}

export async function sendPendingEmails() {
    console.log("🚀 Sending pending emails...");

    const todayCount = await getTodayEmailCount();
    if (todayCount >= config.limits.dailyMailLimit) {
        console.log(`⚠️ Daily limit reached (${todayCount}/${config.limits.dailyMailLimit}). Stopping.`);
        return;
    }

    const pendingEmails = await getPendingEmails(config.limits.dailyMailLimit - todayCount);

    for (const email of pendingEmails) {
        const company = email.companies;

        try {
            console.log(`  📧 Sending to ${company.name} (${company.email})...`);

            const { data, error } = await resend.emails.send({
                from: `KanyoDev <${config.resend.senderEmail}>`,
                to: [company.email],
                replyTo: config.resend.replyToEmail,
                subject: email.subject,
                html: email.body + `<br><br><small>Bu mail otomatiktir. Listeden çıkmak için yanıtlayabilirsiniz.</small>`
            });

            if (error) throw error;

            await updateEmailStatus(email.id, "sent", data?.id);
            console.log(`  ✅ Sent! ID: ${data?.id}`);

        } catch (error) {
            console.error(`  ❌ Failed to send to ${company.name}:`, error);
            await updateEmailStatus(email.id, "failed");
        }

        // Rate limit sending
        await new Promise(r => setTimeout(r, 1000));
    }
}
