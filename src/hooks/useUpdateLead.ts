import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { LeadStatus } from '@/types/leads'

type UpdatePayload = {
    status?: LeadStatus
    notes?: string
}

export function useUpdateLead() {
    const [loading, setLoading] = useState(false)

    const addLead = async (
        payload: UpdatePayload
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