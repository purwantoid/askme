'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { usePriorities } from '@/pages/administration/priority/context/priority-context';
import { Priority } from '@/pages/administration/priority/data/schema';
import { usePage } from '@inertiajs/react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useState } from 'react';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: Priority;
}

export function PriorityDeleteDialog({ open, onOpenChange, currentRow }: Props) {
    const [value, setValue] = useState('');
    const { setShouldReload } = usePriorities();
    const { csrf_token } = usePage().props as unknown as { csrf_token: string };

    const handleDelete = () => {
        if (!currentRow) return;
        if (value.trim() !== currentRow.name) return;

        fetch('/dashboard/priority/delete/' + currentRow.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setShouldReload(true);
                toast({ title: 'The following priority has been deleted:' });
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: 'Error',
                    description: 'Failed to delete priority.',
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
            disabled={value.trim() !== currentRow.name}
            title={
                <span className="text-destructive">
                    <IconAlertTriangle className="mr-1 inline-block stroke-destructive" size={18} /> Delete User
                </span>
            }
            desc={
                <div className="space-y-4">
                    <p className="mb-2">
                        Are you sure you want to delete <span className="font-bold">{currentRow.name}</span>?
                        <br />
                        This action will permanently remove the priority.
                    </p>

                    <Label className="my-2">
                        Email:
                        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter email to confirm deletion." />
                    </Label>

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
