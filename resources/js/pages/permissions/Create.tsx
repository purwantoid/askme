import { Head, Link, useForm } from '@inertiajs/react';
import { AuthenticatedLayout } from '@/layouts';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreatePermission() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('permissions.store'));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Permission" />

      <Main>
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={route('permissions.index')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Permissions
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create Permission</h2>
            <p className="text-muted-foreground">
              Create a new permission.
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permission Information</CardTitle>
                <CardDescription>
                  Enter the details for the new permission.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Permission Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter permission name (e.g., users.create, posts.edit)"
                      className={errors.name ? 'border-destructive' : ''}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Use descriptive names like 'users.create', 'posts.edit', or 'reports.view'
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-end space-x-4">
              <Button variant="outline" asChild>
                <Link href={route('permissions.index')}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Permission
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