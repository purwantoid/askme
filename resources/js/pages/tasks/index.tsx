import { DataTable } from '@/components/data-table/data-table';
import { Main } from '@/components/layout/main';
import { AuthenticatedLayout } from '@/layouts';
import { columns } from './components/columns';
import { DataTableToolbar } from './components/data-table-toolbar';
import { TasksDialogs } from './components/tasks-dialogs';
import { TasksPrimaryButtons } from './components/tasks-primary-buttons';
import TasksProvider from './context/tasks-context';
import { tasks } from './data/tasks';

export default function Tasks() {
    return (
        <TasksProvider>
            <AuthenticatedLayout title={'Tasks'}>
                <Main>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
                            <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
                        </div>
                        <TasksPrimaryButtons />
                    </div>
                    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <DataTable data={tasks} columns={columns} renderToolbar={(table) => <DataTableToolbar table={table} />} />
                    </div>
                </Main>

                <TasksDialogs />
            </AuthenticatedLayout>
        </TasksProvider>
    );
}
