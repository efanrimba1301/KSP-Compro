// src/Components/LeadDetailDialog.tsx

import { useState, useEffect } from "react"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { StatusBadge } from "@/Components/ui/status-badge"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import type { Lead, LeadStatus, BudgetRange, ServiceType, CloseReason } from '@/types/leads'
import { AddPaymentSheet } from "@/Components/AddPaymentSheet"
import { HugeiconsIcon } from '@hugeicons/react'
import {
    Copy01Icon,
    Call02Icon,
    StatusIcon,
    MoneyBag01Icon,
    SourceCodeSquareIcon,
    Megaphone02Icon,
    Calendar01Icon,
    ArrowDown01Icon,
    Mail01Icon,
    PencilEdit01Icon,
    Delete01Icon,
    PlusSignIcon
} from '@hugeicons/core-free-icons'

import type { IconSvgElement } from '@hugeicons/react'
import { toast } from "sonner"
import type { HistoryPayment } from "@/types/HistoryPayment"


// ─── Props ───────────────────────────────────────────────────────────────
interface LeadDetailDialogProps {
    lead: Lead | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onStatusChange: (id: string, status: LeadStatus, closeReason?: CloseReason) => void
    onDelete: (id: string) => void
    // ← optional — sambungkan ke useUpdateLead nanti kalau mau persist ke DB
    onUpdateField?: (id: string, field: keyof Lead, value: string) => Promise<void>
    allpayments: HistoryPayment[]
    onRefetchPayments: () => void
}


const fieldLabels: Record<EditableField, string> = {
    company: 'Company / Brand',
    email: 'Email',
    whatsapp: 'WhatsApp',
    budget_range: 'Budget',
    heard_from: 'Asal Lead',
    services_required: 'Service Required',
    project_detail: 'Project Detail',
    notes: 'Notes',
}

const statusOptions: {
    value: LeadStatus;
    label: string;
}[] = [
        { value: 'leads', label: 'Leads' },
        { value: 'active', label: 'Active Client' },
        { value: 'finish', label: 'Finish' },
    ]

const heardFromOptions = ['Instagram', 'Google', 'LinkedIn', 'Referral', 'Website']

const serviceOptions: ServiceType[] = [
    'Web & App Development',
    'UI/UX Design',
    'SaaS Engineering',
    'IoT Engineering'
]

const budgetRangeOptions: BudgetRange[] = [
    'Under 5JT',
    '5JT - 15JT',
    '15JT - 35JT',
    '35JT - 65JT',
    '65JT - 100JT',
    '100JT++'
]

type EditableField = 'company' | 'email' | 'whatsapp' | 'budget_range' | 'heard_from' | 'services_required' | 'project_detail' | 'notes'

