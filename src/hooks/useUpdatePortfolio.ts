import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Portfolio, PortfolioInsertPayload } from '@/types/portfolio'

export function useUpdatePortfolio() {
    const [loading, setLoading] = useState(false)

    const addPortfolio = async (
        payload: PortfolioInsertPayload
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)
        const { error } = await supabase.from('portfolio').insert(payload)
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    const updatePortfolio = async (
        id: string,
        payload: Partial<Portfolio>
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)
        const { error } = await supabase.from('portfolio').update(payload).eq('id', id)
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    const deletePortfolio = async (
        id: string
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)
        const { error } = await supabase.from('portfolio').delete().eq('id', id)
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    return { addPortfolio, updatePortfolio, deletePortfolio, loading }
}