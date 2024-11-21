"use client"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import z from "zod"
import CardWrapper from "./CardWrapper"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormStatusMessage } from "./FormStatusMessage"
import register from "@/actions/register"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"

const RegisterForm = () => {
  const [error, setError] = useState<undefined | string>("")
  const [success, setSuccess] = useState<undefined | string>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    const data = await register(values)

    if (data?.error) {
      setError(data.error)
    }

    if (data?.success) {
      setSuccess(data.success)
    }

    form.reset()
  }

  return (
    <CardWrapper
      backButtonHref="/login"
      backButtonLabel="already registered?"
      headerLabel="Register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="px-4 py-5 md:text-lg"
                    {...field}
                    placeholder="john@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="px-4 py-5 md:text-lg" {...field} placeholder="john doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="px-4 py-5 md:text-lg" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {<FormStatusMessage message={error ?? ""} status="error" />}
          {<FormStatusMessage message={success ?? ""} status="success" />}
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
export default RegisterForm
