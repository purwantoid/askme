import { RolesActionDialog } from '@/pages/roles/components/roles-action-dialog';
import { RolesDeleteDialog } from '@/pages/roles/components/roles-delete-dialog';
import { useRoles } from '@/pages/roles/context/roles-context';

export function RolesDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useRoles();
    return (
        <>
            <RolesActionDialog key="role-add" open={open === 'create'} onOpenChange={() => setOpen('create')} />

            {currentRow && (
                <>
                    <RolesActionDialog
                        key={`role-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />

                    <RolesDeleteDialog
                        key={`role-delete-${currentRow.id}`}
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
