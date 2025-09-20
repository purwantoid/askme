import {useRoles} from "@/pages/roles/context/roles-context";
import {RolesActionDialog} from "@/pages/roles/components/roles-action-dialog";

export function RolesDialogs() {
    const {open, setOpen, currentRow, setCurrentRow} = useRoles()
    return (
        <>
            <RolesActionDialog
                key='role-add'
                open={open === 'add'}
                onOpenChange={() => setOpen('add')}
            />

            {currentRow && (
                <>
                    <RolesActionDialog
                        key={`role-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit')
                            setTimeout(() => {
                                setCurrentRow(null)
                            }, 500)
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    )
}