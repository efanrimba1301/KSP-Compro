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