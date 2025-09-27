import { z } from 'zod';

const userStatusSchema = z.union([z.literal('active'), z.literal('inactive'), z.literal('invited'), z.literal('suspended')]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const RoleSchema = z.object({
    id: z.string(),
    name: z.string(),
});

const userSchema = z.object({
    id: z.string(),
    kc_user_id: z.string(),
    name: z.string(),
    email: z.string(),
    status: userStatusSchema,
    roles: z.array(RoleSchema),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
export type User = z.infer<typeof userSchema>;
export type Role = z.infer<typeof RoleSchema>;
