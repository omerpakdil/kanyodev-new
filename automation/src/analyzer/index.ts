import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/index.js";
import { getCompaniesWithoutAnalysis, insertAnalysis, updateEmailStatus } from "../db/queries.js";
import { scrapeCompanyWebsite } from "../scraper/index.js";
import { Company } from "../db/client.js";

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface AnalysisResult {
    summary: string;
    identified_needs: string[];
    suggested_services: string[];
    confidence: number;
}

export async function analyzeCompany(company: Company) {
    console.log(`🧠 Analyzing company: ${company.name}`);

    if (!company.website) {
        console.log(`  ⏭️ Skipped: No website`);
        return null;
    }

    // 1. Scrape website content
    const { content, email, phone } = await scrapeCompanyWebsite(company.website);

    // Update company contact info if found
    // TODO: Add updateCompany function to queries

    if (!content || content.length < 100) {
        console.log(`  ⚠️ Failed to scrape content or content too short`);
        return null;
    }

    // 2. Analyze with Gemini
    try {
        const prompt = `
      Sen profesyonel bir yazılım danışmanısın. Aşağıdaki şirket web sitesi içeriğini analiz et ve JSON formatında yanıt ver.
      
      Şirket: ${company.name}
      Website İçeriği (özet):
      ${content.slice(0, 15000)}

      Lütfen şunları belirle:
      1. Şirket ne iş yapıyor? (summary) - 1-2 cümle
      2. Yazılım ihtiyaçları neler olabilir? (identified_needs) - örn: ["mobil uygulama", "e-ticaret", "crm", "seo"]
      3. Biz (KanyoDev) ne önerebiliriz? (suggested_services) - örn: ["Web Sitesi Yenileme", "Özel Yazılım", "Mobil App"]
      4. Bu analize ne kadar güveniyorsun? (confidence) - 0.0 ile 1.0 arası

      Yanıtın SADECE şu JSON formatında olsun:
      {
        "summary": "...",
        "identified_needs": ["..."],
        "suggested_services": ["..."],
        "confidence": 0.9
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const analysis = JSON.parse(jsonStr) as AnalysisResult;

        if (!analysis.summary || !Array.isArray(analysis.identified_needs)) {
            throw new Error("Invalid analysis result structure");
        }

        // 3. Save analysis
        await insertAnalysis({
            company_id: company.id!,
            website_summary: analysis.summary,
            identified_needs: analysis.identified_needs,
            suggested_services: analysis.suggested_services,
            ai_confidence: analysis.confidence,
        });

        console.log(`  ✅ Analysis saved for ${company.name}`);
        return analysis;

    } catch (error) {
        console.error(`  ❌ Error analyzing ${company.name}:`, error);
        return null;
    }
}

export async function runAnalyzer(limit = 10) {
    console.log(`🚀 Starting analyzer (limit: ${limit})...`);

    const companies = await getCompaniesWithoutAnalysis(limit);
    console.log(`  Found ${companies.length} companies to analyze`);

    for (const company of companies) {
        await analyzeCompany(company);
        // Rate limiting for AI
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log("✨ Analysis complete");
}
