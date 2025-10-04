import { IconShield, IconUserShield } from '@tabler/icons-react';
import { z } from 'zod';

const PrioritySchema = z.object({
    id: z.number(),
    name: z.string(),
    value: z.number(),
    status: z.string(),
    creator: z.string(),
    updater: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
export type Priority = z.infer<typeof PrioritySchema>;

export const statuses = [
    {
        label: 'Active',
        value: 'active',
        icon: IconShield,
    },
    {
        label: 'Inactive',
        value: 'inactive',
        icon: IconUserShield,
    },
];

const statusSchema = z.union([z.literal('active'), z.literal('inactive')]);
export type PrirotyStatus = z.infer<typeof statusSchema>;

export const statusTypes = new Map<PrirotyStatus, string>([
    ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
]);
