import { useMemo } from "react";
import type { HistoryPayment } from "../types/HistoryPayment";

interface RevenueStats {
    totalRevenue: number
    lastMonthRevenue: number
    percentageChange: number
    trend: 'up' | 'down' | 'flat'
}

export function useRevenueStats(payments: HistoryPayment[]) {
    const revenueStats = useMemo<RevenueStats>(() => {
        const successPayments = payments.filter((p) => p.status === "success" && p.payment_date)

        const now = new Date()

        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

        const sumInMonth = (monthStart: Date) =>
            successPayments.filter((p) => {
                const paidAt = new Date(p.payment_date)
                return (
                    paidAt.getFullYear() === monthStart.getFullYear() &&
                    paidAt.getMonth() === monthStart.getMonth()
                )
            }).reduce((sum, p) => sum + p.amount, 0)

        const totalRevenue = sumInMonth(thisMonthStart)
        const lastMonthRevenue = sumInMonth(lastMonthStart)

        const percentageChange =
            lastMonthRevenue === 0
                ? (totalRevenue > 0 ? 100 : 0)
                : ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
        const trend: RevenueStats['trend'] =
            percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'flat'


        return {
            totalRevenue,
            lastMonthRevenue,
            percentageChange,
            trend,
        }
    }, [payments])

    return { revenueStats }

}