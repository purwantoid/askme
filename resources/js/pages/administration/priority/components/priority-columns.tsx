import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import LongText from '@/components/long-text';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDateTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Priority } from '@/pages/administration/priority/data/schema';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Priority>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        meta: {
            className: cn(
                'sticky left-0 z-10 rounded-tl md:table-cell',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
            ),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <LongText className="max-w-36">{row.getValue('name')}</LongText>,
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky left-6 md:table-cell'
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'value',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Value" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('value')}</div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const badgeColor = 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200';
            return (
                <div className="flex space-x-2">
                    <Badge variant="outline" className={cn('capitalize', badgeColor)}>
                        {row.getValue('status')}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ row }) => {
            return <div className="w-fit text-nowrap">{formatDateTime(row.getValue('created_at'))}</div>;
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'creator',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created By" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('creator')}</div>,
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
        cell: ({ row }) => {
            return <div className="w-fit text-nowrap">{formatDateTime(row.getValue('updated_at'))}</div>;
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'updater',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated By" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('updater')}</div>,
        meta: { className: 'w-36' },
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
