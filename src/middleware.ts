import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth(async function (req) {
  const nextUrl = req.nextUrl
  const { pathname } = nextUrl
  const isLoggedIn = Boolean(req.auth)
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
