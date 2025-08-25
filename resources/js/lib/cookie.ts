import Cookies from "js-cookie"

export const cookie = Cookies.withAttributes({
  path: "/",
  // secure: process.env.NODE_ENV === "production",
})
