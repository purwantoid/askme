import { Button } from '@/components/ui/button';
import { usePriorities } from '@/pages/administration/priority/context/priority-context';
import { IconUserPlus } from '@tabler/icons-react';

export function PriorityPrimaryButtons() {
    const { setOpen } = usePriorities();
    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('create')}>
                <span>Add Priority</span> <IconUserPlus size={18} />
            </Button>
        </div>
    );
}
