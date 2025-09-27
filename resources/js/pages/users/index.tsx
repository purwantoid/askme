import { DataTable } from '@/components/data-table/data-table-server';
import { Main } from '@/components/layout/main';
import { AuthenticatedLayout } from '@/layouts';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { DataTableToolbar } from './components/data-table-toolbar';
import { columns } from './components/users-columns';
import { UsersDialogs } from './components/users-dialogs';
import { UsersPrimaryButtons } from './components/users-primary-buttons';
import UsersProvider, { useUsers } from './context/users-context';
import { User } from './data/schema';

export default function UsersIndexPage() {
    return (
        <UsersProvider>
            <UsersIndex />
        </UsersProvider>
    );
}

function UsersIndex() {
    const [data, setData] = useState<User[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [loading, setLoading] = useState(false);
    const { shouldReload, setShouldReload } = useUsers();

    const fetchUsers = () => {
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

        fetch(`/dashboard/users?${params.toString()}`, { headers: { Accept: 'application/json' } })
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
                setTotalPages(res.last_page);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, [pageIndex, pageSize, sorting, filters]);

    useEffect(() => {
        if (shouldReload) {
            fetchUsers();
            setShouldReload(false);
        }
    }, [shouldReload]);

    return (
        <AuthenticatedLayout title={'Users'}>
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">User List</h2>
                        <p className="text-muted-foreground">Manage your users and their roles here.</p>
                    </div>
                    <UsersPrimaryButtons />
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

            <UsersDialogs />
        </AuthenticatedLayout>
    );
}
