"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Sidebar from "@/data/sidebar.json";
import { Icon } from "@iconify/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain() {
  const pathname = usePathname();
  const items: TSidebar = Sidebar ?? [];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items?.map((item) => {
          const hasSubItems = Boolean(item.items?.length);
          const isParentActive = item.url === pathname;
          const isSubActive = item.items?.some((sub) => sub.url === pathname);
          const isItemActive = isParentActive || isSubActive;

          return (
            <Collapsible
              key={item?.title}
              asChild
              defaultOpen={isItemActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {hasSubItems ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item?.title}
                      isActive={isItemActive}
                    >
                      <Icon
                        icon={item.icon}
                        width="16"
                        height="16"
                        className="shrink-0"
                      />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">
                        {item?.title}
                      </span>
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item?.title}
                    isActive={isParentActive}
                  >
                    <Link href={item?.url || "#"}>
                      <Icon
                        icon={item.icon}
                        width="16"
                        height="16"
                        className="shrink-0"
                      />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">
                        {item?.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                )}

                {hasSubItems ? (
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-0 border-none pl-11 pr-0 py-1 text-sm group-data-[collapsible=icon]:hidden">
                      {item?.items?.map((subItem) => {
                        const isChildActive = subItem.url === pathname;

                        return (
                          <SidebarMenuSubItem key={subItem?.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isChildActive}
                            >
                              <Link href={subItem?.url || "#"}>
                                <span
                                  className={`transition-colors hover:text-foreground ${
                                    isChildActive
                                      ? "text-foreground font-medium"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {subItem?.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
