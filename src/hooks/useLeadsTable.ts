import { useMemo, useCallback, useState } from 'react'
import { useLeads } from './useLeads'
import { useUpdateLead } from './useUpdateLead'
import { createLeadsColumns } from '@/Pages/Admin/leads-columns'
import type { CloseReason, Lead, LeadStatus } from '@/types/leads'

import { toast } from 'sonner'


const statusLabels: Record<LeadStatus, string> = {
    leads: 'Leads',
    closed: 'Closed',
    active: 'Active Client',
    finish: 'Finish',
}

interface UseLeadsTableOptions {
    onRowClick?: (lead: Lead) => void
}

export function useLeadsTable({ onRowClick }: UseLeadsTableOptions = {}) {
    const { data, loading, error, refetch } = useLeads()
    const { updateLead } = useUpdateLead()

    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)


    const handleRowClick = useCallback((lead: Lead) => {
        setSelectedLead(lead)
        setDialogOpen(true)
    }, [])

    const handleViewDetail = useCallback((lead: Lead) => {
        setSelectedLead(lead)
        setDialogOpen(true)
    }, [])

    const handleDialogOpenChange = useCallback((open: boolean) => {
        setDialogOpen(open)
        if (!open) { setTimeout(() => setSelectedLead(null), 300) }
    }, [])

    // useCallback — stable reference, useMemo columns tidak re-create tiap render
    const handleStatusChange = useCallback(async (id: string, status: LeadStatus, close_reason?: CloseReason) => {
        // Simpan status sebelumnya untuk undo
        const previous = data?.find((l) => l.id === id)
        const previousStatus = previous?.status
        const previousCloseReason = previous?.close_reason

        const payload = status === 'closed'
            ? { status, close_reason: close_reason ?? 'won' }
            : { status, close_reason: null }

        const { success, error } = await updateLead(id, payload)
        if (!success) {
            console.error('Gagal ganti status lead', error)
            toast.error('Gagal mengubah status')
            return
        }

        refetch()
        setSelectedLead((prev) => prev?.id === id ? { ...prev, ...payload } : prev)

        const label = status === 'closed'
            ? `Closed (${close_reason === 'lost' ? 'Lost' : 'Won'})`
            : statusLabels[status]

        const toastId = toast.success(`Status berhasil diubah ke "${label}"`, {
            action: previousStatus
                ? {
                    label: 'Undo',
                    onClick: async () => {
                        const { success: undoSuccess } = await updateLead(id, {
                            status: previousStatus,
                            close_reason: previousCloseReason ?? null,
                        })
                        if (undoSuccess) {
                            refetch()
                            setSelectedLead((prev) => prev?.id === id
                                ? { ...prev, status: previousStatus, close_reason: previousCloseReason }
                                : prev)
                            toast.success(`Status dikembalikan ke "${statusLabels[previousStatus]}"`, { id: toastId })
                        } else {
                            toast.error('Gagal mengembalikan status', { id: toastId })
                        }
                    },
                }
                : undefined,
        })
    },
        [updateLead, refetch, data]
    )



    // Soft delete — konsisten di semua halaman
    // TODO: nanti perlu diganti jadi Hard Delete
    const handleDelete = useCallback(async (id: string) => {
        const confirmed = window.confirm('Apakah Anda yakin ingin menghapus lead ini?')
        if (!confirmed) return

        const { success, error } = await updateLead(id, { status: 'finish' })
        if (success) {
            refetch()
        }
        else console.error("error delete lead", error)
    }, [updateLead, refetch]
    )

    const handleUpdateField = useCallback(async (id: string, field: keyof Lead, value: any) => {
        const { success, error } = await updateLead(id, { [field]: value })
        if (success) {
            refetch()
        }
        else {
            console.error(`Gagal update ${field}:`, error)
            throw new Error(`Gagal update ${field}`)
        }
    }, [updateLead, refetch])


    const columns = useMemo(
        () => createLeadsColumns({
            onStatusChange: handleStatusChange,
            onDelete: handleDelete,
            onViewDetail: handleViewDetail,
        }),
        [handleStatusChange, handleDelete, handleRowClick, handleViewDetail]
    )

    return {
        data,
        loading,
        error,
        refetch,
        columns,

        handleStatusChange,
        handleDelete,

        selectedLead,
        handleRowClick,

        dialogOpen,
        handleDialogOpenChange,
        handleUpdateField,
        handleViewDetail
    }


}