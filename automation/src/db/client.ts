import { createClient } from "@supabase/supabase-js";
import { config } from "../config/index.js";

export const supabase = createClient(config.supabase.url, config.supabase.serviceKey);

// Types
export interface Company {
    id?: string;
    name: string;
    website: string | null;
    email: string | null;
    phone: string | null;
    address?: string | null;
    sector: string | null;
    city: string | null;
    source: string;
    scraped_at?: string;
    created_at?: string;
}

export interface Analysis {
    id?: string;
    company_id: string;
    website_summary: string;
    identified_needs: string[];
    suggested_services: string[];
    ai_confidence: number;
    analyzed_at?: string;
}

export interface Email {
    id?: string;
    company_id: string;
    analysis_id: string;
    subject: string;
    body: string;
    status: "pending" | "sent" | "failed" | "opened" | "replied";
    sent_at?: string;
    opened_at?: string;
    resend_id?: string;
    created_at?: string;
}

export interface ScrapeSource {
    id?: string;
    name: string;
    url: string;
    type: "directory" | "google_maps" | "custom";
    selector_config: Record<string, string>;
    last_scraped_at?: string;
    is_active: boolean;
}
