import { useLeadsTable } from '@/hooks/useLeadsTable'
import { useLeadsStats } from '@/hooks/useLeadsStats'
import { useRevenueStats } from "@/hooks/useRevanueStats"


//ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowMoveDownRightIcon, ArrowMoveUpRightIcon } from "@hugeicons/core-free-icons";
import { LeadDetailDialog } from '@/Components/LeadsDetailDialog';
import { AddLeadSheet } from '@/Components/AddLeadsSheet'
import { DataTable } from '@/Components/ui/data-table'
import { useHistoryPayments } from '@/hooks/useHistoryPayments';


const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)

export default function Leads() {
    const { data,
        loading,
        error,
        refetch,
        columns,
        selectedLead,
        dialogOpen,
        handleRowClick,
        handleDialogOpenChange,
        handleStatusChange,
        handleDelete,
        handleUpdateField
    } = useLeadsTable()

    const { data: allPayments, refetch: refetchPayments } = useHistoryPayments()   // ← pastikan baris ini ada

    const stats = useLeadsStats(data)

    const { revenueStats } = useRevenueStats(allPayments)

    return (
        <>
            <div className="grid auto-rows-min gap-4 py-4 px-6">
                <h1>Leads</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 py-4 *:data-[slot=card]:bg-linear-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Total Clients</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.totalClients}</CardTitle>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground">
                                Client dengan status Active atau Finish
                            </div>
                        </CardFooter>
                    </CardContent>
                </Card>

                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Total leads</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.totalLeads}</CardTitle>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
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
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stats.totalFinishClients}</CardTitle>
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
                                <Badge
                                    variant="outline"
                                    className={revenueStats.trend === "up"
                                        ? "text-green-500 border-green-500/30"
                                        : revenueStats.trend === "down"
                                            ? "text-red-500 border-red-500/30"
                                            : "text-gray-500 border-gray-500/30"
                                    }>
                                    {revenueStats.percentageChange > 0 ? "+" : ""}{revenueStats.percentageChange.toFixed(2)}%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formatRupiah(revenueStats.totalRevenue)}</CardTitle>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className={`line-clamp-1 flex gap-2 font-medium ${revenueStats.trend === "up"
                                ? 'text-green-500'
                                : revenueStats.trend === "down"
                                    ? 'text-red-500'
                                    : 'text-gray-500'
                                }`}>
                                {revenueStats.trend === "up" ? "Trending up" : revenueStats.trend === "down" ? "Trending down" : "Flat"} this month{" "}
                                <HugeiconsIcon
                                    icon={revenueStats.trend === "up" ? ArrowMoveUpRightIcon : ArrowMoveDownRightIcon}
                                    className="sm:size-4"
                                />
                            </div>
                            <div className="text-muted-foreground">
                                Dari payment berstatus Success 1 bulan terakhir
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
                        <AddLeadSheet onSuccess={refetch} />
                    </div>
                    {!loading && !error && (
                        <DataTable
                            columns={columns}
                            data={data}
                            searchKey="name"
                            searchPlaceholder="Cari nama atau company..."
                            onRowClick={handleRowClick}
                        />
                    )}
                </div>

                <LeadDetailDialog
                    lead={selectedLead}
                    open={dialogOpen}
                    onOpenChange={handleDialogOpenChange}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onUpdateField={handleUpdateField}
                    allpayments={allPayments}
                    onRefetchPayments={refetchPayments}

                />
            </div>
        </>
    )
}
