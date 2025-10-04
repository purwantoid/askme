import { PriorityActionDialog } from '@/pages/administration/priority/components/priority-action-dialog';
import { PriorityDeleteDialog } from '@/pages/administration/priority/components/priority-delete-dialog';
import { usePriorities } from '@/pages/administration/priority/context/priority-context';

export function PriorityDialog() {
    const { open, setOpen, currentRow, setCurrentRow } = usePriorities();
    return (
        <>
            <PriorityActionDialog key="user-add" open={open === 'create'} onOpenChange={() => setOpen('create')} />

            {currentRow && (
                <>
                    <PriorityActionDialog
                        key={`user-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />

                    <PriorityDeleteDialog
                        key={`user-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    );
}
