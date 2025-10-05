import { useMemo } from "react"

/**
 * const can = usePermissions(auth?.user?.permissions!)
 * @param permissions
 */

export function usePermissions(permissions: string[]) {
  const set = useMemo(() => new Set(permissions), [permissions])

  return (permission: string, fallback?: string) => {
    return set.has(permission) || set.has(fallback || "update team")
  }
}
