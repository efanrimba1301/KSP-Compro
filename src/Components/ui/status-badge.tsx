import { Badge } from '@/Components/ui/badge'
import type { LeadStatus } from '../../types/leads'

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
    leads: {
        label: 'Leads',
        className: 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
    },
    close: {
        label: 'Close',
        className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20',
    },
    active: {
        label: 'Active Client',
        className: 'bg-[#E8FF5A]/15 text-[#E8FF5A] border-[#E8FF5A]/30 hover:bg-[#E8FF5A]/20',
    },
    finish: {
        label: 'Finish',
        className: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30 hover:bg-neutral-500/20',
    },
}

export function StatusBadge({ status }: { status: LeadStatus }) {
    const config = statusConfig[status]
    return (
        <Badge
            variant="outline"
            className={`text-xs font-medium ${config.className}`}
        >
            {config.label}
        </Badge>
    )
}