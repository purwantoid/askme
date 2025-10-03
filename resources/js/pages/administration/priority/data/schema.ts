import { z } from 'zod';

const PrioritySchema = z.object({
    id: z.number(),
    name: z.string(),
    value: z.number(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
export type Priority = z.infer<typeof PrioritySchema>;
