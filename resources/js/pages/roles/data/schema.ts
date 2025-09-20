import { z } from "zod"

const PermissionSchema = z.object({
    id: z.number(),
    name: z.string(),
})

const RoleSchema = z.object({
    id: z.number(),
    name: z.string(),
    guard_name: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    permissions: z.array(PermissionSchema),
})

export const RolesSchema = z.array(RoleSchema)
export type Role = z.infer<typeof RoleSchema>
export type Permission = z.infer<typeof PermissionSchema>