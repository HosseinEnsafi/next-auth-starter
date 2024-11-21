"use server"

import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email"
import { renderError } from "@/lib/render-error"
import { generateVerificationToken } from "@/lib/tokens"
import { ActionResponse } from "@/lib/types"
import { hashPassword } from "@/lib/utils"
import { RegisterSchema, validateWithZodSchema } from "@/schemas"
import z from "zod"

const register = async (values: z.infer<typeof RegisterSchema>): Promise<ActionResponse> => {
  try {
    const { email, password, name } = validateWithZodSchema(RegisterSchema, values)

    const hashedPassword = hashPassword(password)
    const user = await getUserByEmail(email)
    if (user) throw new Error("user already exist")

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: "Confirmation Email Sent" }
  } catch (error) {
    return renderError(error)
  }
}

export default register
