import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface VisitorStats {
    totalThisMonth: number
    totalLastMonth: number
    percentageChange: number
    isIncreasing: boolean
}

export function useVisitorStats() {
    const [stats, setStats] = useState<VisitorStats>({
        totalThisMonth: 0,
        totalLastMonth: 0,
        percentageChange: 0,
        isIncreasing: true,
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true)

            try {
                const now = new Date()

                // Range bulan ini: awal bulan ini → sekarang
                const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
                const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

                // Range bulan lalu: awal → akhir bulan lalu
                const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

                // Query bulan ini
                const { count: thisMonthCount, error: error1 } = await supabase
                    .from('page_views')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', startOfThisMonth.toISOString())
                    .lte('created_at', endOfThisMonth.toISOString())

                // Query bulan lalu
                const { count: lastMonthCount, error: error2 } = await supabase
                    .from('page_views')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', startOfLastMonth.toISOString())
                    .lte('created_at', endOfLastMonth.toISOString())

                if (error1 || error2) {
                    console.error('[VisitorStats] Error:', error1 || error2)
                    return
                }

                const thisMonth = thisMonthCount ?? 0
                const lastMonth = lastMonthCount ?? 0

                // Hitung persentase perubahan
                let percentageChange = 0
                if (lastMonth === 0 && thisMonth > 0) {
                    percentageChange = 100 // bulan lalu 0, bulan ini ada = naik 100%
                } else if (lastMonth > 0) {
                    percentageChange = Math.round(((thisMonth - lastMonth) / lastMonth) * 100)
                }

                setStats({
                    totalThisMonth: thisMonth,
                    totalLastMonth: lastMonth,
                    percentageChange: Math.abs(percentageChange),
                    isIncreasing: percentageChange >= 0,
                })

            } catch (err) {
                console.error('[VisitorStats] Catch error:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [])

    return { stats, isLoading }
}