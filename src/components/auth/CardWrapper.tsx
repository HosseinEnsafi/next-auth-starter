import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel?: string
  backButtonHref?: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="flex items-center justify-center">
        <h2 className="text-lg font-bold">{headerLabel}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {backButtonHref && backButtonLabel && (
          <Button variant="link" className="w-full font-normal" size="sm" asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
