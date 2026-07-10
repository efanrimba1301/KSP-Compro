import { useMemo, useCallback, useState } from 'react'
import { usePortfolios } from './usePortfolios'
import { useUpdatePortfolio } from './useUpdatePortfolio'
import { createPortfolioColumns } from '@/Pages/Admin/portofolio-columns'
import type { Portfolio, ProjectStatus } from '@/types/portfolio'
import { toast } from 'sonner'

export function usePortfolioTable() {
    const { data, loading, error, refetch } = usePortfolios()
    const { updatePortfolio, deletePortfolio } = useUpdatePortfolio()

    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleRowClick = useCallback((portfolio: Portfolio) => {
        setSelectedPortfolio(portfolio)
        setDialogOpen(true)
    }, [])

    const handleDialogOpenChange = useCallback((open: boolean) => {
        setDialogOpen(open)
        if (!open) setTimeout(() => setSelectedPortfolio(null), 300)
    }, [])

    const handleStatusChange = useCallback(async (id: string, status: ProjectStatus) => {
        const { success, error } = await updatePortfolio(id, { status })
        if (!success) {
            toast.error('Gagal mengubah status')
            console.error(error)
            return
        }
        refetch()
        setSelectedPortfolio((prev) => (prev?.id === id ? { ...prev, status } : prev))
        toast.success(`Status berhasil diubah ke "${status}"`)
    }, [updatePortfolio, refetch])

    const handleDelete = useCallback(async (id: string) => {
        const confirmed = window.confirm('Yakin hapus portfolio ini? Aksi ini tidak bisa dibatalkan.')
        if (!confirmed) return

        const { success, error } = await deletePortfolio(id)
        if (success) {
            refetch()
            toast.success('Portfolio berhasil dihapus')
        } else {
            toast.error('Gagal menghapus portfolio')
            console.error(error)
        }
    }, [deletePortfolio, refetch])

    const handleUpdateField = useCallback(
        async (id: string, field: keyof Portfolio, value: Portfolio[keyof Portfolio]) => {
            const { success, error } = await updatePortfolio(id, { [field]: value })
            if (success) {
                refetch()
            } else {
                console.error(`Gagal update ${field}:`, error)
                throw new Error(`Gagal update ${field}`)
            }
        },
        [updatePortfolio, refetch]
    )

    const columns = useMemo(
        () => createPortfolioColumns({
            onEdit: handleRowClick,
            onStatusChange: handleStatusChange,
            onDelete: handleDelete,
        }),
        [handleRowClick, handleStatusChange, handleDelete]
    )

    return {
        data, loading, error, refetch, columns,
        selectedPortfolio, dialogOpen,
        handleRowClick, handleDialogOpenChange,
        handleStatusChange, handleDelete, handleUpdateField,
    }
}