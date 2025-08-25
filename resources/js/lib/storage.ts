import { jwtDecode } from "jwt-decode"
import { env } from "@/config"
import { cookie } from "./cookie"

export type ITokenStorage = {
  clearToken: () => void
  getToken: () => string | undefined
  setToken: (token: string) => void
}

/* const store: Storage = (globalThis as any)?.localStorage */

export const tokenStorage: ITokenStorage = {
  clearToken: () => cookie.remove(`${env.STORAGE_PREFIX}token`),
  getToken: () => cookie.get(`${env.STORAGE_PREFIX}token`),
  setToken: (token: string) => {
    try {
      const decoded = jwtDecode(token)

      cookie.set(`${env.STORAGE_PREFIX}token`, token, {
        expires: decoded.exp ? new Date(decoded.exp * 1000) : 0,
      })
    } catch (error) {
      console.error(error)
    }
  },
}
