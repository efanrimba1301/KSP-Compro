import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card";
import { useMemo } from 'react'
import { useNavigate } from "react-router";
import { DataTable } from '@/Components/ui/data-table'
import { Button } from '@/Components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { PortfolioDetailDialog } from '@/Components/PortfolioDetailDialog'
import { usePortfolioTable } from "@/hooks/usePortfolioTable";

const PortfolioPage = () => {
    const navigate = useNavigate()
    const {
        data, loading, error, columns,
        selectedPortfolio, dialogOpen,
        handleRowClick, handleDialogOpenChange,
        handleStatusChange, handleDelete, handleUpdateField,
    } = usePortfolioTable()

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
            {!loading && !error && <DataTable
                columns={columns}
                data={data}
                searchKey="project_name"
                searchPlaceholder="Cari nama project atau client..."
                onRowClick={handleRowClick}
            />}

            <PortfolioDetailDialog
                open={dialogOpen}
                onOpenChange={handleDialogOpenChange}
                portfolio={selectedPortfolio}
                onStatusChange={handleStatusChange}
                onUpdateField={handleUpdateField}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default PortfolioPage