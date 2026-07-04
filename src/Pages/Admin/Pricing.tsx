import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowMoveUpRightIcon, PlusSignIcon, PencilEdit01Icon, Upload01Icon, LiveStreaming01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"

import { createPaymentColumns } from "./payment-columns";
import type { HistoryPayment, PaymentStatus } from "@/types/HistoryPayment";
import { HistoryPaymentDummyData } from "@/data/payment-dummy"

import { useState, useMemo, useCallback } from 'react'
import { DataTable } from '@/Components/ui/data-table'


const PricingPage = () => {
    const [payment, setPayment] = useState<HistoryPayment[]>(HistoryPaymentDummyData)

    const handleEdit = useCallback((payment: HistoryPayment) => {
        console.log('Edit payment:', payment)
        alert(`Edit: ${payment.name} — segera diimplementasikan`)
    }, [])

    const handleDelete = useCallback((id: string) => {
        const confirmed = window.confirm('Yakin hapus payment ini?')
        if (!confirmed) return
        setPayment((prev) => prev.filter((item) => item.id !== id))
    }, [])

    const handleStatusChange = useCallback((id: string, status: PaymentStatus) => {
        setPayment((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status } : item))
        )
    }, [])

    const handleRowClick = useCallback((payment: HistoryPayment) => {
        alert(`Detail: ${payment.name} — segera diimplementasikan`)
    }, [])

    const columns = useMemo(
        () => createPaymentColumns({
            onEdit: handleEdit,
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
        }),
        [handleEdit, handleDelete, handleStatusChange]
    )





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
                                <TooltipTrigger>
                                    <Button variant="outline">
                                        <HugeiconsIcon icon={PencilEdit01Icon} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Edit Harga</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="outline" disabled>
                                        <HugeiconsIcon icon={Upload01Icon} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs"> Publish </p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="default" disabled>
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
                                <CardTitle className="x-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-xl"> Rp 4.500.000 </CardTitle>

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
            <div className="flex flex-col gap-2 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="text-neutral-400 text-sm">
                        Histori Pembayaran
                    </p>
                    <Button>
                        <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                        Buat Payment
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={payment}
                    searchKey="name"
                    searchPlaceholder="Cari Nama atau Company"
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    )
}

export default PricingPage