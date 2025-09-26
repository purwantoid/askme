import { Button } from '@/components/ui/button';
import { useRoles } from '@/pages/roles/context/roles-context';
import { IconUserPlus } from '@tabler/icons-react';

export function RolesButtons() {
    const { setOpen } = useRoles();
    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('create')}>
                <span>Add Role</span> <IconUserPlus size={18} />
            </Button>
        </div>
    );
}
