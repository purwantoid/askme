import { AxiosError, isAxiosError } from "axios"
import {any} from "zod";

export { AxiosError, isAxiosError }

export function isNotFound(error: AxiosError | Error | any) {
  const statusCode = isAxiosError(error)
    ? error?.response?.status
    : (error?.statusCode ?? null)

  return parseInt(statusCode, 10) === 404
}

export function getErrorMessage(error: AxiosError | Error | any) {
  let message: string | undefined

  if (isAxiosError(error)) {
    message =
      error?.response?.data?.message ??
      error?.response?.data?.status?.message ??
      undefined
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    message ??
    "Server error, please try again!"
  )
}
