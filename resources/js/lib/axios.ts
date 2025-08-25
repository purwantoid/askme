import axios from "axios"
import { env } from "@/config"
import { tokenStorage } from "@/lib/storage"

const axiosInstance = axios.create({
  baseURL: env?.PUBLIC_API_URL ?? "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = tokenStorage.getToken()

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

export { axiosInstance as axios }
