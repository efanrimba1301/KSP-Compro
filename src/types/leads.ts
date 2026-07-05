export type LeadStatus =
    | 'leads'        // Pitching / belum deal
    | 'close'        // Deal tapi belum kickoff
    | 'active'       // Project on progress
    | 'finish'       // Project selesai

export type ServiceType =
    | 'Web & App Development'
    | 'UI/UX Design'
    | 'SaaS Engineering'
    | 'IoT Engineering'

export type BudgetRange =
    | 'Under 5JT'
    | '5JT - 15JT'
    | '15JT - 35JT'
    | '35JT - 65JT'
    | '65JT - 100JT'
    | '100JT++'

export type HeardFrom =
    | 'Instagram'
    | 'Google'
    | 'ChatGPT'
    | 'Other'

export type Lead = {
    id: string
    name: string
    email: string
    company: string
    whatsapp: string
    budget_range: string
    services_required: ServiceType[]
    heard_from: string
    project_detail: string
    status: LeadStatus
    notes?: string
    created_at: string
    updated_at: string
}