import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowMoveUpRightIcon, ArrowMoveDownRightIcon } from "@hugeicons/core-free-icons";

import { DataTable } from '@/Components/ui/data-table'
import { ChartAreaInteractive } from "@/Components/chart-area-interactive";
import { useVisitorStats } from '@/hooks/useVisitorStats'
import { LeadDetailDialog } from '@/Components/LeadsDetailDialog'
import { useLeadsTable } from "@/hooks/useLeadsTable";



const Dashboard = () => {
    const { stats, isLoading } = useVisitorStats()

    const {
        data,
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
        handleUpdateField,
    } = useLeadsTable()

    return (
        <>
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
            <div className="grid auto-rows-min gap-4 py-4 px-6">
                <h1>Dashboard</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 py-4 *:data-[slot=card]:bg-linear-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
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
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>New Clients</CardDescription>
                            <CardAction>

                            </CardAction>
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
                            <CardDescription>Active Project</CardDescription>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">10</CardTitle>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                            </div>
                            <div className="text-muted-foreground">
                                Projects for the last 1 months
                            </div>
                        </CardFooter>
                    </CardContent>
                </Card>
                <Card className="@container/card">
                    <CardContent>
                        <CardHeader>
                            <CardDescription>Total Visitors</CardDescription>
                            <CardAction>
                                <Badge variant="outline"
                                    className={
                                        stats.isIncreasing
                                            ? 'text-green-500 border-green-500/30'
                                            : 'text-red-500 border-red-500/30'
                                    }
                                >
                                    {stats.isIncreasing ? '+' : '-'}{stats.percentageChange}%
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {isLoading
                                ? '...'
                                : stats.totalThisMonth.toLocaleString('id-ID')
                            }
                        </CardTitle>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                {stats.isIncreasing ? (
                                    <>
                                        Trending up this month
                                        <HugeiconsIcon
                                            icon={ArrowMoveUpRightIcon}
                                            className="sm:size-4 text-green-500"
                                        />
                                    </>
                                ) : (
                                    <>
                                        Trending down this month
                                        <HugeiconsIcon
                                            icon={ArrowMoveDownRightIcon}
                                            className="sm:size-4 text-red-500"
                                        />
                                    </>
                                )}
                            </div>
                            <div className="text-muted-foreground">
                                Visitors for the last 1 months
                            </div>
                        </CardFooter>
                    </CardContent>
                </Card>
            </div>

            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>

            <div className="grid grid-cols-1 md:grid-row-2 auto-rows-min gap-2 py-6 px-6">
                <div className="flex justify-between items-center">
                    <p className="text-neutral-400 text-sm">
                        Overview leads dan client aktif
                    </p>
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
                <LeadDetailDialog
                    lead={selectedLead}
                    open={dialogOpen}
                    onOpenChange={handleDialogOpenChange}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    onUpdateField={handleUpdateField}

                />
            </div>
        </>
    )
}

export default Dashboard;