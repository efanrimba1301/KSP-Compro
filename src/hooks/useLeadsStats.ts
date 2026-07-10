// src/hooks/useLeadsStats.ts
import { useMemo } from 'react'
import type { Lead } from '@/types/leads'

export function useLeadsStats(leads: Lead[]) {
    return useMemo(() => {
        const totalClients = leads.filter((l) => l.status === 'active' || l.status === 'finish').length
        const totalLeads = leads.filter((l) => l.status === 'leads').length
        const totalFinishClients = leads.filter((l) => l.status === 'finish').length
        return { totalClients, totalLeads, totalFinishClients }
    }, [leads])
}