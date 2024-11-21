import { Resend } from "resend"

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email.toLocaleLowerCase()],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  })
}
