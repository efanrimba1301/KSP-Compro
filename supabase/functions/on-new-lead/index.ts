// supabase/functions/on-new-lead/index.ts
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL")!;
const FROM_EMAIL = "Kebetulan Serius <onboarding@resend.dev>";

// Ganti dengan ID template kamu sendiri kalau beda
const AUTO_REPLY_TEMPLATE_ID = "ce880ac6-2ab8-493d-aefe-9bbdf900762c";

type LeadRecord = {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    company: string;
    services_required: string[];
    budget_range: string;
    project_detail: string;
};

function adminNotifTemplate(lead: LeadRecord) {
    return `
    <div style="font-family: sans-serif;">
      <h2>New lead: ${lead.name}</h2>
      <ul>
        <li><b>Company:</b> ${lead.company}</li>
        <li><b>Email:</b> ${lead.email}</li>
        <li><b>WhatsApp:</b> ${lead.whatsapp}</li>
        <li><b>Service:</b> ${lead.services_required.join(", ")}</li>
        <li><b>Budget:</b> ${lead.budget_range}</li>
        <li><b>Detail:</b> ${lead.project_detail}</li>
      </ul>
      <p><a href="https://kebetulanserius.com/admin/leads">Open in admin panel →</a></p>
    </div>
  `;
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
    // Handle preflight OPTIONS requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { record } = await req.json() as { record: LeadRecord };

        // Auto-reply ke calon klien — pakai Template Builder Resend (bukan HTML inline lagi)
        const autoReply = await resend.emails.send({
            from: FROM_EMAIL,
            to: record.email,
            subject: "We've received your project brief",
            template: {
                id: AUTO_REPLY_TEMPLATE_ID,
                variables: {
                    first_name: record.name,
                    Company: record.company,
                    services_required: record.services_required.join(", "),
                    budget_range: record.budget_range,
                    project_detail: record.project_detail,
                },
            },
        });
        if (autoReply.error) {
            console.error("[auto-reply GAGAL]", JSON.stringify(autoReply.error));
        } else {
            console.log("[auto-reply terkirim]", autoReply.data?.id);
        }

        // Notifikasi ke tim — tetap HTML inline, nggak perlu Template Builder
        const adminNotif = await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `[New Lead] ${record.name} — ${record.services_required?.join(", ")}`,
            html: adminNotifTemplate(record),
        });
        if (adminNotif.error) {
            console.error("[admin notif GAGAL]", JSON.stringify(adminNotif.error));
        } else {
            console.log("[admin notif terkirim]", adminNotif.data?.id);
        }

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ ok: false, error: String(err) }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});