export function LeadDetailDialog({
    lead,
    open,
    onOpenChange,
    onStatusChange,
    onDelete,
    onUpdateField,
    allpayments,
    onRefetchPayments
}: LeadDetailDialogProps) {
    // ── Local state — supaya input benar-benar controlled & re-render ──
    const [form, setForm] = useState({
        company: '',
        email: '',
        whatsapp: '',
        budget_range: '',
        heard_from: '',
        services_required: [] as string[],
        project_detail: '',
        notes: '',
    })
    const [editingField, setEditingField] = useState<EditableField | null>(null)
    const [originalValues, setOriginalValues] = useState(form)

    // Sync form state setiap kali lead yang dibuka berubah
    useEffect(() => {
        if (!lead) return
        const snapshot = {
            company: lead.company ?? '',
            email: lead.email ?? '',
            whatsapp: lead.whatsapp ?? '',
            budget_range: lead.budget_range ?? '',
            heard_from: lead.heard_from ?? '',
            close_reason: lead.close_reason ?? '',
            services_required: lead.services_required ?? [],
            project_detail: lead.project_detail ?? '',
            notes: lead.notes ?? '',
        }
        setForm(snapshot)
        setOriginalValues(snapshot)
        setEditingField(null)
    }, [lead])

    if (!lead) return null

    const leadPayments = allpayments.filter((p) => p.lead_id === lead.id)


    const paymentStatusConfig: Record<string, string> = {
        waiting: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
        success: 'bg-green-500/10 text-green-400 border-green-500/30',
        failed: 'bg-red-500/10 text-red-400 border-red-500/30',
    }

    // ── Handlers ──────────────────────────────────────────────────────
    const handleFieldChange = (field: EditableField, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const commitFieldIfChanged = async (field: EditableField, value: any) => {

        if (value === originalValues[field]) return; // tidak berubah → skip, tidak ada request

        const previousValue = originalValues[field]

        try {
            await onUpdateField?.(lead.id, field, value)
            setOriginalValues((prev) => ({ ...prev, [field]: value }))

            const toastId = toast.success(`${fieldLabels[field]} berhasil diperbarui`, {
                description: `Diubah dari "${previousValue || '—'}" menjadi "${value || '—'}"`,
                duration: 1000,
                action: {
                    label: 'Undo',
                    onClick: (e) => {
                        e.preventDefault()
                        handleUndoField(field, previousValue, toastId)
                    },
                },
            })
        } catch {
            toast.error(`Gagal memperbarui ${fieldLabels[field]}`)
        }
    }

    const handleUndoField = async (
        field: EditableField,
        previousValue: any,
        toastId: string | number
    ) => {
        // Optimistic — balikin tampilan form dulu, jangan tunggu server
        handleFieldChange(field, previousValue)

        try {
            await onUpdateField?.(lead.id, field, previousValue)
            setOriginalValues((prev) => ({ ...prev, [field]: previousValue }))

            // Timpa toast yang sama (pakai id), bukan bikin toast baru numpuk
            toast.success(`${fieldLabels[field]} dikembalikan`, {
                id: toastId,
                description: `Nilai dikembalikan ke "${previousValue || '—'}"`,
            })
        } catch {
            toast.error(`Gagal mengembalikan ${fieldLabels[field]}`, { id: toastId })
        }
    }


    // Toggle edit — kalau lagi edit & ditekan lagi = simpan
    const handleToggleEdit = (field: EditableField) => {
        if (editingField === field) {
            // onUpdateField?.(lead.id, field, form[field])
            commitFieldIfChanged(field, form[field])
            setEditingField(null)
        } else {
            setEditingField(field)
        }
    }

    const handleHeardFromSelect = (value: string) => {
        handleFieldChange('heard_from', value)
        //onUpdateField?.(lead.id, 'heard_from', value)
        commitFieldIfChanged('heard_from', value)
    }

    const handleServiceRequiredSelect = (value: string) => {
        const current = Array.isArray(form.services_required) ? form.services_required : []
        const newServices = current.includes(value)
            ? current.filter((s) => s !== value)
            : [...current, value]

        handleFieldChange('services_required', newServices)
        commitFieldIfChanged('services_required', newServices)
    }

    const handleBudgetRangeSelect = (value: string) => {
        handleFieldChange('budget_range', value)
        //onUpdateField?.(lead.id, 'budget_range', value)
        commitFieldIfChanged('budget_range', value)
    }

    const handleDelete = () => {
        onDelete(lead.id)
        onOpenChange(false)
    }

    const handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value)
        toast.success(`${label} disalin!`)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* ── FIX: width responsive + scrollable, bukan fixed 1400px ── */}
            <DialogContent
                className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-y-auto p-4"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => {
                    const target = e.target as Element
                    if (target?.closest('[data-sonner-toaster]')) {
                        e.preventDefault()
                    }
                }}
                onInteractOutside={(e) => {
                    const target = e.target as Element
                    if (target?.closest('[data-sonner-toaster]')) {
                        e.preventDefault()
                    }
                }}
            >

                <DialogHeader>
                    <DialogTitle>Detail Leads - {lead.name}</DialogTitle>
                    <DialogDescription>
                        {lead.email} | {lead.company}
                    </DialogDescription>
                </DialogHeader>

                <div className="-mx-4 scrollbar-thumb-accent-foreground/20 max-h-[60vh] overflow-y-auto px-4 gap-y-12">

                    {/* ── Company title — FIX: local state, bukan mutate prop ── */}
                    <input
                        className="w-full border border-input px-3 py-2 rounded-md text-lg font-bold bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50"
                        value={form.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        onBlur={() => commitFieldIfChanged('company', form.company)}
                    />

                    {/* ── FIX: grid responsive, stack di mobile, 2 kolom di desktop ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mt-4">

                        {/* ── Kolom Kiri ────────────────────────────────── */}
                        <div className="flex flex-col">
                            {/* Lead Status */}
                            <DetailRow icon={StatusIcon} label="Lead Status">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 py-2 cursor-pointer"
                                        >
                                            <StatusBadge status={lead.status} closeReason={lead.close_reason} />
                                            <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {statusOptions.map((opt) => (
                                            <DropdownMenuItem
                                                key={opt.value}
                                                className={`cursor-pointer hover:bg-neutral-800 ${lead.status === opt.value ? 'text-[#E8FF5A]' : 'text-neutral-200'
                                                    }`}
                                                onClick={() => onStatusChange(lead.id, opt.value)}
                                            >
                                                {opt.label}
                                                {lead.status === opt.value && ' ✓'}
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator className="bg-neutral-800" />
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="text-neutral-200 hover:bg-neutral-800 cursor-pointer">
                                                Closed
                                                {lead.status === 'closed' && (
                                                    <span className={lead.close_reason === 'lost' ? 'text-red-400' : 'text-[#53ee5b]'}>
                                                        {' '}({lead.close_reason === 'lost' ? 'Lost' : 'Won'})
                                                    </span>
                                                )}
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuSubContent className="bg-neutral-900 border-neutral-800">
                                                <DropdownMenuItem
                                                    className="cursor-pointer hover:bg-neutral-800 text-[#53ee5b]"
                                                    onClick={() => onStatusChange(lead.id, 'closed', 'won')}
                                                >
                                                    Won
                                                    {lead.status === 'closed' && lead.close_reason === 'won' && ' ✓'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer hover:bg-neutral-800 text-red-400"
                                                    onClick={() => onStatusChange(lead.id, 'closed', 'lost')}
                                                >
                                                    Lost
                                                    {lead.status === 'closed' && lead.close_reason === 'lost' && ' ✓'}
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuSub>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </DetailRow>

                            {/* Email */}
                            <EditableInputRow
                                icon={Mail01Icon}
                                label="Email"
                                value={form.email}
                                isEditing={editingField === 'email'}
                                onChange={(v) => handleFieldChange('email', v)}
                                onToggleEdit={() => handleToggleEdit('email')}
                                onCopy={() => handleCopy(form.email, 'Email')}
                            />

                            {/* WhatsApp */}
                            <EditableInputRow
                                icon={Call02Icon}
                                label="WhatsApp"
                                value={form.whatsapp}
                                isEditing={editingField === 'whatsapp'}
                                onChange={(v) => handleFieldChange('whatsapp', v)}
                                onToggleEdit={() => handleToggleEdit('whatsapp')}
                                onCopy={() => handleCopy(form.whatsapp, 'WhatsApp')}
                            />

                            {/* Created Date — read only */}
                            <DetailRow icon={Calendar01Icon} label="Created Date">
                                <span className="w-full border border-input rounded-md px-3 py-2 text-neutral-400 text-sm">
                                    {new Date(lead.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </span>
                            </DetailRow>
                        </div>

                        {/* ── Kolom Kanan ───────────────────────────────── */}
                        <div className="flex flex-col">
                            {/* Heard From — FIX: sekarang benar-benar berfungsi */}
                            <DetailRow icon={Megaphone02Icon} label="Heared From">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 py-2 cursor-pointer"
                                        >
                                            <Badge variant="outline">{form.heard_from || '—'}</Badge>
                                            <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {heardFromOptions.map((opt) => (
                                            <DropdownMenuItem
                                                key={opt}
                                                className={`cursor-pointer hover:bg-neutral-800 ${form.heard_from === opt ? 'text-[#E8FF5A]' : 'text-neutral-200'
                                                    }`}
                                                onClick={() => handleHeardFromSelect(opt)}
                                            >
                                                {opt}
                                                {form.heard_from === opt && ' ✓'}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </DetailRow>

                            {/* Service Required — dari database (any) */}
                            <DetailRow icon={SourceCodeSquareIcon} label="Service Required">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full py-2 h-auto justify-between font-normal flex flex-wrap gap-2">
                                            <div className="flex gap-2 flex-wrap flex-1 text-left">
                                                {(Array.isArray(form.services_required) ? form.services_required : []).map((service) => (
                                                    <Badge key={service} variant="outline">{service}</Badge>
                                                ))}
                                                {(!form.services_required || form.services_required.length === 0) && "Select Services"}
                                            </div>
                                            <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 shrink-0 mt-1" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {serviceOptions.map((opt) => {
                                            const isSelected = (Array.isArray(form.services_required) ? form.services_required : []).includes(opt);
                                            return (
                                                <DropdownMenuItem
                                                    key={opt}
                                                    className={`cursor-pointer hover:bg-neutral-800 ${isSelected ? 'text-[#E8FF5A]' : 'text-neutral-200'}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleServiceRequiredSelect(opt);
                                                    }}
                                                >
                                                    {opt}
                                                    {isSelected && ' ✓'}
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </DetailRow>

                            {/* Budget Range */}
                            <DetailRow icon={MoneyBag01Icon} label="Budget Range" >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full py-4.5 justify-between font-normal">
                                            {form.budget_range || "Select Budget Range"}
                                            <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {budgetRangeOptions.map((opt) => (
                                            <DropdownMenuItem
                                                key={opt}
                                                className={`cursor-pointer hover:bg-neutral-800 ${form.budget_range === opt ? 'text-[#E8FF5A]' : 'text-neutral-200'
                                                    }`}
                                                onClick={() => handleBudgetRangeSelect(opt)}
                                            >
                                                {opt}
                                                {form.budget_range === opt && ' ✓'}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </DetailRow>

                            {/* Last Update — FIX: pakai updated_at, bukan created_at */}
                            <DetailRow icon={Calendar01Icon} label="Last Update">
                                <span className="w-full border border-input rounded-md px-3 py-2 text-neutral-400 text-sm">
                                    {lead.updated_at
                                        ? new Date(lead.updated_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'long', year: 'numeric',
                                        })
                                        : '—'}
                                </span>
                            </DetailRow>
                        </div>
                    </div>

                    {/* ── Project Detail — FIX: hapus duplicate children, local state ── */}
                    <div className="flex flex-col gap-1.5 mt-4">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                            Detail Project
                        </p>
                        <textarea
                            className="w-full min-h-32 p-3 border border-input rounded-md text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50 resize-y"
                            value={form.project_detail}
                            onChange={(e) => handleFieldChange('project_detail', e.target.value)}
                            onBlur={() => commitFieldIfChanged('project_detail', form.project_detail)}
                        />
                    </div>

                    {/* ── Project Note ── */}
                    <div className="flex flex-col gap-1.5 mt-4">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                            Internal Notes
                        </p>
                        <textarea
                            className="w-full min-h-14 p-3 border border-input rounded-md text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50 resize-y"
                            value={form.notes}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                            onBlur={() => commitFieldIfChanged('notes', form.notes)}
                        />
                    </div>
                    {/* ── History Payment client ini ── */}
                    <div className="flex flex-col gap-2 mt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                                History Payment
                            </p>
                            <AddPaymentSheet
                                existingPayments={allpayments}
                                presetLead={lead}
                                onSuccess={() => onRefetchPayments()}
                                trigger={
                                    <Button variant="outline" size="sm">
                                        <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
                                        Buat payment baru
                                    </Button>
                                }
                            />
                        </div>

                        {leadPayments.length === 0 ? (
                            <p className="text-sm text-neutral-500 italic py-4 text-center border border-dashed border-neutral-800 rounded-md">
                                Belum ada payment untuk client ini.
                            </p>
                        ) : (
                            <div className="border border-neutral-800 rounded-md overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-neutral-900">
                                        <tr>
                                            <th className="text-left px-3 py-2 text-neutral-400 font-medium">Payment Type</th>
                                            <th className="text-left px-3 py-2 text-neutral-400 font-medium">Pricing Tier</th>
                                            <th className="text-left px-3 py-2 text-neutral-400 font-medium">Amount</th>
                                            <th className="text-left px-3 py-2 text-neutral-400 font-medium">Payment Date</th>
                                            <th className="text-left px-3 py-2 text-neutral-400 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leadPayments.map((p) => (
                                            <tr key={p.id} className="border-t border-neutral-800">
                                                <td className="px-3 py-2 text-neutral-200 capitalize">
                                                    <a href={`/admin/pricing`}>
                                                        {p.payment_type.replace(/_/g, ' ')}
                                                    </a>
                                                </td>
                                                <td className="px-3 py-2 text-neutral-200">
                                                    {p.pricing_tier}
                                                </td>
                                                <td className="px-3 py-2 text-neutral-200">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p.amount)}
                                                </td>
                                                <td className="px-3 py-2 text-neutral-400">
                                                    {p.payment_date
                                                        ? new Date(p.payment_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                                                        : <span className="italic">—</span>}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${paymentStatusConfig[p.status]}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── FIX: onDelete sekarang benar-benar dipakai ── */}
                <DialogFooter className="flex-row justify-between sm:justify-between gap-2">
                    <Button
                        variant="outline"
                        className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-400 gap-2"
                        onClick={handleDelete}
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                        Hapus Lead
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// ─── Sub-components — reusable, konsisten padding/gap/responsive ──────────

function DetailRow({
    icon,
    label,
    children,
}: {
    icon: IconSvgElement
    label: string
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 py-2">
            <div className="flex items-center gap-2 text-sm text-neutral-400 sm:min-w-36 shrink-0">
                <HugeiconsIcon icon={icon} className="w-4 h-4 shrink-0" />
                {label}
            </div>
            <div className="flex w-full items-center gap-2">
                {children}
            </div>
        </div>
    )
}

function EditableInputRow({
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
        <DetailRow icon={icon} label={label}>
            <input
                disabled={!isEditing}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={[
                    'w-full border rounded-md px-3 py-2 text-sm transition-colors',
                    isEditing
                        ? 'border-[#E8FF5A]/50 text-white bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50'
                        : 'border-input text-neutral-400 bg-transparent cursor-not-allowed',
                ].join(' ')}
            />
            {onCopy && (
                <Button variant="outline" size="icon" type="button" className="shrink-0" onClick={onCopy}>
                    <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4" />
                </Button>
            )}
            <Button
                variant={isEditing ? 'default' : 'outline'}
                size="icon"
                type="button"
                className="shrink-0"
                onClick={onToggleEdit}
            >
                <HugeiconsIcon icon={PencilEdit01Icon} className="w-4 h-4" />
            </Button>
        </DetailRow>
    )
}