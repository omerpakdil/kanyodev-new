import { supabase } from "../db/client.js";

async function showResults() {
    // Get the latest analysis
    const { data: analysis, error: aErr } = await supabase
        .from("analyses")
        .select("*, companies(*)")
        .order("analyzed_at", { ascending: false })
        .limit(1)
        .single();

    if (aErr) {
        console.error("Analysis error:", aErr);
        return;
    }

    console.log("=== 📊 ANALİZ ===");
    console.log("Şirket:", analysis.companies.name);
    console.log("Website:", analysis.companies.website);
    console.log("Email:", analysis.companies.email);
    console.log("");
    console.log("Özet:", analysis.website_summary);
    console.log("Tespit Edilen İhtiyaçlar:", analysis.identified_needs);
    console.log("Önerilen Hizmetler:", analysis.suggested_services);
    console.log("Güven Skoru:", analysis.ai_confidence);

    // Get the latest email
    const { data: email, error: eErr } = await supabase
        .from("emails")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (eErr) {
        console.error("Email error:", eErr);
        return;
    }

    console.log("");
    console.log("=== 📧 HAZIRLANAN MAİL ===");
    console.log("Konu:", email.subject);
    console.log("Durum:", email.status);
    console.log("");
    console.log("--- İçerik ---");
    console.log(email.body);
}

showResults().catch(console.error);
