import { getVerificationTokenByEmail } from "@/data/verification-token"
import { randomUUID } from "crypto"
import { db } from "./db"

export const generateVerificationToken = async (email: string) => {
  const expires = new Date(Date.now() + 3600 * 1000)
  const existingToken = await getVerificationTokenByEmail(email)
  const token = randomUUID().split("-").join("")

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email: email,
      expires,
      token,
    },
  })

  return verificationToken
}
