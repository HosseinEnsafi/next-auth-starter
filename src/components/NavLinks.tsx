"use client";

import {
  Clapperboard,
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: Home },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: Search,
    hideOnMobile: true,
  },
  { name: "Explore", href: "/dashboard/explore", icon: Compass },
  {
    name: "Reels",
    href: "/dashboard/reels",
    icon: Clapperboard,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: "Create",
    href: "/dashboard/create",
    icon: PlusSquare,
  },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Button
            asChild
            key={link.name}
            size={"lg"}
            variant={isActive ? "secondary" : "ghost"}
            className={cn("w-full space-x-2 px-5 sm:px-8 md:justify-center lg:justify-start", {
              "hidden justify-start md:flex": link.hideOnMobile,
            })}
          >
            <Link href={link.href}>
              <LinkIcon className="w-6" />
              <p className={cn("hidden lg:block", { "font-extrabold": isActive })}>
                {link.name}
              </p>
            </Link>
          </Button>
        );
      })}
    </>
  );
};
export default NavLinks;
