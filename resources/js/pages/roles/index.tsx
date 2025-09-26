import { DataTable } from '@/components/data-table/data-table-server';
import { Main } from '@/components/layout/main';
import { AuthenticatedLayout } from '@/layouts';
import { RolesDialogs } from '@/pages/roles/components/roles-dialogs';
import { RolesButtons } from '@/pages/roles/components/table-buttons';
import { columns } from '@/pages/roles/components/table-columns';
import { DataTableToolbar } from '@/pages/roles/components/table-toolbar';
import RolesProvider, { useRoles } from './context/roles-context';

import { Role } from '@/pages/roles/data/schema';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export default function RolesIndexPage() {
    return (
        <RolesProvider>
            <RolesIndex />
        </RolesProvider>
    );
}

function RolesIndex() {
    const [data, setData] = useState<Role[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [loading, setLoading] = useState(false);
    const { shouldReload, setShouldReload } = useRoles();

    const fetchRoles = () => {
        setLoading(true);
        const params = new URLSearchParams({
            page: (pageIndex + 1).toString(),
            per_page: pageSize.toString(),
        });

        if (sorting.length > 0) {
            params.append('sort', sorting.map((s) => `${s.id}:${s.desc ? 'desc' : 'asc'}`).join(','));
        }

        filters.forEach((f) => {
            if (f.value) params.append(f.id, String(f.value));
        });

        fetch(`/dashboard/roles?${params.toString()}`, { headers: { Accept: 'application/json' } })
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
                setTotalPages(res.last_page);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchRoles();
    }, [pageIndex, pageSize, sorting, filters]);

    useEffect(() => {
        if (shouldReload) {
            fetchRoles();
            setShouldReload(false);
        }
    }, [shouldReload]);

    return (
        <AuthenticatedLayout title={'Roles'}>
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Role List</h2>
                        <p className="text-muted-foreground">Manage your user roles here.</p>
                    </div>
                    <RolesButtons />
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <DataTable
                        data={data}
                        columns={columns}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize}
                        sorting={sorting}
                        setSorting={setSorting}
                        filters={filters}
                        setFilters={setFilters}
                        loading={loading}
                        renderToolbar={(table) => <DataTableToolbar table={table} />}
                    />
                </div>
            </Main>
            <RolesDialogs />
        </AuthenticatedLayout>
    );
}
