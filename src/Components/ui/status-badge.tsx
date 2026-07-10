import { Badge } from '@/Components/ui/badge'
import type { LeadStatus, CloseReason } from '../../types/leads'

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
    leads: {
        label: 'Leads',
        className: 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
    },
    closed: {
        label: 'Close',
        className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20',
    },
    active: {
        label: 'Active Client',
        className: 'bg-[#2D4C11]/15 text-[#33BE21] border-[#33BE21]/30 hover:bg-[#E8FF5A]/20',
    },
    finish: {
        label: 'Finish',
        className: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30 hover:bg-neutral-500/20',
    },
}

interface StatusBadgeProps {
    status: LeadStatus
    closeReason?: CloseReason | null
}

export function StatusBadge({ status, closeReason }: StatusBadgeProps) {
    if (status === 'closed') {
        const isWon = closeReason === 'won'
        return (
            <Badge
                className={isWon
                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                    : 'bg-red-500/10 text-red-400 border-red-500/30'}
            >
                Closed ({isWon ? 'Won' : 'Lost'})
            </Badge>
        )
    }
    const config = statusConfig[status]
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
}
