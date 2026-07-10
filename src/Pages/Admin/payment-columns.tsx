import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Checkbox } from '@/Components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    ArrowDown01Icon,
    MoreHorizontalIcon,
    Download01Icon,
    Pen01Icon
} from '@hugeicons/core-free-icons'

import type { HistoryPayment, PaymentStatus } from '@/types/HistoryPayment'

// ─── Status config — pakai ini untuk Select dropdown di cell status ───────
const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
    waiting: {
        label: 'Waiting',
        className: 'bg-yellow-400 text-yellow-600',
    },
    success: {
        label: 'Success',
        className: 'bg-green-400 text-green-600',
    },
    failed: {
        label: 'Failed',
        className: 'bg-red-400 text-red-600',
    },
}

// ─── Helper: format currency Rupiah ────────────────────────────────────────
const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount)

// ─── Helper: label readable untuk payment_type ─────────────────────────────
const paymentTypeLabel = (type: string) => {
    if (type === 'onboarding_fee') return 'Onboarding Fee'
    const match = type.match(/payment_(\d+)(st|nd|rd|th)_month/)
    if (match) return `Cicilan Bulan ke-${match[1]}`
    return type
}

// ─── Props ───────────────────────────────────────────────────────────────
interface PaymentHistoryColumnProps {
    onEdit: (payment: HistoryPayment) => void
    onDelete: (id: string) => void
    onStatusChange: (id: string, status: PaymentStatus) => void
}

export function createPaymentColumns({
    onDelete,
    onStatusChange,
    onEdit,
}: PaymentHistoryColumnProps): ColumnDef<HistoryPayment>[] {
    return [
        // ── Checkbox select ─────────────────────────────────────────────
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                                ? 'indeterminate'
                                : false
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-0.5 ml-2"
                />
            ),
            cell: ({ row }) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-0.5 ml-2"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },

        // ── Nama + Email ─────────────────────────────────────────────────
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-neutral-400 hover:text-white -ml-4 h-8 px-8"
                >
                    Nama
                    <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2 h-3.5 w-3.5" />
                </Button>
            ),
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-white">{row.original.name ?? '—'}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{row.original.email ?? '—'}</p>
                </div>
            ),
        },

        // ── Company ───────────────────────────────────────────────────────
        {
            accessorKey: 'company',
            header: 'Company',
            cell: ({ row }) => (
                <div>
                    <p className="text-neutral-300 text-sm">{row.original.company ?? '—'}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{row.original.whatsapp ?? '—'}</p>
                </div>
            ),
        },

        // ── Pricing Tier — Badge outline ────────────────────────────────
        {
            accessorKey: 'pricing_tier',
            header: 'Tier',
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.getValue('pricing_tier')}
                </Badge>
            ),
        },

        // ── Invoice Type — Badge outline ────────────────────────────────
        {
            accessorKey: 'invoice_type',
            header: 'Invoice Type',
            cell: ({ row }) => {
                const type = row.getValue('invoice_type') as string
                return (
                    <Badge variant="outline" className="capitalize">
                        {type}
                    </Badge>
                )
            },
        },

        // ── Payment Type ─────────────────────────────────────────────────
        {
            accessorKey: 'payment_type',
            header: 'Payment Type',
            cell: ({ row }) => (
                <Badge variant="outline" className="capitalize">
                    {paymentTypeLabel(row.getValue('payment_type'))}
                </Badge>
            ),
        },

        // ── Amount — format Rupiah ──────────────────────────────────────
        {
            accessorKey: 'amount',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-neutral-400 hover:text-white -ml-4 h-8 px-2"
                >
                    Amount
                    <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2 h-3.5 w-3.5" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-white text-sm">
                    {formatRupiah(row.getValue('amount'))}
                </span>
            ),
        },

        // ── Invoice Number ────────────────────────────────────────────────
        {
            accessorKey: 'invoice_number',
            header: 'Invoice No.',
            cell: ({ row }) => (
                <span className="text-neutral-400 text-xs font-mono">
                    {row.getValue('invoice_number')}
                </span>
            ),
        },

        // ── Payment Method — Badge outline ──────────────────────────────
        {
            accessorKey: 'payment_method',
            header: 'Method',
            cell: ({ row }) => {
                const method = row.getValue('payment_method') as string
                return (
                    <span>
                        {method.replace('_', ' ')}
                    </span>
                )
            },
        },

        // ── Status — Select dropdown, style sama persis dengan Portfolio ──
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as PaymentStatus
                const config = statusConfig[status]

                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Select
                            defaultValue={status}
                            onValueChange={(value) =>
                                onStatusChange(row.original.id, value as PaymentStatus)
                            }
                        >
                            <SelectTrigger
                                className={[
                                    'h-auto w-auto',
                                    'px-2.5 py-0.5 rounded-md border',
                                    'text-xs font-semibold',
                                    'gap-1.5',
                                    'focus:ring-0 focus:ring-offset-0',
                                    config.className,
                                ].join(' ')}
                            >
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className="bg-neutral-900 border-neutral-800">
                                {Object.entries(statusConfig).map(([key, val]) => (
                                    <SelectItem
                                        key={key}
                                        value={key}
                                        className={[
                                            'cursor-pointer text-xs',
                                            'focus:bg-neutral-800',
                                            key === status
                                                ? 'text-white font-medium'
                                                : 'text-neutral-400',
                                        ].join(' ')}
                                    >
                                        {val.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )
            },
        },

        // ── Payment Date ──────────────────────────────────────────────────
        {
            accessorKey: 'payment_date',
            header: 'Tgl Bayar',
            cell: ({ row }) => {
                const date = row.getValue('payment_date') as string
                return (
                    <span className="text-neutral-300 text-sm">
                        {date
                            ? new Date(date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })
                            : <span className="text-neutral-600 italic">—</span>}
                    </span>
                )
            },
        },

        // ── Created At ────────────────────────────────────────────────────
        {
            accessorKey: 'created_at',
            header: 'Dibuat',
            cell: ({ row }) => (
                <span className="text-neutral-500 text-xs">
                    {new Date(row.getValue('created_at')).toLocaleDateString('id-ID')}
                </span>
            ),
        },

        // ── Actions ───────────────────────────────────────────────────────
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onEdit(payment)}>
                                    <HugeiconsIcon icon={Pen01Icon} className="size-4" />
                                    Edit
                                </DropdownMenuItem>

                                {/* Lihat bukti pembayaran — hanya tampil jika ada */}
                                {payment.proof_of_payment && (
                                    <DropdownMenuItem
                                        onClick={() => window.open(payment.proof_of_payment, '_blank')}
                                        className="gap-2"
                                    >
                                        <HugeiconsIcon icon={Download01Icon} className="size-4" />
                                        Lihat Bukti Bayar
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => onDelete(payment.id)}
                                    className="text-red-500 focus:text-red-500"
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
}