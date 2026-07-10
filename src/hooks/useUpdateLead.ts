import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { CloseReason, LeadStatus, ServiceType } from '@/types/leads'

type UpdatePayload = {
    status?: LeadStatus
    close_reason?: CloseReason | null
    notes?: string
}

type InsertPayload = {
    name: string
    email: string
    whatsapp: string
    company: string
    services_required: ServiceType[]
    budget_range: string
    heard_from: string
    project_detail: string
    notes?: string
    status: LeadStatus
}

export function useUpdateLead() {
    const [loading, setLoading] = useState(false)

    const addLead = async (
        payload: InsertPayload
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)
        const { error } = await supabase
            .from('leads')
            .insert(payload)
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    const updateLead = async (
        id: string,
        payload: UpdatePayload
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)

        const { error } = await supabase
            .from('leads')
            .update(payload)
            .eq('id', id)

        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    const deleteLead = async (
        id: string
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)

        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id)

        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    return { addLead, updateLead, deleteLead, loading }
}