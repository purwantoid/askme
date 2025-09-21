'use client'

import {Role} from "@/pages/roles/data/schema";
import {toast} from "@/hooks/use-toast";
import {ConfirmDialog} from "@/components/confirm-dialog";
import {IconAlertTriangle} from "@tabler/icons-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface Props {
    currentRow?: Role
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function RolesDeleteDialog({currentRow, open, onOpenChange}: Props) {

    const handleDelete = () => {
        onOpenChange(false)
        toast({
            title: 'The following user has been deleted:',
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
            ),
        })
    }

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            title={
                <span className='text-destructive'><IconAlertTriangle className='mr-1 inline-block stroke-destructive'
                                                                      size={18}/>{' '}Delete Role</span>
            }
            desc={
                <div className='space-y-4'>
                    <p className='mb-2'>
                        Are you sure you want to delete{' '}
                        <span className='font-bold'>{currentRow?.name}</span>?
                        <br/>
                        This action will permanently remove the user with the role of{' '}
                        <span className='font-bold'>{currentRow?.name?.toUpperCase()}</span>{' '}
                        from the system. This cannot be undone.
                    </p>
                    <Alert variant='destructive'>
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            Please be carefull, this operation can not be rolled back.
                        </AlertDescription>
                    </Alert>
                </div>
            }
            confirmText='Delete'
            destructive
        />
    )
}