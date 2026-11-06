// components/users/users-tabs.client.tsx
"use client";

import { Tabs } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

type Status = "active" | "disabled" | "blocked" | "deleted" | "pending";

interface UsersTabsProps {
  status: Status;
  children: React.ReactNode;
}

export function TabsServer({ status, children }: UsersTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const setStatus = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("status", newValue);
      // reset pagination when switching tabs
      params.set("page", "1");

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <Tabs
      value={status}
      onValueChange={setStatus}
      className={`w-full flex-col justify-start gap-2 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {children}
    </Tabs>
  );
}
