// src/hooks/useSubmitLead.ts
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ServiceType } from '@/types/leads'

type SubmitLeadPayload = {
    name: string
    email: string
    whatsapp: string
    company: string
    services_required: ServiceType[]
    budget_range: string
    heard_from: string
    project_detail: string
}

export function useSubmitLead() {
    const [loading, setLoading] = useState(false)

    const submitLead = async (
        payload: SubmitLeadPayload
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)

        const { data, error } = await supabase
            .from('leads')
            .insert({
                ...payload,
                status: 'leads', // samain dengan default status yang dipakai AddLeadSheet di admin
            })
            .select()
            .single()

        setLoading(false)

        if (error) return { success: false, error: error.message }
        
        // Panggil Edge Function untuk mengirim email (Berjalan di background)
        if (data) {
            supabase.functions.invoke('on-new-lead', {
                body: { record: data }
            }).catch(console.error)
        }

        return { success: true }
    }

    return { submitLead, loading }
}