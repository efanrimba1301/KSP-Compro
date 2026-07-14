import { z } from "zod";
export const pricingTierEnum = z.enum(['Basic', 'Growth', 'Enterprise'])
export const invoiceTypeEnum = z.enum(['monthly', 'quarterly', 'yearly'])
export const paymentMethodEnum = z.enum(['bank_transfer', 'credit_card'])
export const paymentTypeEnum = z.enum([
    'onboarding_fee',
    'payment_1st_month', 'payment_2nd_month', 'payment_3rd_month',
    'payment_4th_month', 'payment_5th_month', 'payment_6th_month',
    'payment_7th_month', 'payment_8th_month', 'payment_9th_month',
    'payment_10th_month', 'payment_11th_month', 'payment_12th_month',
])

export const addPaymentSchema = z.object({
    lead_id: z.string().min(1, "Pilih client terlebih dahulu"),
    name: z.string().min(1),
    email: z.string().email(),
    company: z.string().min(1),
    whatsapp: z.string().min(8),
    amount: z.coerce.number({ error: "Jumlah harus berupa angka" }).positive("Jumlah harus lebih dari 0"),
    pricing_tier: pricingTierEnum,
    invoice_type: invoiceTypeEnum,
    payment_type: paymentTypeEnum,
    payment_method: paymentMethodEnum,
    proof_of_payment: z.string().url("URL tidak valid").optional().or(z.literal("")),
})

export type AddPaymentValues = z.infer<typeof addPaymentSchema>
