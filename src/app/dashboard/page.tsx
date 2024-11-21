import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"

const DashboardPage = async () => {
  const session = await auth()

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>

      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login" })
        }}
      >
        <Button>Signout</Button>
      </form>
    </div>
  )
}
export default DashboardPage
