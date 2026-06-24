import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface ChartDataPoint {
    date: string      // format: "2024-06-24"
    desktop: number
    mobile: number
}

type TimeRange = '7d' | '30d' | '90d'

function getStartDate(timeRange: TimeRange): Date {
    const now = new Date()
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)
    return startDate
}

export function useVisitorChartData(timeRange: TimeRange) {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const startDate = getStartDate(timeRange)

                const { data, error: supabaseError } = await supabase
                    .from('page_views')
                    .select('created_at, device_type')
                    .gte('created_at', startDate.toISOString())
                    .order('created_at', { ascending: true })

                if (supabaseError) throw supabaseError

                // Group by date + device_type
                const grouped: Record<string, { desktop: number; mobile: number }> = {}

                data?.forEach((row) => {
                    // Ambil tanggal saja (tanpa jam)
                    const date = new Date(row.created_at).toISOString().split('T')[0]

                    if (!grouped[date]) {
                        grouped[date] = { desktop: 0, mobile: 0 }
                    }

                    if (row.device_type === 'desktop') {
                        grouped[date].desktop += 1
                    } else {
                        grouped[date].mobile += 1
                    }
                })

                // Convert ke format array yang dibutuhkan chart
                const formattedData: ChartDataPoint[] = Object.entries(grouped)
                    .map(([date, counts]) => ({
                        date,
                        desktop: counts.desktop,
                        mobile: counts.mobile,
                    }))
                    .sort((a, b) => a.date.localeCompare(b.date))

                setChartData(formattedData)
            } catch (err) {
                setError('Gagal mengambil data visitor')
                console.error('[ChartData] Error:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [timeRange]) // re-fetch setiap kali timeRange berubah

    return { chartData, isLoading, error }
}