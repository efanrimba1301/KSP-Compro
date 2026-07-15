//ui
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowMoveUpRightIcon, PlusSignIcon, PencilEdit01Icon, Upload01Icon, LiveStreaming01Icon, ArrowMoveDownRightIcon, Refresh01Icon, Download01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { AddPaymentSheet } from "@/Components/AddPaymentSheet"
import { toast } from "sonner"
import { DataTable } from '@/Components/ui/data-table'

//columns
import { createPaymentColumns } from "./payment-columns";
import type { HistoryPayment, PaymentStatus } from "@/types/HistoryPayment";

//hooks
import { useMemo, useCallback, useState } from 'react'
import { useRevenueStats } from "@/hooks/useRevanueStats"
import { useHistoryPayments } from "@/hooks/useHistoryPayments"
import { useUpdatePayment } from "@/hooks/useUpdatePayments"
import { PaymentDetailDialog } from "@/Components/PaymentDetailDialog"

//route
import { useNavigate } from "react-router"


const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)

const PricingPage = () => {
    const navigate = useNavigate()
    const { data: payment, loading, error, refetch } = useHistoryPayments()
    const { updatePaymentStatus, deletePayment, updatePaymentField } = useUpdatePayment()

    const [selectedPayment, setSelectedPayment] = useState<HistoryPayment | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)


    const handleEdit = useCallback((payment: HistoryPayment) => {
        console.log('Edit payment:', payment)
        alert(`Edit: ${payment.id} — segera diimplementasikan`)
    }, [])

    const handleDelete = useCallback(async (id: string) => {
        const confirmed = window.confirm('Yakin hapus payment ini?')
        if (!confirmed) return
        const { success, error } = await deletePayment(id)
        if (success) {
            refetch()
        } else {
            console.error(error)
        }

    }, [deletePayment, refetch])

    const handleStatusChange = useCallback(async (id: string, status: PaymentStatus) => {
        const { success, error } = await updatePaymentStatus(id, status)
        if (!success) {
            toast.error('Gagal mengubah status payment', { description: error })

            return
        }
        refetch()
        toast.success(`Status berhasil diubah ke "${status}"`)
    }, [updatePaymentStatus, refetch])

    const handleRowClick = useCallback((payment: HistoryPayment) => {
        setSelectedPayment(payment)
        setDialogOpen(true)
    }, [])

    const handleDialogOpenChange = useCallback((open: boolean) => {
        setDialogOpen(open)
        if (!open) setTimeout(() => setSelectedPayment(null), 300)
    }, [])

    const handleDialogUpdateField = useCallback(
        async (id: string, field: keyof HistoryPayment, value: HistoryPayment[keyof HistoryPayment]) => {
            const result = await updatePaymentField(id, field, value)
            if (result.success) refetch()
            return result
        },
        [updatePaymentField, refetch]
    )

    const columns = useMemo(
        () => createPaymentColumns({
            onEdit: handleEdit,
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
        }),
        [handleEdit, handleDelete, handleStatusChange]
    )

    const { revenueStats } = useRevenueStats(payment)

    return (
        <div className="grid auto-rows-min gap-4 py-4 px-6">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h1>Pricing</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <Separator />
            <div>
                <div className="flex items-center w-full gap-2 mb-2">
                    <h1 className="text-sm whitespace-nowrap">Price is: </h1>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 ">
                        <HugeiconsIcon icon={LiveStreaming01Icon} />
                        Live
                    </Badge>
                    <div className="flex justify-end w-full gap-2 mb-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">
                                        <HugeiconsIcon icon={PencilEdit01Icon} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Edit Harga</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" disabled>
                                        <HugeiconsIcon icon={Upload01Icon} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs"> Publish </p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="default"
                                        onClick={() => navigate('/admin/pricing/tambah')}
                                    >
                                        <HugeiconsIcon icon={PlusSignIcon} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs"> Tambah Pricing </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <Tabs defaultValue="monthly" className="w-full">
                    <TabsList className="flex w-full justify-center">
                        <TabsTrigger value="monthly" className="w-full">Monthly</TabsTrigger>
                        <TabsTrigger value="quarterly" className="w-full">Quarterly</TabsTrigger>
                        <TabsTrigger value="yearly" className="w-full">Yearly</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="monthly"
                        className=" grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 *:data-[slot=card]:bg-linear-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Basic</CardTitle>
                                <CardDescription>UMKM & Personal Brand</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Rp 4.500.000 </CardTitle>

                            </CardContent>
                        </Card>

                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Growth</CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        20%
                                    </Badge>
                                </CardAction>
                                <CardDescription>PT kecil-menengah</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Rp 8.000.000 </CardTitle>

                            </CardContent>
                        </Card>

                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Enterprise</CardTitle>
                                <CardDescription>Dukungan tingkat tinggi untuk arsitektur kompleks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Custom </CardTitle>

                            </CardContent>
                        </Card>

                    </TabsContent>
                    <TabsContent
                        value="quarterly"
                        className=" grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 *:data-[slot=card]:bg-linear-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Basic</CardTitle>
                                <CardDescription>UMKM & Personal Brand</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Rp 4.300.000 </CardTitle>

                            </CardContent>
                        </Card>

                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Growth</CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        20%
                                    </Badge>
                                </CardAction>
                                <CardDescription>PT kecil-menengah</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Rp 7.600.000 </CardTitle>

                            </CardContent>
                        </Card>

                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Enterprise</CardTitle>
                                <CardDescription>Dukungan tingkat tinggi untuk arsitektur kompleks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Custom </CardTitle>

                            </CardContent>
                        </Card>

                    </TabsContent>
                    <TabsContent
                        value="yearly"
                        className=" grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 *:data-[slot=card]:bg-linear-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Basic</CardTitle>
                                <CardDescription>UMKM & Personal Brand</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
                                    Rp 3.800.000
                                </CardTitle>

                            </CardContent>
                        </Card>

                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Growth</CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        20%
                                    </Badge>
                                </CardAction>
                                <CardDescription>PT kecil-menengah</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
                                    Rp 6.800.000
                                </CardTitle>

                            </CardContent>
                        </Card>

                        <Card className="@container/card">
                            <CardHeader>
                                <CardTitle>Enterprise</CardTitle>
                                <CardDescription>Dukungan tingkat tinggi untuk arsitektur kompleks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Custom </CardTitle>
                            </CardContent>
                        </Card>


                    </TabsContent>
                </Tabs>
            </div>
            <Separator />

            {loading && <p className="text-sm text-muted-foreground">Memuat data...</p>}
            {error && <p className="text-sm text-destructive">Gagal memuat data: {error}</p>}

            <div className="flex flex-col gap-2 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="text-neutral-400 text-sm">Histori Pembayaran</p>
                    <div className="flex gap-2">
                        <AddPaymentSheet
                            existingPayments={payment}
                            onSuccess={refetch}

                        />
                        <Button variant="secondary" >
                            <HugeiconsIcon icon={Download01Icon} />
                            Export to CSV
                        </Button>
                    </div>

                </div>
                {!loading && !error && (
                    <DataTable
                        columns={columns}
                        data={payment}
                        searchKey="name"
                        searchPlaceholder="Cari Nama atau Company"
                        onRowClick={handleRowClick}
                    />
                )}
            </div>

            <PaymentDetailDialog
                payment={selectedPayment}
                allPayments={payment}
                open={dialogOpen}
                onOpenChange={handleDialogOpenChange}
                onStatusChange={handleStatusChange}
                onUpdateField={handleDialogUpdateField}
                onDelete={handleDelete}
                onRefetch={refetch}
            />
        </div>
    )
}

export default PricingPage