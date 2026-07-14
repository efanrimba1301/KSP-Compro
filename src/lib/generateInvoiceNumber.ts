import { supabase } from '@/lib/supabase'

export async function generateInvoiceNumber(): Promise<string> {
    const { data, error } = await supabase
        .from('history_payment')
        .select('invoice_number')
        .order('created_at', { ascending: false })
        .limit(1)

    if (error || !data || data.length === 0) return 'INV-001'

    const match = data[0].invoice_number.match(/INV-(\d+)/)
    const lastNumber = match ? parseInt(match[1], 10) : 0
    return `INV-${String(lastNumber + 1).padStart(3, '0')}`
}