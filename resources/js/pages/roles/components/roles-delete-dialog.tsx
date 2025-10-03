'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { useRoles } from '@/pages/roles/context/roles-context';
import { Role } from '@/pages/roles/data/schema';
import { usePage } from '@inertiajs/react';
import { IconAlertTriangle } from '@tabler/icons-react';

interface Props {
    currentRow?: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RolesDeleteDialog({ currentRow, open, onOpenChange }: Props) {
    const { setShouldReload } = useRoles();
    const { csrf_token } = usePage().props as unknown as { csrf_token: string };
    const handleDelete = () => {
        if (!currentRow) return;

        fetch('/dashboard/roles/delete/' + currentRow.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setShouldReload(true);
                toast({ title: 'The following user has been deleted:' });
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: 'Error',
                    description: 'Failed to delete role.',
                    variant: 'destructive',
                });
            })
            .finally(() => onOpenChange(false));
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            title={
                <span className="text-destructive">
                    <IconAlertTriangle className="mr-1 inline-block stroke-destructive" size={18} /> Delete Role
                </span>
            }
            desc={
                <div className="space-y-4">
                    <p className="mb-2">
                        Are you sure you want to delete <span className="font-bold">{currentRow?.name}</span>?
                        <br />
                        This action will permanently remove the user with the role of{' '}
                        <span className="font-bold">{currentRow?.name?.toUpperCase()}</span> from the system. This cannot be undone.
                    </p>
                    <Alert variant="destructive">
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>Please be carefull, this operation can not be rolled back.</AlertDescription>
                    </Alert>
                </div>
            }
            confirmText="Delete"
            destructive
        />
    );
}
