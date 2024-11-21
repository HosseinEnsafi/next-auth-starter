import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user, account }) {
      // allow oAth without email verification
      if (account?.provider !== "credentials") return true

      const existingUser = user.id ? await getUserById(user.id) : null
      console.log(existingUser)
      // prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      return true
    },

    async session({ token, session }) {
      if (!session.user) return session
      console.log(token)
      if (token.sub) session.user.id = token.sub
      if (token.role) session.user.role = token.role as UserRole

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)
      console.log({ user })
      if (!user) return token

      token.role = user.role

      return token
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
})
