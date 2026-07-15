// src/Components/PaymentDetailDialog.tsx

import { useState, useEffect } from "react"

import type {
    HistoryPayment,
    PaymentStatus,
    PricingTier,
    InvoiceType,
    paymentType,
    PaymentMethod,
} from "@/types/HistoryPayment"

import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "./ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
    Copy01Icon, PencilEdit01Icon, Delete01Icon,
    Mail01Icon,
    Call02Icon,
    ArrowDown01Icon,
    CheckIcon,
    TagIcon,
    Calendar01Icon,
    Invoice01Icon,
    CopyIcon,
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

// ─── Config ──────────────────────────────────────────────────────────────
const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
    waiting: { label: "Waiting", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
    success: { label: "Success", className: "bg-green-500/10 text-green-400 border-green-500/30" },
    failed: { label: "Failed", className: "bg-red-500/10 text-red-400 border-red-500/30" },
}

const pricingTierOptions: PricingTier[] = ["Basic", "Enterprise", "Custom"]
const invoiceTypeOptions: InvoiceType[] = ["monthly", "quarterly", "yearly"]


const fieldLabels: Partial<Record<keyof HistoryPayment, string>> = {
    amount: "Jumlah",
    invoice_type: "Invoice Type",
    pricing_tier: "Pricing Tier",
    payment_type: "Payment Type",
    payment_method: "Payment Method",
    proof_of_payment: "Bukti Bayar",
}

const statusOptions: {
    value: PaymentStatus
    label: string
}[] = [
        { value: "waiting", label: "Waiting" },
        { value: "success", label: "Success" },
        { value: "failed", label: "Failed" },
    ]

type EditableField = "amount" | "proof_of_payment" | "pricing_tier" | "invoice_type" | "email" | "whatsapp"

// ─── Props ───────────────────────────────────────────────────────────────
interface PaymentDetailDialogProps {
    payment: HistoryPayment | null
    allPayments: HistoryPayment[]
    open: boolean
    onOpenChange: (open: boolean) => void
    onStatusChange: (id: string, status: PaymentStatus) => void
    onUpdateField?: (id: string, field: keyof HistoryPayment, value: HistoryPayment[keyof HistoryPayment]) => Promise<{ success: boolean; error?: string }>
    onDelete: (id: string) => void
    onRefetch: () => void
}

