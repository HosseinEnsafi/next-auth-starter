import { cn } from "@/lib/utils"
import { CheckCircle, CircleAlert } from "lucide-react"

interface FormStatusMessageProps {
  status: "success" | "error"
  message: string
}

export const FormStatusMessage = ({ message, status }: FormStatusMessageProps) => {
  if (!message) return null

  return (
    <div
      className={cn("flex items-center gap-x-2 rounded-md p-3 text-sm", {
        "bg-red-600/15 text-red-600": status === "error",
        "bg-green-600/15 text-green-600": status === "success",
      })}
    >
      {status === "error" && <CircleAlert className="h-5 w-5" />}
      {status === "success" && <CheckCircle className="h-5 w-5" />}
      <p>{message}</p>
    </div>
  )
}
