"use server"
import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { renderError } from "@/lib/render-error"
import { generateVerificationToken } from "@/lib/tokens"
import { ActionResponse } from "@/lib/types"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema, validateWithZodSchema } from "@/schemas"
import { AuthError } from "next-auth"
import z from "zod"

const login = async (values: z.infer<typeof LoginSchema>): Promise<ActionResponse> => {
  let validatedFields

  try {
    validatedFields = validateWithZodSchema(LoginSchema, values)
  } catch (error) {
    return renderError(error)
  }

  const { email, password } = validatedFields

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email)
    return { success: "Confirmation email sent!" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: "Email Sent" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}

export default login
