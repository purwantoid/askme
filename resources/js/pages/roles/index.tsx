import { AuthenticatedLayout } from '@/layouts'
import { Main } from '@/components/layout/main'
import RolesProvider from './context/roles-context'
import {DataTable} from '@/components/data-table/data-table'
import {DataTableToolbar} from "@/pages/roles/components/table-toolbar"
import {RolesButtons} from "@/pages/roles/components/table-buttons";
import {RolesSchema} from './data/schema'
import {columns} from "@/pages/roles/components/table-columns"
import {RolesDialogs} from "@/pages/roles/components/roles-dialogs";

interface Props {
  roles: {
    data: any[];
    links: any[];
    meta: any;
  };
}

export default function RolesIndex({ roles }: Props) {
  const rolesList = RolesSchema.parse(roles.data);
  return (
      <RolesProvider>
        <AuthenticatedLayout title={"Roles"}>
          <Main>
            <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>Role List</h2>
                <p className='text-muted-foreground'>
                  Manage your user roles here.
                </p>
              </div>
              <RolesButtons/>
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable data={rolesList} columns={columns} renderToolbar={(table) => <DataTableToolbar table={table}/>}/>
            </div>
          </Main>
          <RolesDialogs/>
        </AuthenticatedLayout>
      </RolesProvider>
  );
}