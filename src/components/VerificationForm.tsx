"use client"
import { Ellipsis } from "lucide-react"
import CardWrapper from "./auth/CardWrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

import { FormStatusMessage } from "./auth/FormStatusMessage"
import newVerification from "@/actions/new-verification"
const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const hasFetched = useRef(false)

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("missing token")
      return
    }

    newVerification(token)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
      .catch(() => setError("something went wrong"))
  }, [token])

  useEffect(() => {
    if (hasFetched.current) return
    onSubmit()
    hasFetched.current = true
  }, [onSubmit])

  return (
    <CardWrapper
      backButtonHref="/login"
      backButtonLabel="back to login"
      headerLabel="Verification"
    >
      <div className="flex w-full items-center justify-center">
        <Ellipsis className="size-16 animate-pulse" />
      </div>

      <FormStatusMessage status="error" message={error || ""} />
      <FormStatusMessage status="success" message={success || ""} />
    </CardWrapper>
  )
}
export default VerificationForm
