// supabase/functions/on-new-lead/index.ts
// @ts-ignore (Mengabaikan error import Deno di VS Code standar)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// @ts-ignore
import { Resend } from "npm:resend";

// @ts-ignore (Mendeklarasikan Deno agar tidak error merah)
declare const Deno: any;

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL")!;

// Jika belum punya domain, Resend MENGHARUSKAN pakai email bawaan ini:
const FROM_EMAIL = "onboarding@resend.dev";

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

function autoReplyTemplate(lead: LeadRecord) {
    return `
    <div style="font-family: sans-serif; max-width: 480px; margin: auto; color:#0D1D26;">
      <h2>Thanks, ${lead.name} 👋</h2>
      <p>We've received your project brief. Here's a quick recap:</p>
      <ul>
        <li><b>Company:</b> ${lead.company}</li>
        <li><b>Service:</b> ${lead.services_required.join(", ")}</li>
        <li><b>Budget:</b> ${lead.budget_range}</li>
      </ul>
      <p>Our team will get back to you within 24 hours via WhatsApp or email.</p>
      <p>— Kebetulan Serius</p>
    </div>
  `;
}

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

// @ts-ignore
Deno.serve(async (req: any) => {
    try {
        const { record } = await req.json();

        // ⚠️ PERINGATAN RESEND TANPA DOMAIN ⚠️
        // Tanpa domain, Resend HANYA BISA mengirim email ke alamat yang Anda daftarkan di akun Resend.
        // Kode auto-reply di bawah ini akan ERROR (403) jika record.email bukan email akun Anda.
        
        /*
        await resend.emails.send({
            from: FROM_EMAIL,
            to: record.email, // Ini akan gagal jika bukan email yang terdaftar di Resend!
            subject: "We've received your project brief 🎯",
            html: autoReplyTemplate(record),
        });
        */

        // Notifikasi Admin (Pasti berhasil asalkan ADMIN_EMAIL adalah email akun Resend Anda)
        await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL, 
            subject: `[New Lead] ${record.name} — ${record.services_required?.join(", ")}`,
            html: adminNotifTemplate(record),
        });

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
    }
});

/*
import { Resend } from 'resend';

const resend = new Resend('re_aRYV2o8R_B7p47vS9ALFmftZ58CbWVaUv');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'kebetulanserius@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
*/