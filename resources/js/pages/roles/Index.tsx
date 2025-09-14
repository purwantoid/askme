import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '@/layouts';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
  users_count?: number;
}

interface Props {
  roles: {
    data: Role[];
    links: any[];
    meta: any;
  };
}

export default function RolesIndex({ roles }: Props) {
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteRole) return;

    setIsDeleting(true);
    try {
      router.delete(route('roles.destroy', deleteRole.id), {
        onSuccess: () => {
          setDeleteRole(null);
        },
        onFinish: () => {
          setIsDeleting(false);
        }
      });
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Roles" />

      <Main>
        <div className="flex items-center justify-between space-y-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Roles</h2>
            <p className="text-muted-foreground">
              Manage roles and their permissions here.
            </p>
          </div>
          <Button asChild>
            <Link href={route('roles.create')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.data.map((role) => (
            <Card key={role.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={route('roles.show', role.id)}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={route('roles.edit', role.id)}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteRole(role)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {role.permissions?.length || 0} permission{(role.permissions?.length || 0) !== 1 ? 's' : ''}
                  {role.users_count !== undefined && (
                    <> • {role.users_count} user{role.users_count !== 1 ? 's' : ''}</>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {role.permissions?.slice(0, 3).map((permission) => (
                    <Badge key={permission.id} variant="secondary" className="text-xs">
                      {permission.name}
                    </Badge>
                  )) || []}
                  {(role.permissions?.length || 0) > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(role.permissions?.length || 0) - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {roles.data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No roles found.</p>
            <Button asChild>
              <Link href={route('roles.create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Role
              </Link>
            </Button>
          </div>
        )}

        {/* Pagination */}
        {roles.links && roles.links.length > 3 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            {roles.links.map((link, index) => (
              <Button
                key={index}
                variant={link.active ? "default" : "outline"}
                size="sm"
                onClick={() => router.get(link.url)}
                disabled={!link.url}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </Main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteRole} onOpenChange={() => setDeleteRole(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the role "{deleteRole?.name}" and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthenticatedLayout>
  );
}