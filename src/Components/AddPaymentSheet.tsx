import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addPaymentSchema, type AddPaymentValues } from "@/schemas/payment_schema"
import { useUpdatePayment } from "@/hooks/useUpdatePayments"
import { generateInvoiceNumber } from "@/lib/generateInvoiceNumber"
import { getRecommendedPaymentType } from "@/lib/getRecommendedPaymentType"
import { ClientPicker } from "@/Components/ClientPicker"
import type { HistoryPayment, PricingTier, InvoiceType, PaymentMethod } from "@/types/HistoryPayment"
import type { Lead } from "@/types/leads"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
    Sheet, SheetClose, SheetContent, SheetDescription,
    SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/Components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import type z from "zod"

const pricingTierOptions: PricingTier[] = ['Basic', 'Growth', 'Enterprise']
const invoiceTypeOptions: InvoiceType[] = ['monthly', 'quarterly', 'yearly']
const paymentMethodOptions: PaymentMethod[] = ['bank_transfer', 'credit_card']

interface AddPaymentSheetProps {
    existingPayments: HistoryPayment[]
    onSuccess: () => void
    // Kalau disediakan (dipanggil dari LeadDetailDialog), lewati langkah pencarian client
    presetLead?: Lead
    // Trigger custom — biar bisa dipanggil "Buat payment baru untuk client ini" di dialog, bukan cuma tombol global
    trigger?: React.ReactNode
}

export function AddPaymentSheet({ existingPayments, onSuccess, presetLead, trigger }: AddPaymentSheetProps) {
    const [open, setOpen] = useState(false)
    const [selectedLead, setSelectedLead] = useState<Lead | null>(presetLead ?? null)
    const { addPayment, loading } = useUpdatePayment()

    const form = useForm<z.input<typeof addPaymentSchema>, any, z.output<typeof addPaymentSchema>>({
        resolver: zodResolver(addPaymentSchema),
        defaultValues: {
            lead_id: presetLead?.id ?? "",
            name: presetLead?.name ?? "",
            email: presetLead?.email ?? "",
            company: presetLead?.company ?? "",
            whatsapp: presetLead?.whatsapp ?? "",
            amount: 0,
            pricing_tier: "Basic",
            invoice_type: "monthly",
            payment_type: "onboarding_fee",
            payment_method: "bank_transfer",
            proof_of_payment: "",
        },
    })

    // Rekomendasi payment_type otomatis begitu client (preset atau dipilih) diketahui
    useEffect(() => {
        const lead = presetLead ?? selectedLead
        if (!lead) return

        const leadPayments = existingPayments.filter((p) => p.lead_id === lead.id)
        const recommended = getRecommendedPaymentType(leadPayments)
        form.setValue("payment_type", recommended)
    }, [presetLead, selectedLead, existingPayments])

    const handleClientSelect = (lead: Lead) => {
        setSelectedLead(lead)
        form.setValue("lead_id", lead.id)
        form.setValue("name", lead.name)
        form.setValue("email", lead.email)
        form.setValue("company", lead.company)
        form.setValue("whatsapp", lead.whatsapp)
    }

    const onSubmit = async (data: AddPaymentValues) => {
        const invoice_number = await generateInvoiceNumber()

        const { success, data: newPayment, error } = await addPayment({
            ...data,
            invoice_number,
            status: "waiting",
        })

        if (!success || !newPayment) {
            toast.error("Gagal membuat payment", { description: error })
            return
        }

        toast.success(`Payment ${invoice_number} berhasil dibuat`)
        onSuccess()
        form.reset()
        setSelectedLead(presetLead ?? null)
        setOpen(false)
    }

    const lockedClientFields = Boolean(presetLead ?? selectedLead)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger ?? (
                    <Button>
                        <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                        Buat Payment
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Buat Payment</SheetTitle>
                    <SheetDescription>
                        {presetLead ? `Payment baru untuk ${presetLead.name}` : "Pilih client yang sudah Closed (Won)"}
                    </SheetDescription>
                </SheetHeader>
                <form
                    id="form-add-payment"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1 overflow-y-auto scrollbar-thumb-black/40 px-4 grid gap-2"
                >
                    {/* Client picker — cuma muncul kalau BUKAN dari preset (dialog lead) */}
                    {!presetLead && (
                        <div className="grid gap-2">
                            <Label>Client</Label>
                            <ClientPicker
                                value={selectedLead?.id ?? null}
                                onSelect={handleClientSelect}
                            />
                            <span className="text-red-500 text-sm">{form.formState.errors.lead_id?.message}</span>
                        </div>
                    )}

                    {/* Field auto-fill — read-only kalau client sudah dipilih/preset */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Client</Label>
                        <Input {...form.register("name")} readOnly={lockedClientFields} className={lockedClientFields ? "bg-neutral-900 text-neutral-400" : ""} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input {...form.register("email")} readOnly={lockedClientFields} className={lockedClientFields ? "bg-neutral-900 text-neutral-400" : ""} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input {...form.register("company")} readOnly={lockedClientFields} className={lockedClientFields ? "bg-neutral-900 text-neutral-400" : ""} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                        <Input {...form.register("whatsapp")} readOnly={lockedClientFields} className={lockedClientFields ? "bg-neutral-900 text-neutral-400" : ""} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="amount">Jumlah (Rp)</Label>
                        <Input {...form.register("amount")} type="number" placeholder="15000000" />
                        <span className="text-red-500 text-sm">{form.formState.errors.amount?.message}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label>Pricing Tier</Label>
                            <Controller
                                control={form.control}
                                name="pricing_tier"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {pricingTierOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Invoice Type</Label>
                            <Controller
                                control={form.control}
                                name="invoice_type"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {invoiceTypeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Payment Type <span className="text-neutral-500 text-xs">(direkomendasikan otomatis)</span></Label>
                        <Controller
                            control={form.control}
                            name="payment_type"
                            render={({ field }) => (
                                <Input value={field.value} readOnly className="bg-neutral-900" />
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Payment Method</Label>
                        <Controller
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {paymentMethodOptions.map((m) => <SelectItem key={m} value={m}>{m.replace('_', ' ')}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="proof_of_payment">Bukti Bayar (URL, opsional)</Label>
                        <Input {...form.register("proof_of_payment")} placeholder="https://..." />
                    </div>
                </form>
                <SheetFooter className="mt-auto">
                    <Button type="submit" form="form-add-payment" disabled={loading}>
                        {loading ? "Menyimpan..." : "Save Payment"}
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}