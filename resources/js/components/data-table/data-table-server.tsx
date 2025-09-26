'use client';

import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';

import { DataTablePagination } from '@/components/data-table/data-table-pagination-server';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    setPageIndex: (pageIndex: number) => void;
    setPageSize: (pageSize: number) => void;
    sorting: SortingState;
    setSorting: (sorting: SortingState) => void;
    filters: ColumnFiltersState;
    setFilters: (filters: ColumnFiltersState) => void;
    loading?: boolean;
    renderToolbar?: (table: ReturnType<typeof useReactTable<TData>>) => React.ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageIndex,
    pageSize,
    totalPages,
    setPageIndex,
    setPageSize,
    sorting,
    setSorting,
    filters,
    setFilters,
    loading,
    renderToolbar,
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters: filters,
            columnVisibility,
            rowSelection,
        },
        enableRowSelection: true,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        pageCount: totalPages,
        onSortingChange: (updater) => {
            setSorting(typeof updater === 'function' ? updater(sorting) : updater);
        },
        onColumnFiltersChange: (updater) => {
            setFilters(typeof updater === 'function' ? updater(filters) : updater);
        },
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            {renderToolbar ? renderToolbar(table) : null}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="text-foreground transition-colors odd:bg-background even:bg-muted/30 hover:bg-muted/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="font-medium">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 🚀 Pagination integrated */}
            <DataTablePagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalPages={totalPages}
                totalRows={data.length}
                selectedCount={Object.keys(rowSelection).length}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
            />
        </div>
    );
}
