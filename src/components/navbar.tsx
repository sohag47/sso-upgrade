"use client";

import { logoutAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { LogOut, Moon, Sun, User, UserPen } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const emptySubscribe = () => () => {};

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.shared);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        dispatch({ type: "USER_LOGOUT" });
        await logoutAction();
      } catch (error) {
        console.error("Logout process failed:", error);
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-md">
      <div className="flex h-14 md:h-16 items-center justify-between px-3 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90 py-1">
          <div className="relative size-10 sm:size-12 md:size-16 shrink-0">
            <Image
              src="/logo.svg"
              alt="Access Control System"
              fill
              className="object-contain object-left brightness-0 invert"
              priority
            />
          </div>
        </Link>

        {/* Title (Responsive text sizing & shortening for mobile) */}
        <h1 className="text-white text-sm sm:text-lg md:text-xl font-bold text-center px-2 line-clamp-1">
          <span className="sm:hidden">Library Access System</span>
          <span className="hidden sm:inline">
            Library Access Control System (Jahangirnagar University)
          </span>
        </h1>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                }
              />

              <DropdownMenuContent
                className="w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-2 py-2 text-left text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate text-xs text-muted-foreground">{auth?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link href="/change-password">
                        <UserPen className="mr-2 h-4 w-4" />
                        Change Password
                      </Link>
                    }
                  />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isPending}
                  onSelect={(event) => {
                    event.preventDefault();
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isPending ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-7 w-12 sm:h-8 sm:w-16 items-center rounded-full bg-gray-400/40 p-1 transition-colors hover:bg-gray-400/60 dark:bg-gray-600/50"
              aria-label="Toggle theme"
            >
              <div
                className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-5 sm:translate-x-8" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
