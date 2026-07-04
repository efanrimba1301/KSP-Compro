import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/Components/ui/button'
import { StatusBadge } from '@/Components/ui/status-badge'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    ArrowDown01Icon,
    MoreHorizontalIcon,
    Copy01Icon,
    EyeIcon,
    Delete01Icon,
} from '@hugeicons/core-free-icons'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuSub
} from '@/Components/ui/dropdown-menu'
import type { Lead, LeadStatus } from '@/types/leads'
import { Checkbox } from '@/Components/ui/checkbox'

type LeadsColumnProps = {
    onStatusChange: (id: string, status: LeadStatus) => void
    onDelete: (id: string) => void
    onViewDetail: (lead: Lead) => void
}

const statusOptions: {
    value: LeadStatus;
    label: string
}[] =
    [
        { value: 'leads', label: 'Leads' },
        { value: 'close', label: 'Close' },
        { value: 'active', label: 'Active Client' },
        { value: 'finish', label: 'Finish' },
    ]

export function createLeadsColumns({
    onStatusChange,
    onDelete,
    onViewDetail,
}: LeadsColumnProps): ColumnDef<Lead>[] {
    return [

        //Checkbox
        {
            id: "select",
            meta: { showFrom: 'mobile' },
            header: ({ table }) => (
                <div className='flex items-center justify-center'>
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected()
                                ? true
                                : table.getIsSomePageRowsSelected()
                                    ? "indeterminate"
                                    : false
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className='flex items-center justify-center'
                    onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },

        // Kolom Nama
        {
            accessorKey: 'name',
            meta: { showFrom: 'mobile' },
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
                    <p className="font-medium text-white">{row.getValue('name')}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{row.original.email}</p>
                </div>
            ),
        },

        // Kolom Company
        {
            accessorKey: 'company',
            meta: { showFrom: 'tablet' },
            header: 'Company',
            cell: ({ row }) => (
                <span className="text-neutral-300">{row.getValue('company') || '—'}</span>
            ),
        },

        // Kolom WhatsApp
        {
            accessorKey: 'whatsapp',
            header: 'WhatsApp',
            meta: { showFrom: 'tablet' },
            cell: ({ row }) => (
                <a
                    href={`https://wa.me/${row.getValue<string>('whatsapp').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#747474] hover:underline text-sm"
                >
                    {row.getValue('whatsapp')}
                </a>
            ),
        },

        // Kolom Budget
        {
            accessorKey: 'budget_range',
            header: 'Budget',
            meta: { showFrom: 'desktop' },
            cell: ({ row }) => (
                <span className="text-neutral-300 text-sm">{row.getValue('budget_range')}</span>
            ),
        },

        // Kolom Service
        {
            accessorKey: 'services_required',
            header: 'Service',
            meta: { showFrom: 'mobile' },
            cell: ({ row }) => {
                const services: string[] = row.getValue('services_required')
                return (
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {services.map((s) => (
                            <span
                                key={s}
                                className="text-xs bg-neutral-800 text-neutral-300 
                         px-2 py-0.5 rounded-full border border-neutral-700"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                )
            },
        },

        // Kolom Heard From
        {
            accessorKey: 'heard_from',
            header: 'Dari',
            meta: { showFrom: 'desktop' },
            cell: ({ row }) => (
                <span className="text-neutral-400 text-sm">{row.getValue('heard_from')}</span>
            ),
        },

        // Kolom Status
        {
            accessorKey: 'status',
            header: 'Status',
            meta: { showFrom: 'mobile' },
            cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
            filterFn: (row, id, value) => value.includes(row.getValue(id)),
        },

        // Kolom Tanggal
        {
            accessorKey: 'created_at',
            meta: { showFrom: 'mobile' },
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-neutral-400 hover:text-white -ml-4 h-8"
                >
                    Tanggal
                    <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2 h-3.5 w-3.5" />
                </Button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue('created_at'))
                return (
                    <span className="text-neutral-400 text-sm">
                        {date.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                )
            },
        },

        // Kolom Aksi
        {
            id: 'actions',
            meta: { showFrom: 'mobile' },
            cell: ({ row }) => {
                const lead = row.original
                return (
                    <div
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-neutral-400 hover:text-white"
                                >
                                    <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="bg-neutral-900 border-neutral-800"
                            >
                                <DropdownMenuLabel className="text-neutral-400">
                                    Aksi
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-neutral-800" />
                                <DropdownMenuItem
                                    className="text-neutral-200 hover:bg-neutral-800 cursor-pointer"
                                    onClick={() => navigator.clipboard.writeText(lead.email)}
                                >
                                    <HugeiconsIcon icon={Copy01Icon} className="mr-2 h-3.5 w-3.5" />
                                    Copy Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-neutral-200 hover:bg-neutral-800 cursor-pointer"
                                    onClick={() => onViewDetail(lead)}
                                >
                                    <HugeiconsIcon icon={EyeIcon} className="mr-2 h-3.5 w-3.5" />
                                    Lihat Detail
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger
                                        className="text-neutral-200 hover:bg-neutral-800 cursor-pointer gap-2"
                                    >
                                        <HugeiconsIcon icon={ArrowDown01Icon} className="mr-2 h-3.5 w-3.5" />
                                        Ubah Status
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="bg-neutral-900 border-neutral-800">
                                        {statusOptions.map((opt) => (
                                            <DropdownMenuItem
                                                key={opt.value}
                                                className={`cursor-pointer hover:bg-neutral-800 ${lead.status === opt.value
                                                    ? 'text-[#E8FF5A]'
                                                    : 'text-neutral-200'
                                                    }`}
                                                onClick={() => onStatusChange(lead.id, opt.value)}
                                            >
                                                {opt.label}
                                                {lead.status === opt.value && ' ✓'}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator className="bg-neutral-800" />
                                <DropdownMenuItem
                                    className="text-red-400 hover:bg-neutral-800 cursor-pointer"
                                    onClick={() => onDelete(lead.id)}
                                >
                                    <HugeiconsIcon icon={Delete01Icon} className="mr-2 h-3.5 w-3.5" />
                                    Hapus
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
}