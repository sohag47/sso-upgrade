import SecondaryLayout from "@/components/layout/secondary-layout";
import TopLoader from "@/components/top-loader";
import { siteMetadata } from "@/constants/site-metadata";
import { cn } from "@/lib/utils";
import RootProvider from "@/providers/root-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${siteMetadata.title ?? ""}`,
    template: `%s | ${siteMetadata.title ?? ""}`,
  },
  description: siteMetadata.description ?? "",
  icons: siteMetadata.icons ?? "",
};

export default function RootLayout({ children }: TChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <RootProvider>
          <TopLoader />
          <SecondaryLayout>{children}</SecondaryLayout>
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
