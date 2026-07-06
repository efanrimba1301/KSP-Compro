import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/Components/ui/checkbox'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
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
    Delete01Icon,
    PencilEdit02Icon,
    StarIcon,
} from '@hugeicons/core-free-icons'

import type { Portfolio, ProjectStatus } from '@/types/portfolio'

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
    published: {
        label: 'Published',
        className: 'bg-green-500/10 text-green-400 border-green-500/30',
    },
    draft: {
        label: 'Draft',
        className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    },
    archived: {
        label: 'Archived',
        className: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30',
    },
}

interface PortfolioColumnProps {
    onEdit: (portfolio: Portfolio) => void
    onStatusChange: (id: string, status: ProjectStatus) => void
    onDelete: (id: string) => void
}

export function createPortfolioColumns({ onEdit, onStatusChange, onDelete }: PortfolioColumnProps): ColumnDef<Portfolio>[] {
    return [{

        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ? true :
                        (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-0.5'
            />
        ),
        cell: ({ row }) => (
            <div onClick={(e) => e.stopPropagation()} >
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                    className='translate-y-0.5'
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'project_name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="text-neutral-400 hover:text-white -ml-4 h-8 px-8"
            >
                Nama Project
                <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2 h-3.5 w-3.5" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <p className="font-medium text-white">{row.getValue('project_name')}</p>
                {row.original.is_featured && <HugeiconsIcon icon={StarIcon} className="size-4" />}
            </div>
        ),
    },

    {
        accessorKey: 'client',
        header: 'Client',
        cell: ({ row }) => (
            <span className="text-neutral-300 text-sm">{row.getValue('client')}</span>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const category = row.getValue('category') as string
            return (
                <Badge
                    variant="outline"
                    className={category ?? 'text-neutral-400'}
                >
                    {category}
                </Badge>
            )
        }
    },

    {
        accessorKey: 'services_required',
        header: 'Services',
        cell: ({ row }) => {
            const services_required = row.getValue('services_required') as string
            return (
                <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full border border-neutral-700">{services_required}</span>
            )
        }
    },
    {
        accessorKey: 'year',
        header: 'Year',
        cell: ({ row }) => {
            const year = row.getValue('year') as number
            return (
                <span className="text-neutral-300 text-sm">{year}</span>
            )
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Created at',
        cell: ({ row }) => {
            const created_at = row.getValue('created_at') as string
            return (
                <span className="text-neutral-300 text-sm">
                    {new Date(created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue('status') as ProjectStatus
            const config = statusConfig[status]
            return (
                <div onClick={(e) => e.stopPropagation()} >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 py-4 cursor-pointer focus:outline-none">
                                <Badge variant="outline" className={`${config.className} text-xs`}>
                                    {config.label}
                                </Badge>
                                <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4 text-white" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="bg-neutral-900 border-neutral-800">
                            <DropdownMenuLabel className="text-neutral-400 text-xs">
                                Ganti Status
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-neutral-800" />
                            {Object.entries(statusConfig).map(([key, val]) => (
                                <DropdownMenuItem
                                    key={key}
                                    onClick={() => onStatusChange(row.original.id, key as ProjectStatus)}
                                    className="text-neutral-300 hover:text-white cursor-pointer"
                                >
                                    {val.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const portfolio = row.original
            return (
                <div onClick={(e) => e.stopPropagation()} >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => onEdit(portfolio)}
                                className="cursor-pointer"
                            >
                                <HugeiconsIcon icon={PencilEdit02Icon} className="h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(portfolio.id)}
                                className="text-red-600 focus:text-red-600 cursor-pointer"
                            >
                                <HugeiconsIcon icon={Delete01Icon} className="h-4 w-4" />
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