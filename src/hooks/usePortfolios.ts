import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Portfolio } from '@/types/portfolio'

type UsePortfoliosReturn = {
    data: Portfolio[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function usePortfolios(): UsePortfoliosReturn {
    const [data, setData] = useState<Portfolio[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPortfolios = async () => {
        setLoading(true)
        setError(null)

        const { data: portfolios, error: sbError } = await supabase
            .from('portfolio')
            .select('*')
            .order('created_at', { ascending: false })

        if (sbError) {
            setError(sbError.message)
            setData([])
        } else {
            setData(portfolios as Portfolio[])
        }
        setLoading(false)
    }

    useEffect(() => {
        let ignore = false

        const load = async () => {
            setLoading(true)
            setError(null)
            const { data: portfolios, error: sbError } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false })

            if (ignore) return
            if (sbError) {
                setError(sbError.message)
                setData([])
            } else {
                setData(portfolios as Portfolio[])
            }
            setLoading(false)
        }

        load()
        return () => { ignore = true }
    }, [])

    return { data, loading, error, refetch: fetchPortfolios }
}