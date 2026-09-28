// src/schemas/contactFormSchema.ts
import { z } from "zod";
import type { ServiceType, BudgetRange, HeardFrom } from "@/types/leads";

// PENTING: cocokkan array ini persis sama definisi ServiceType/BudgetRange/HeardFrom
// di src/types/leads.ts kamu — kalau ada bedanya, sesuaikan di sini.
export const serviceOptions: ServiceType[] = [
    'Web & App Development',
    'UI/UX Design',
    'SaaS Engineering',
    'IoT Engineering',
    'AI Tools',
    'Others'
];

export const budgetRangeOptions: BudgetRange[] = [
    'Under 5JT',
    '5JT - 15JT',
    '15JT - 35JT',
    '35JT - 65JT',
    '65JT - 100JT',
    '100JT++',
];

export const heardFromOptions: HeardFrom[] = [
    'Instagram',
    'Google',
    'ChatGPT',
    'Other',
];

export const ContactFormSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    whatsapp: z.string()
        .regex(/^\+?[0-9]{9,15}$/, { message: "Nomor WhatsApp tidak valid" }),
    email: z.string()
        .regex(/[^@ \t]+@[^@ \t]+\.[^@ \t]+/, { message: "Email tidak valid" }),
    company: z.string().min(1, "Nama perusahaan wajib diisi"),
    budget_range: z.string().min(1, "Budget wajib dipilih"),
    service: z.string().min(1, "Layanan wajib dipilih"),
    heard_from: z.string().min(1, "Wajib pilih salah satu"),
    project_detail: z.string().min(10, "Ceritain sedikit lebih detail soal project-nya"),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;