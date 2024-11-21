"use client"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import login from "@/actions/login"
import { useForm } from "react-hook-form"
import z from "zod"
import CardWrapper from "./CardWrapper"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormStatusMessage } from "./FormStatusMessage"
import { useState, useTransition } from "react"

const LoginForm = () => {
  const [error, setError] = useState<undefined | string>("")
  const [success, setSuccess] = useState<undefined | string>("")
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isPending, setTransition] = useTransition()

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    setTransition(async () => {
      const data = await login(values)

      if (data?.error) {
        form.reset()
        setError(data.error)
      }

      if (data?.success) {
        form.reset()
        setSuccess(data.success)
      }
    })
  }

  return (
    <CardWrapper
      backButtonHref="/register"
      backButtonLabel="don't have account?"
      headerLabel="Login"
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
          <FormStatusMessage message={error ?? ""} status="error" />
          <FormStatusMessage message={success ?? ""} status="success" />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
export default LoginForm
