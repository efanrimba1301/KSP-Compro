import { useMemo, useCallback, useState } from "react"
import { useHistoryPayments } from "./useHistoryPayments"
import { useUpdatePayment } from "./useUpdatePayments"
import type { HistoryPayment, PaymentStatus } from "@/types/HistoryPayment"
import { createPaymentColumns } from "@/Pages/Admin/payment-columns"

import { toast } from "sonner"

interface UseHistoryPaymentTableProps {
    onRowClick?: (payment: HistoryPayment) => void
}

export function useHistoryPaymentTable({ onRowClick }: UseHistoryPaymentTableProps) {
    const { data, loading, error, refetch } = useHistoryPayments()

    const [selectedPayment, setSelectedPayment] = useState<HistoryPayment | null>(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    const handleRowClick = useCallback((payment: HistoryPayment) => {
        setSelectedPayment(payment)
        setEditDialogOpen(true)
    }, [])

    const handleViewDetail = useCallback((payment: HistoryPayment) => {
        setSelectedPayment(payment)
        setEditDialogOpen(true)
    }, [])

    const handleEditDialogChange = useCallback(async (open: boolean) => {
        setEditDialogOpen(open)
        if (!open) {
            setTimeout(() => setSelectedPayment(null), 300)
        }
    }, [])


    return {
        data,
        loading,
        error,
        selectedPayment,
        editDialogOpen,
        handleRowClick,
        handleEditDialogChange,
    }
}