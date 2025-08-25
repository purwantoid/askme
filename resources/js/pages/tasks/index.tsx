import {AuthenticatedLayout} from "@/layouts"
import {Main} from '@/components/layout/main'
import {columns} from './components/columns'
import {DataTable} from './components/data-table'
import {TasksDialogs} from './components/tasks-dialogs'
import {TasksPrimaryButtons} from './components/tasks-primary-buttons'
import TasksProvider from './context/tasks-context'
import {tasks} from './data/tasks'

export default function Tasks() {
  return (
    <TasksProvider>
      <AuthenticatedLayout title={"Tasks"}>
        <Main>
          <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
              <p className='text-muted-foreground'>
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <TasksPrimaryButtons/>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={tasks} columns={columns}/>
          </div>
        </Main>

        <TasksDialogs/>
      </AuthenticatedLayout>
    </TasksProvider>
  )
}
