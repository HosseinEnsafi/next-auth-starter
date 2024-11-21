import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { calSans } from "@/fonts";

function Logo() {
  return (
    <Button
      asChild
      className="mb-10 hidden w-full space-x-2 md:flex md:!justify-center lg:!p-0 lg:hover:bg-transparent"
      size={"lg"}
      variant={"ghost"}
    >
      <Link href={"/dashboard"}>
        <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
        <p className={`hidden text-xl font-semibold lg:block ${calSans.className}`}>
          Pixelgram
        </p>
      </Link>
    </Button>
  );
}

export default Logo;
