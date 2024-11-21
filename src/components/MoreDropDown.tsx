"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "./ui/button"
import { useRef, useState } from "react"
import {
  Activity,
  Bookmark,
  ChevronLeft,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react"
import useOutsideClick from "@/hooks/useOutsideClick"
import { useTheme } from "next-themes"
import { Switch } from "./ui/switch"
import { cn } from "@/lib/utils"

const MoreDropDown = () => {
  const [open, setOpen] = useState(false)
  const [showModeToggle, setShowModeToggle] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { setTheme, theme } = useTheme()
  useOutsideClick(ref, () => setOpen(false))

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant={"ghost"}
          size={"lg"}
          className="!justify-start space-x-2 !px-3 md:w-full"
        >
          <Menu />
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          "w-64 !rounded-xl !p-0 transition-opacity dark:bg-neutral-800",
          !open && "opacity-0",
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem className="menuItem">
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Activity size={20} />
              <p>Your activity</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Bookmark size={20} />
              <p>Saved</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem" onClick={() => setShowModeToggle(true)}>
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem">
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
          </>
        )}

        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 px-2.5 py-3.5 dark:border-neutral-700">
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="ml-1 font-bold">Switch appearance</p>
              {theme === "dark" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            <label
              htmlFor="dark-mode"
              className="!m-1.5 flex !cursor-pointer items-center gap-x-2 !rounded-lg !px-4 !py-3.5 font-medium dark:hover:bg-[#3C3C3C]"
            >
              Dark Mode
              <DropdownMenuItem className="ml-auto !p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light")
                  }}
                />
              </DropdownMenuItem>
            </label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default MoreDropDown
