import { supabase, Company, Analysis, Email, ScrapeSource } from "./client.js";

// ============ COMPANIES ============

export async function insertCompany(company: Omit<Company, "id" | "created_at">) {
    const { data, error } = await supabase
        .from("companies")
        .upsert(company, { onConflict: "website" })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getCompaniesWithoutAnalysis(limit = 10) {
    const { data, error } = await supabase
        .from("companies")
        .select("*")
        .is("id", supabase.rpc("companies_without_analysis"))
        .limit(limit);

    // Fallback: get companies that don't have analyses
    const { data: companies, error: err } = await supabase
        .from("companies")
        .select(`
      *,
      analyses(id)
    `)
        .is("analyses", null)
        .limit(limit);

    if (err) throw err;
    return companies as Company[];
}

export async function getCompanyById(id: string) {
    const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Company;
}

export async function checkCompanyExists(website: string | null, name: string, email?: string | null) {
    // Primary check: website (unique identifier)
    if (website) {
        const { count } = await supabase
            .from("companies")
            .select("*", { count: "exact", head: true })
            .eq("website", website);
        if (count && count > 0) return true;
    }

    // Secondary check: email (more reliable than name alone)
    if (email) {
        const { count } = await supabase
            .from("companies")
            .select("*", { count: "exact", head: true })
            .eq("email", email);
        if (count && count > 0) return true;
    }

    // Don't check by name alone - different teknokents can have companies with same name

    return false;
}

// ============ ANALYSES ============

export async function insertAnalysis(analysis: Omit<Analysis, "id" | "analyzed_at">) {
    const { data, error } = await supabase
        .from("analyses")
        .insert(analysis)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getAnalysesWithoutEmail(limit = 10) {
    const { data, error } = await supabase
        .from("analyses")
        .select(`
      *,
      companies(*),
      emails(id)
    `)
        .is("emails", null)
        .limit(limit);

    if (error) throw error;
    return data;
}

// ============ EMAILS ============

export async function insertEmail(email: Omit<Email, "id" | "created_at">) {
    const { data, error } = await supabase
        .from("emails")
        .insert(email)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getPendingEmails(limit = 10) {
    const { data, error } = await supabase
        .from("emails")
        .select(`
      *,
      companies(*),
      analyses(*)
    `)
        .eq("status", "pending")
        .limit(limit);

    if (error) throw error;
    return data;
}

export async function updateEmailStatus(
    id: string,
    status: Email["status"],
    resendId?: string
) {
    const update: Partial<Email> = { status };
    if (status === "sent") update.sent_at = new Date().toISOString();
    if (resendId) update.resend_id = resendId;

    const { error } = await supabase.from("emails").update(update).eq("id", id);

    if (error) throw error;
}

export async function getTodayEmailCount() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
        .from("emails")
        .select("*", { count: "exact", head: true })
        .gte("sent_at", today.toISOString())
        .eq("status", "sent");

    if (error) throw error;
    return count || 0;
}

// ============ SCRAPE SOURCES ============

export async function getActiveSources() {
    const { data, error } = await supabase
        .from("scrape_sources")
        .select("*")
        .eq("is_active", true);

    if (error) throw error;
    return data as ScrapeSource[];
}

export async function updateSourceLastScraped(id: string) {
    const { error } = await supabase
        .from("scrape_sources")
        .update({ last_scraped_at: new Date().toISOString() })
        .eq("id", id);

    if (error) throw error;
}
