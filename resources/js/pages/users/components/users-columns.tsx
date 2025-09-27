import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import LongText from '@/components/long-text';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDateTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { callTypes, userTypes } from '../data/data';
import { Role, User } from '../data/schema';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<User>[] = [
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
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => <div className="w-fit text-nowrap">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const { status } = row.original;
            const badgeColor = callTypes.get(status);
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
        accessorKey: 'roles',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Roles" />,
        cell: ({ row }) => {
            const { roles } = row.original; // ⬅️ ini array of Role

            if (!roles || roles.length === 0) {
                return <span className="text-sm text-muted-foreground">-</span>;
            }

            return (
                <div className="flex flex-wrap gap-2">
                    {roles.map((role) => {
                        const userType = userTypes.find(({ value }) => value === role.name);

                        return (
                            <div key={role.id} className="flex items-center gap-x-1 rounded bg-muted px-2 py-1">
                                {userType?.icon && <userType.icon size={14} className="text-muted-foreground" />}
                                <span className="text-xs capitalize">{role.name}</span>
                            </div>
                        );
                    })}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const roles: Role[] = row.getValue(id);
            return roles.some((r) => value.includes(r.name));
        },
        enableSorting: false,
        enableHiding: false,
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
        accessorKey: 'updated_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" />,
        cell: ({ row }) => {
            return <div className="w-fit text-nowrap">{formatDateTime(row.getValue('updated_at'))}</div>;
        },
        meta: { className: 'w-36' },
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
];