export function PaymentDetailDialog({
    payment,
    allPayments,
    open,
    onOpenChange,
    onStatusChange,
    onUpdateField,
    onDelete,
    onRefetch
}: PaymentDetailDialogProps) {
    const [form, setForm] = useState({
        amount: "",
        proof_of_payment: "",
        pricing_tier: "",
        invoice_type: "",
        email: ''
    })
    const [originalValues, setOriginalValues] = useState(form)
    const [editingField, setEditingField] = useState<EditableField | null>(null)


    useEffect(() => {
        if (!payment) return
        const snapshot = {
            amount: String(payment.amount),
            invoice_type: payment.invoice_type,
            pricing_tier: payment.pricing_tier ?? '',
            email: payment.email ?? '',
            proof_of_payment: payment.proof_of_payment ?? "",
        }
        setForm(snapshot)
        setOriginalValues(snapshot)
        setEditingField(null)
    }, [payment])

    if (!payment) return null
    const currentPayment = allPayments.find((p) => p.id === payment.id) ?? payment
    const leadPayments = allPayments.filter((p) => p.lead_id === payment.lead_id)

    const commitField = async (field: keyof HistoryPayment, value: HistoryPayment[keyof HistoryPayment]) => {
        const { success, error } = await onUpdateField(payment.id, field, value)
        if (success) {
            toast.success(`${fieldLabels[field] ?? field} berhasil diperbarui`)
            onRefetch()
        } else {
            toast.error(`Gagal memperbarui ${fieldLabels[field] ?? field}`, { description: error })
        }
    }

    const handleFieldChange = (field: EditableField, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const commitFieldIfChanged = async (field: EditableField, rawValue: string) => {
        if (rawValue === originalValues[field]) return
        const value = field === "amount" ? Number(rawValue) : rawValue
        commitField(field, value as HistoryPayment[keyof HistoryPayment])
        setOriginalValues((prev) => ({ ...prev, [field]: rawValue }))
    }

    const handleToggleEdit = (field: EditableField) => {
        if (editingField === field) {
            commitFieldIfChanged(field, form[field])
            setEditingField(null)
        } else {
            setEditingField(field)
        }
    }

    const handleStatusChangeAndRefetch = (id: string, status: PaymentStatus) => {
        onStatusChange(id, status)
        onRefetch()   // ← tambahin ini
    }

    const handleInvoiceTypeSelect = (value: InvoiceType) => {
        handleFieldChange("invoice_type", value)
        commitField("invoice_type", value)
    }

    const handlePricingTierSelect = (value: PricingTier) => {
        handleFieldChange("pricing_tier", value)
        commitField("pricing_tier", value)
    }

    const handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value)
        toast.success(`${label} disalin!`)
    }

    const handleCopyProof = (value: string, label: "Bukti Bayar") => {
        navigator.clipboard.writeText(value)
        toast.success(`${label} disalin!`)
    }

    const handleDelete = () => {
        onDelete(payment.id)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-y-auto p-4"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >

                <DialogHeader>
                    <DialogTitle>
                        Detail Payment - {payment.invoice_number}
                    </DialogTitle>
                    <DialogDescription>
                        {payment.name} — {payment.company}
                    </DialogDescription>
                </DialogHeader>

                <div className="-mx-4 scrollbar-thumb-accent-foreground/20 max-h-[60vh] overflow-y-auto px-4 gap-y-12">

                    {/* Info Client — snapshot, read-only, demi integritas histori invoice */}
                    <div className="px-4 pt-4">
                        <div className="w-full flex items-center gap-4 text-lg font-bold text-neutral-400 px-4 ">
                            {payment.company}, {payment.invoice_number}
                        </div>
                        <div className="grid grid-cols-2 gap-3 px-4 py-4 items-center text-sm">
                            <EditablePropertyRow
                                icon={Call02Icon}
                                label="WhatsApp"
                                value={payment.whatsapp}
                                isEditing={editingField === 'whatsapp'}
                                onChange={(v) => handleFieldChange('whatsapp', v)}
                                onToggleEdit={() => handleToggleEdit('whatsapp')}
                                onCopy={() => handleCopy(payment.whatsapp, 'WhatsApp')}
                            />
                            <EditablePropertyRow
                                icon={Mail01Icon}
                                label="Email"
                                value={payment.email}
                                isEditing={editingField === 'email'}
                                onChange={(v) => handleFieldChange("email", v)}
                                onToggleEdit={() => handleToggleEdit("email")}
                                onCopy={() => handleCopy(payment.email, "Email")}


                            >
                            </EditablePropertyRow>
                            <PropertyRow icon={TagIcon} label="Pricing Tier">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between gap-2 py-2 cursor-pointer border border-input rounded-md">
                                            <Badge variant="outline">{currentPayment.pricing_tier}</Badge>
                                            <HugeiconsIcon icon={ArrowDown01Icon} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">

                                        {pricingTierOptions.map((opt) => {
                                            const isSelected = opt === form.pricing_tier
                                            return (
                                                <DropdownMenuItem
                                                    className={`cursor-pointer hover:bg-neutral-800 ${isSelected ? 'text-white' : ''}`}
                                                    key={opt}
                                                    onClick={() => handlePricingTierSelect(opt)}
                                                >
                                                    {opt}{isSelected && " ✓"}
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </PropertyRow>
                            <PropertyRow icon={Invoice01Icon} label="Invoice Type">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between cursor-pointer capitalize">
                                            <Badge variant="outline" className="capitalize">{currentPayment.invoice_type}</Badge>
                                            <HugeiconsIcon icon={ArrowDown01Icon} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {invoiceTypeOptions.map((t) => {
                                            const isSelected = t === form.invoice_type
                                            return (
                                                <DropdownMenuItem key={t} onClick={() => handleInvoiceTypeSelect(t)} className={isSelected ? "text-[#E8FF5A]" : ""}>
                                                    {t}{isSelected && " ✓"}
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </PropertyRow>
                            <PropertyRow icon={Calendar01Icon} label="Dibuat">
                                <div className="w-full border border-input rounded-md px-3 py-2 text-neutral-400 text-sm">
                                    {new Date(payment.created_at).toLocaleDateString("id-ID", {
                                        day: "numeric", month: "long", year: "numeric",
                                    })}
                                </div>
                            </PropertyRow>
                            <PropertyRow icon={Calendar01Icon} label="Tgl Bayar">
                                <div className="w-full  border border-input rounded-md px-3 py-2 text-neutral-400 text-sm">
                                    {payment.payment_date
                                        ? new Date(payment.payment_date).toLocaleDateString("id-ID", {
                                            day: "numeric", month: "long", year: "numeric",
                                        })
                                        : <span className="italic text-xs text-muted-foreground">(otomatis terisi saat status Success)</span>}
                                </div>
                            </PropertyRow>

                        </div>
                    </div>

                    {/* info payment history editble */}
                    <div className="flex flex-col px-8 gap-0.5">
                        <Table>
                            <TableCaption>A list of {payment.name} invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment Type</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-center">Salin Bukti Bayar</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {leadPayments.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.invoice_number}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="flex items-center gap-2 py-2 cursor-pointer">
                                                        <Badge className={statusConfig[p.status].className}>{p.status}</Badge>
                                                        <HugeiconsIcon icon={ArrowDown01Icon} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {statusOptions.map((opt) => (
                                                        <DropdownMenuItem
                                                            key={opt.value}
                                                            className={`cursor-pointer hover:bg-neutral-800 ${p.status === opt.value ? 'text-white' : ''}`}
                                                            onClick={() => handleStatusChangeAndRefetch(p.id, opt.value)}
                                                        >
                                                            {opt.label}
                                                            {p.status === opt.value && <HugeiconsIcon icon={CheckIcon} className="w-4 h-4 ml-auto" />}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{p.payment_type}</Badge>
                                        </TableCell>
                                        <TableCell>{p.payment_method.replace("_", " ")}</TableCell>
                                        <TableCell className="text-right">{p.amount}</TableCell>
                                        <TableCell className="text-center">
                                            {p.proof_of_payment ? (
                                                <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => handleCopyProof(p.proof_of_payment!, "Bukti Bayar")}>
                                                    <HugeiconsIcon icon={CopyIcon} className="size-3.5" />
                                                </Button>
                                            ) : (
                                                <span className="text-xs text-neutral-500 italic">Belum ada bukti bayar</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell className="text-right">
                                        {leadPayments.reduce((sum, p) => sum + p.amount, 0)}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>

                </div>

                <DialogFooter className="flex-row justify-between sm:justify-between px-8 pb-6 pt-2">
                    <Button
                        variant="outline"
                        className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-400 gap-2"
                        onClick={handleDelete}
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                        Hapus
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

// ─── Sub-components — sama persis pola PortfolioDetailDialog ─────────────
function PropertyRow({
    icon, label, children,
}: { icon: IconSvgElement; label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 py-1.5 rounded-md hover:bg-neutral-800/40 -mx-2 px-2 group">
            <div className="flex items-center gap-2 text-sm text-neutral-400 w-36 shrink-0">
                <HugeiconsIcon icon={icon} className="w-4 h-4 shrink-0" />
                {label}
            </div>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    )
}

function EditablePropertyRow({
    icon,
    label,
    value,
    isEditing,
    onChange,
    onToggleEdit,
    onCopy,
}: {
    icon: IconSvgElement
    label: string
    value: string
    isEditing: boolean
    onChange: (value: string) => void
    onToggleEdit: () => void
    onCopy?: () => void
}) {
    return (
        <PropertyRow icon={icon} label={label}>
            <div className="flex items-center gap-2">
                <input
                    disabled={!isEditing}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={[
                        "w-full border rounded-md px-3 py-2 text-sm transition-colors",
                        isEditing
                            ? 'border-[#E8FF5A]/50 text-white bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50'
                            : 'border-input text-neutral-400 bg-transparent cursor-not-allowed',
                    ].join(" ")}
                />
                {onCopy && (
                    <Button variant="outline" size="icon" type="button" className="shrink-0 h-7 w-7" onClick={onCopy}>
                        <HugeiconsIcon icon={Copy01Icon} className="w-3.5 h-3.5" />
                    </Button>
                )}
                <Button
                    variant={isEditing ? 'default' : 'outline'}
                    size="icon"
                    type="button"
                    className="shrink-0"
                    onClick={onToggleEdit}
                >
                    <HugeiconsIcon icon={PencilEdit01Icon} className="w-3.5 h-3.5" />
                </Button>
            </div>
        </PropertyRow>
    )
}