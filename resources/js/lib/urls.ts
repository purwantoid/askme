import { env } from "@/config"

export function assetUrl(path: string | undefined) {
  if (!path) return ""
  if (path.startsWith("http")) return path

  if (path.startsWith("/")) {
    path = path.slice(1)
  }

  return `${env.ASSET_URL}/${path}`
}

export function appUrl(
  path: string | Record<string, any> = "",
  params: Record<string, any> | undefined = undefined
) {
  if (!params && typeof path === "object") {
    params = path
    path = ""
  }

  if (params) {
    const query = new URLSearchParams(params)
    path = `${path}?${query.toString()}`
  }

  if (path.startsWith("/")) path = path.slice(1)

  return `${env.APP_URL}/${path}`.replace(/\/$/, "")
}
