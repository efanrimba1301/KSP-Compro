export type PaymentStatus =
    | 'waiting'
    | 'success'
    | 'failed'

export type PringTier =
    | 'Basic'
    | 'Growth'
    | 'Enterprise'

export type InvoiceType =
    | 'monthly'
    | 'quarterly'
    | 'yearly'

export type paymentType =
    | 'onboarding_fee'
    | 'payment_1st_month'
    | 'payment_2nd_month'
    | 'payment_3rd_month'
    | 'payment_4th_month'
    | 'payment_5th_month'
    | 'payment_6th_month'
    | 'payment_7th_month'
    | 'payment_8th_month'
    | 'payment_9th_month'
    | 'payment_10th_month'
    | 'payment_11th_month'
    | 'payment_12th_month'

export type PaymentMethod =
    | 'bank_transfer'
    | 'credit_card'

export type HistoryPayment = {
    id: string
    name: string
    email: string
    company: string
    whatsapp: string
    amount: number
    invoice_number: string
    invoice_type: InvoiceType
    pricing_tier: PringTier
    payment_type: paymentType
    status: PaymentStatus
    proof_of_payment: string
    payment_method: PaymentMethod
    created_at: string
    payment_date: string
}