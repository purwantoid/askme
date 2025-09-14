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

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
  roles?: Role[];
}

interface Props {
  permissions: {
    data: Permission[];
    links: any[];
    meta: any;
  };
}

export default function PermissionsIndex({ permissions }: Props) {
  const [deletePermission, setDeletePermission] = useState<Permission | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deletePermission) return;

    setIsDeleting(true);
    try {
      router.delete(route('permissions.destroy', deletePermission.id), {
        onSuccess: () => {
          setDeletePermission(null);
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
      <Head title="Permissions" />

      <Main>
        <div className="flex items-center justify-between space-y-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Permissions</h2>
            <p className="text-muted-foreground">
              Manage permissions here.
            </p>
          </div>
          <Button asChild>
            <Link href={route('permissions.create')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Permission
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {permissions.data.map((permission) => (
            <Card key={permission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{permission.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={route('permissions.show', permission.id)}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={route('permissions.edit', permission.id)}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletePermission(permission)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Used in {permission.roles?.length || 0} role{(permission.roles?.length || 0) !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {permission.roles?.slice(0, 3).map((role) => (
                    <Badge key={role.id} variant="outline" className="text-xs">
                      {role.name}
                    </Badge>
                  )) || []}
                  {(permission.roles?.length || 0) > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{(permission.roles?.length || 0) - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {permissions.data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No permissions found.</p>
            <Button asChild>
              <Link href={route('permissions.create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Permission
              </Link>
            </Button>
          </div>
        )}

        {/* Pagination */}
        {permissions.links && permissions.links.length > 3 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            {permissions.links.map((link, index) => (
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
      <AlertDialog open={!!deletePermission} onOpenChange={() => setDeletePermission(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the permission "{deletePermission?.name}" and cannot be undone.
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