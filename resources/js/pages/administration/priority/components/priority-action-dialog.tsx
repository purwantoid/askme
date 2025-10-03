import { z } from 'zod';
import { Priority } from '../data/schema';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    value: z.number().min(1, { message: 'Value is required' }),
    enabled: z.boolean(),
    isEdit: z.boolean(),
});

type PriorityForm = z.infer<typeof formSchema>;

interface Props {
    currentRow?: Priority;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
