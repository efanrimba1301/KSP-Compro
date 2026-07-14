// src/lib/getRecommendedPaymentType.ts
import type { HistoryPayment, paymentType } from "@/types/HistoryPayment"

const MONTHLY_SEQUENCE: paymentType[] = [
    'payment_1st_month', 'payment_2nd_month', 'payment_3rd_month',
    'payment_4th_month', 'payment_5th_month', 'payment_6th_month',
    'payment_7th_month', 'payment_8th_month', 'payment_9th_month',
    'payment_10th_month', 'payment_11th_month', 'payment_12th_month',
]

export function getRecommendedPaymentType(leadPayments: HistoryPayment[]): paymentType {
    const hasOnboarding = leadPayments.some((p) => p.payment_type === 'onboarding_fee')
    if (!hasOnboarding) return 'onboarding_fee'

    const paidMonths = leadPayments
        .filter((p) => MONTHLY_SEQUENCE.includes(p.payment_type))
        .map((p) => MONTHLY_SEQUENCE.indexOf(p.payment_type))

    const highestPaidIndex = paidMonths.length > 0 ? Math.max(...paidMonths) : -1
    const nextIndex = highestPaidIndex + 1

    return MONTHLY_SEQUENCE[nextIndex] ?? MONTHLY_SEQUENCE[MONTHLY_SEQUENCE.length - 1]
}