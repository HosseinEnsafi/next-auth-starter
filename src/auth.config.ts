import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
import { LoginSchema } from "./schemas"
import { comparePassword } from "./lib/utils"

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.error) return null

        const { password, email } = validatedFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const matched = comparePassword(password, user.password)
        return matched ? user : null
      },
    }),
  ],
} satisfies NextAuthConfig
