import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { HistoryPayment, PaymentStatus } from '@/types/HistoryPayment'

type InsertPayload = Omit<HistoryPayment, 'id' | 'created_at' | 'payment_date'>

export function useUpdatePayment() {
    const [loading, setLoading] = useState(false)

    const addPayment = async (
        payload: InsertPayload
    ): Promise<{ success: boolean; data?: HistoryPayment; error?: string }> => {
        setLoading(true)
        const { data, error } = await supabase
            .from('history_payment')
            .insert(payload)
            .select()
            .single()
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true, data: data as HistoryPayment }
    }

    // payment_date sekarang dihandle otomatis oleh trigger Postgres —
    // hook ini cuma perlu kirim status baru, gak perlu hitung tanggal manual
    const updatePaymentStatus = async (
        id: string,
        status: PaymentStatus
    ): Promise<{ success: boolean; payment_date: string | null; error?: string }> => {
        setLoading(true)
        const { data, error } = await supabase
            .from('history_payment')
            .update({ status })
            .eq('id', id)
            .select('payment_date')
            .single()
        setLoading(false)

        if (error) return { success: false, payment_date: null, error: error.message }
        return { success: true, payment_date: data?.payment_date ?? null }
    }

    const deletePayment = async (id: string): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)
        const { error } = await supabase.from('history_payment').delete().eq('id', id)
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    const updatePaymentField = async (
        id: string,
        field: keyof HistoryPayment,
        value: HistoryPayment[keyof HistoryPayment]
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true)
        const { error } = await supabase
            .from('history_payment')
            .update({ [field]: value })
            .eq('id', id)
        setLoading(false)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    return { addPayment, updatePaymentStatus, deletePayment, updatePaymentField, loading }
}