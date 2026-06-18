import { DataTable } from '@/Components/ui/data-table'
import { createLeadsColumns } from './leads-columns'
import type { LeadStatus } from '@/types/leads'
import { useUpdateLead } from '@/hooks/useUpdateLead'
import { useLeads } from '@/hooks/useLeads'
import { useMemo } from 'react'
import { ThemeProvider } from '@/Components/ui/ThemeProvider'
import { SidebarProvider } from '@/Components/ui/sidebar'
import { TooltipProvider } from '@/Components/ui/tooltip'
import AppsSidebar from '@/Components/AppsSidebar'
import HeaderDashboard from '@/Components/ui/HeaderDashboard'
import { SidebarInset } from '@/Components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { ArrowMoveUpRightIcon } from "@hugeicons/core-free-icons";
import { Button } from '@/Components/ui/button'

export default function Leads() {
    const { data: leads, loading, error, refetch } = useLeads()
    const { updateLead } = useUpdateLead()

    const handleStatusChange = async (id: string, status: LeadStatus) => {
        const { success, error } = await updateLead(id, { status })
        if (success) {
            refetch() // refresh tabel setelah update
        } else {
            console.error('Gagal update status:', error)
        }
    }
    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Yakin hapus lead ini?')
        if (!confirmed) return

        const { success, error } = await updateLead(id, { status: 'finish' })
        if (success) {
            refetch()
        } else {
            console.error('Gagal hapus:', error)
        }
    }

    const columns = useMemo(
        () => createLeadsColumns({
            onStatusChange: handleStatusChange,
            onDelete: handleDelete,
        }),
        [handleStatusChange, handleDelete]
    )

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider defaultOpen={false}>
                <TooltipProvider>
                    <AppsSidebar />
                    <SidebarInset>
                        <HeaderDashboard />
                        <div className="grid auto-rows-min gap-4 md:grid-cols-4 py-4 px-4">
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Total Clients</CardDescription>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">3</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Clients for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>

                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Total leads</CardDescription>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Clients for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Total Finish Clients</CardDescription>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Clients for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Total Revanue</CardDescription>
                                        <CardAction>
                                            <Badge variant="outline">
                                                20%
                                            </Badge>
                                        </CardAction>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">RP 1.200.000</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Revanue for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="p-4 flex-2">
                            {loading && (
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <div className="w-4 h-4 border-2 border-[#E8FF5A] border-t-transparent 
                                rounded-full animate-spin" />
                                    <span className="text-sm">Memuat data...</span>
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                    <p className="text-red-400 text-sm">Gagal memuat data: {error}</p>
                                    <button
                                        onClick={refetch}
                                        className="text-red-400 underline text-sm mt-1"
                                    >
                                        Coba lagi
                                    </button>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-row-2 auto-rows-min gap-2 py-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-neutral-400 text-sm">
                                        Overview leads dan client aktif
                                    </p>
                                    <Button
                                        variant='default'
                                        className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md text-sm">
                                        <HugeiconsIcon icon={AddSquareIcon} /> Tambah Leads
                                    </Button>
                                </div>
                                {!loading && !error && (
                                    <DataTable
                                        columns={columns}
                                        data={leads}
                                        searchKey="name"
                                        searchPlaceholder="Cari nama atau company..."
                                    />
                                )}
                            </div>
                        </div>
                    </SidebarInset>
                </TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}
