import { Head, Link } from '@inertiajs/react';
import { AuthenticatedLayout } from '@/layouts';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Users } from 'lucide-react';

interface Permission {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  users: User[];
}

interface Props {
  role: Role;
}

export default function ShowRole({ role }: Props) {
  return (
    <AuthenticatedLayout>
      <Head title={role.name} />

      <Main>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={route('roles.index')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Roles
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{role.name}</h2>
              <p className="text-muted-foreground">
                Role details and permissions
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href={route('roles.edit', role.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Role
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Permissions ({role.permissions.length})
              </CardTitle>
              <CardDescription>
                Permissions assigned to this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              {role.permissions.length === 0 ? (
                <p className="text-muted-foreground">No permissions assigned to this role.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission.id} variant="secondary">
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Users ({role.users.length})
              </CardTitle>
              <CardDescription>
                Users assigned to this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              {role.users.length === 0 ? (
                <p className="text-muted-foreground">No users assigned to this role.</p>
              ) : (
                <div className="space-y-3">
                  {role.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>
              Basic details about this role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Role Name</h4>
                <p className="mt-1">{role.name}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Permission Count</h4>
                <p className="mt-1">{role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">User Count</h4>
                <p className="mt-1">{role.users.length} user{role.users.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Main>
    </AuthenticatedLayout>
  );
}