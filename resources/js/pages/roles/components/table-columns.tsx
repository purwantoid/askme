import {ColumnDef} from "@tanstack/react-table"
import {Role} from "@/pages/roles/data/schema"
import {Checkbox} from "@/components/ui/checkbox"
import {cn} from "@/lib/utils"
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header"
import {Badge} from "@/components/ui/badge"
import {DataTableRowActions} from './row-actions'
import { formatDateTime } from "@/lib/formatters"

export const columns: ColumnDef<Role>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        meta: {
            className: cn(
                'sticky md:table-cell left-0 z-10 rounded-tl',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
            ),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Role' />
        ),
        cell: ({ row }) => (
            <div className='w-fit text-nowrap'>{row.getValue('name')}</div>
        ),
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'guard_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Guard' />
        ),
        cell: ({ row }) => (
            <div className='w-fit text-nowrap'>{row.getValue('guard_name')}</div>
        ),
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'permissions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Permissions' />
        ),
        cell: ({ row }) => {
            const permissions = row.getValue<any[]>('permissions') || []
            return (
                <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary">
                        {permissions.length}
                    </Badge>
                </div>
            )
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Created At' />
        ),
        cell: ({ row }) => {
            return (
                <div className="w-fit text-nowrap">
                    {formatDateTime(row.getValue("created_at"))}
                </div>
            )
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Updated At' />
        ),
        cell: ({ row }) => {
            return (
                <div className="w-fit text-nowrap">
                    {formatDateTime(row.getValue("updated_at"))}
                </div>
            )
        },
        meta: { className: 'w-36' },
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];