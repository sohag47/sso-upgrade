import StoreProvider from "@/providers/StoreProvider";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "../components/ui/tooltip";

export default function RootProvider({ children }: TChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      <TooltipProvider>
        <StoreProvider>{children}</StoreProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
