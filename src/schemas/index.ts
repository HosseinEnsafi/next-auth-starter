import z, { ZodSchema } from "zod"

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(", "))
  }

  return result.data
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(4, { message: "password must contain one character Atleast " }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
})
