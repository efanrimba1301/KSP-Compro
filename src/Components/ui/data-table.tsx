import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table'

import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { useState } from 'react'
import { Checkbox } from 'radix-ui'

// Generic — TData bisa tipe data apapun
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string        // key kolom yang bisa disearch, misal "name"
    searchPlaceholder?: string
    children?: React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    children,
    searchKey,
    searchPlaceholder = 'Cari...',
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: { pageSize: 10 }, // 10 baris per halaman
        },
    })

    return (
        <div className="w-full flex flex-col gap-4">

            {/* Search Bar — hanya muncul kalau searchKey di-pass */}
            {searchKey && (
                <Input
                    placeholder={searchPlaceholder}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                    onChange={(e) =>
                        table.getColumn(searchKey)?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm bg-neutral-800 border-neutral-700 text-white 
                     placeholder:text-neutral-500 focus-visible:ring-[#696969]"
                />
            )}
            {/* Tabel */}
            <div className="rounded-lg border border-neutral-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-neutral-800 hover:bg-neutral-800/50 px-8"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-neutral-400 font-medium"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableHeader>
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="border-neutral-800 hover:bg-neutral-800/50 
                                    data-[state=selected]:bg-neutral-800"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-neutral-200">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center text-neutral-500"
                                >
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">
                    {table.getFilteredRowModel().rows.length} total data
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border-neutral-700 text-neutral-300 hover:bg-neutral-800
                       disabled:opacity-30"
                    >
                        Sebelumnya
                    </Button>
                    <span className="text-sm text-neutral-400">
                        Halaman {table.getState().pagination.pageIndex + 1} dari{' '}
                        {table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border-neutral-700 text-neutral-300 hover:bg-neutral-800
                       disabled:opacity-30"
                    >
                        Berikutnya
                    </Button>
                </div>
            </div>

        </div>
    )
}