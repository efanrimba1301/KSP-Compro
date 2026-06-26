export type ProjectStatus = 'published' | 'draft' | 'archived';

export type ProjectType =
    | 'Web & App Development'
    | 'Mobile App'
    | 'SaaS Engineering'
    | 'UI/UX Design'
    | 'IoT'
    | 'AI Tool'
    | 'Others';

export type ProjectCategory = 'UMKM' | 'Enterprise' | 'Custom';


export interface Portfolio {
    id: string
    project_name: string
    client: string
    category: ProjectCategory
    services_required: ProjectType
    status: ProjectStatus
    year: number
    description: string
    is_featured: boolean
    created_at: string
}