import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { HistoryPayment } from '@/types/HistoryPayment'

type UseHistoryPaymentsReturn = {
    data: HistoryPayment[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useHistoryPayments(): UseHistoryPaymentsReturn {
    const [data, setData] = useState<HistoryPayment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPayments = async () => {
        setLoading(true)
        setError(null)

        const { data: payments, error: sbError } = await supabase
            .from('history_payment')
            .select('*')
            .order('created_at', { ascending: false })

        if (sbError) {
            setError(sbError.message)
            setData([])
        } else {
            setData(payments as HistoryPayment[])
        }
        setLoading(false)
    }

    useEffect(() => {
        let ignore = false

        const load = async () => {
            setLoading(true)
            setError(null)
            const { data: payments, error: sbError } = await supabase
                .from('history_payment')
                .select('*')
                .order('created_at', { ascending: false })

            if (ignore) return
            if (sbError) {
                setError(sbError.message)
                setData([])
            } else {
                setData(payments as HistoryPayment[])
            }
            setLoading(false)
        }

        load()
        return () => { ignore = true }
    }, [])

    return { data, loading, error, refetch: fetchPayments }
}