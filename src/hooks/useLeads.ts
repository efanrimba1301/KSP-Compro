import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/types/leads'


type UseLeadsReturn = {
    data: Lead[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useLeads(): UseLeadsReturn {
    const [data, setData] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchLeads = async () => {
        setLoading(true)
        setError(null)

        const { data: leads, error: sbError } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })

        if (sbError) {
            setError(sbError.message)
            setData([])
        } else {
            setData(leads as Lead[])
        }

        setLoading(false)
    }

    useEffect(() => {
        let ignore = false

        const fetchLeads = async () => {
            setLoading(true)
            setError(null)

            const { data: leads, error: sbError } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })

            if (ignore) return

            if (sbError) {
                setError(sbError.message)
                setData([])
            } else {
                setData(leads as Lead[])
            }

            setLoading(false)
        }

        fetchLeads()

        return () => {
            ignore = true
        }
    }, [])

    return {
        data,
        loading,
        error,
        refetch: fetchLeads,
    }
}