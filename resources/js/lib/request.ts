import type { Method, VisitOptions } from "@inertiajs/core"
import { router } from "@inertiajs/core"

export class ValidationError extends Error {
  constructor(public readonly errors: Record<string, any>) {
    super("Validation error")
  }
}

export function makeRequest<R>(props: {
  url: URL | string
  method: Uppercase<Method>
  options?: Omit<VisitOptions, "method">
}): Promise<R | null> {
  const { method, url, options } = props

  return new Promise((resolve, reject) => {
    router.visit(url, {
      ...options,
      method: method.toLowerCase() as Method,
      preserveState: true,
      onError: (errors) => {
        options?.onError?.(errors)
        reject(new ValidationError(errors))
      },
      onSuccess: (...props) => {
        options?.onSuccess?.(...props)
        resolve(null)
      },
      onCancel: () => {
        options?.onCancel?.()
        reject(null)
      },
    })
  })
}
