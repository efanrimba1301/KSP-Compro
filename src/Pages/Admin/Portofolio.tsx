import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from "react-router";
import { DataTable } from '@/Components/ui/data-table'
import { Button } from '@/Components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { createPortfolioColumns } from './portofolio-columns'
import { portfolioDummyData } from '@/data/portofolio-dummy'
import type { Portfolio, ProjectStatus } from '@/types/portfolio'

const PortfolioPage = () => {
    // State data — nanti diganti dengan hook Supabase
    const [data, setData] = useState<Portfolio[]>(portfolioDummyData)
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null)
    const navigate = useNavigate();

    // ─── Handlers ──────────────────────────────────────────────────────────
    const handleEdit = useCallback((portfolio: Portfolio) => {
        // TODO: buka dialog/modal edit
        console.log('Edit portfolio:', portfolio)
        alert(`Edit: ${portfolio.project_name} — segera diimplementasikan`)
    }, [])

    const handleDelete = useCallback((id: string) => {
        const confirmed = window.confirm('Yakin hapus portfolio ini?')
        if (!confirmed) return
        setData((prev) => prev.filter((item) => item.id !== id))
    }, [])

    const handleStatusChange = useCallback((id: string, status: ProjectStatus) => {
        setData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status } : item))
        )
        setSelectedPortfolio((prev) =>
            prev?.id === id ? { ...prev, status } : prev
        )
    }, [])

    const handleRowClick = useCallback((portfolio: Portfolio) => {
        alert(`Edit: ${portfolio.project_name} — segera diimplementasikan`)
    }, [])

    // ─── Column definition ─────────────────────────────────────────────────
    const columns = useMemo(
        () => createPortfolioColumns({
            onEdit: handleEdit,
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
        }),
        [handleEdit, handleDelete, handleStatusChange]
    )

    // ─── Summary stats (dari data) ─────────────────────────────────────────
    const stats = useMemo(() => ({
        total: data.length,
        published: data.filter((d) => d.status === 'published').length,
        draft: data.filter((d) => d.status === 'draft').length,
        featured: data.filter((d) => d.is_featured).length,
    }), [data])

    return (
        <div className="flex flex-col gap-6 py-6 px-6">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h1>Portfolio</h1>
                </div>
                <Button
                    onClick={() => navigate('/admin/portfolio/tambah')}
                >
                    <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                    Tambah Project
                </Button>
            </div>

            {/* ── Summary Cards ──────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Total */}
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Total Project</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.total}</CardTitle>
                    </CardContent>
                </Card>
                {/* Published */}
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Published</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.published}</CardTitle>
                    </CardContent>
                </Card>
                {/* Draft */}
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Draft</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.draft}</CardTitle>
                    </CardContent>
                </Card>
                {/* Featured */}
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Featured</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.featured}</CardTitle>
                    </CardContent>
                </Card>
            </div>

            {/* ── Table ──────────────────────────────────────────────── */}
            <DataTable
                columns={columns}
                data={data}
                searchKey="project_name"
                searchPlaceholder="Cari nama project atau client..."
                onRowClick={handleRowClick}

            />

        </div>
    )
}

export default PortfolioPage