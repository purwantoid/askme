import { Head, Link } from '@inertiajs/react';
import { AuthenticatedLayout } from '@/layouts';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Shield } from 'lucide-react';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
  roles: Role[];
}

interface Props {
  permission: Permission;
}

export default function ShowPermission({ permission }: Props) {
  return (
    <AuthenticatedLayout>
      <Head title={permission.name} />

      <Main>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={route('permissions.index')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Permissions
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{permission.name}</h2>
              <p className="text-muted-foreground">
                Permission details and assignments
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href={route('permissions.edit', permission.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Permission
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Roles ({permission.roles.length})
              </CardTitle>
              <CardDescription>
                Roles that have this permission
              </CardDescription>
            </CardHeader>
            <CardContent>
              {permission.roles.length === 0 ? (
                <p className="text-muted-foreground">This permission is not assigned to any roles.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {permission.roles.map((role) => (
                    <Badge key={role.id} variant="secondary">
                      {role.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permission Information</CardTitle>
              <CardDescription>
                Basic details about this permission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Permission Name</h4>
                  <p className="mt-1">{permission.name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Role Count</h4>
                  <p className="mt-1">{permission.roles.length} role{permission.roles.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </AuthenticatedLayout>
  );
}