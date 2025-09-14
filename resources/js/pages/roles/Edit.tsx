import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AuthenticatedLayout } from '@/layouts';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Props {
  role: Role;
  permissions: Permission[];
}

export default function EditRole({ role, permissions }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: role.name,
    permissions: role.permissions.map(p => p.id),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('roles.update', role.id));
  };

  const handlePermissionToggle = (permissionId: number, checked: boolean) => {
    if (checked) {
      setData('permissions', [...data.permissions, permissionId]);
    } else {
      setData('permissions', data.permissions.filter(id => id !== permissionId));
    }
  };

  const toggleAllPermissions = () => {
    if (data.permissions.length === permissions.length) {
      setData('permissions', []);
    } else {
      setData('permissions', permissions.map(p => p.id));
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title={`Edit ${role.name}`} />

      <Main>
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={route('roles.index')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roles
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Edit Role</h2>
            <p className="text-muted-foreground">
              Update the role details and permissions.
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the basic details for this role.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Role Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter role name"
                      className={errors.name ? 'border-destructive' : ''}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>
                      Update the permissions for this role.
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={toggleAllPermissions}
                  >
                    {data.permissions.length === permissions.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {permissions.length === 0 ? (
                  <p className="text-muted-foreground">No permissions available.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permission-${permission.id}`}
                          checked={data.permissions.includes(permission.id)}
                          onCheckedChange={(checked) =>
                            handlePermissionToggle(permission.id, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`permission-${permission.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {errors.permissions && (
                  <p className="text-sm text-destructive mt-2">{errors.permissions}</p>
                )}
              </CardContent>
            </Card>

            <div className="flex items-center justify-end space-x-4">
              <Button variant="outline" asChild>
                <Link href={route('roles.index')}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Role
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Main>
    </AuthenticatedLayout>
  );
}