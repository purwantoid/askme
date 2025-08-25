import {AuthenticatedLayout} from "@/layouts"
import {Main} from '@/components/layout/main'
import {columns} from './components/users-columns'
import {UsersDialogs} from './components/users-dialogs'
import {UsersPrimaryButtons} from './components/users-primary-buttons'
import {UsersTable} from './components/users-table'
import UsersProvider from './context/users-context'
import {userListSchema} from './data/schema'
import {users} from './data/users'

export default function Users() {
  // Parse user list
  const userList = userListSchema.parse(users)

  return (
    <UsersProvider>
      <AuthenticatedLayout title={"Users"}>
        <Main>
          <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
              <p className='text-muted-foreground'>
                Manage your users and their roles here.
              </p>
            </div>
            <UsersPrimaryButtons/>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <UsersTable data={userList} columns={columns}/>
          </div>
        </Main>

        <UsersDialogs/>
      </AuthenticatedLayout>
    </UsersProvider>
  )
}
