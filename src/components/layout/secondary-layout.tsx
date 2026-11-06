import React from "react";

import { cookies } from "next/headers";
import { AppSidebar } from "../app-sidebar";
import Navbar from "../navbar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
// import Footer from "./footer";

export default async function SecondaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const isLoggedIn = Boolean(token);
  return (
    <div className="flex h-svh flex-col overflow-hidden">
      <Navbar isLoggedIn={isLoggedIn} />

      <SidebarProvider defaultOpen={isLoggedIn} className="min-h-0 flex-1">
        {isLoggedIn && <AppSidebar />}

        <SidebarInset className="overflow-y-auto">
          <main className="flex min-h-full flex-col bg-background relative overflow-x-hidden">
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
          `,
                backgroundSize: "var(--grid-size) var(--grid-size)",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
                WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
          `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />

            <div className="@container/main relative z-10 flex flex-1 flex-col px-5 py-0">
              {children}
            </div>

            {/* <Footer /> */}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
