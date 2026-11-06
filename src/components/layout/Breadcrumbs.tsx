"use client";

import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
type TBreadcrumbs = {
  title: string;
  breadcrumbs: TBreadcrumb[];
};

export default function Breadcrumbs({ title, breadcrumbs }: TBreadcrumbs) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b mb-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs?.length ? <BreadcrumbSeparator /> : null}

            {breadcrumbs?.map(({ sl, link, label }, index, array) => {
              const isLast = index === array.length - 1;

              return (
                <Fragment key={sl ?? index}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={link ?? "#"}>{label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {title && <h1 className="text-base font-bold">{title}</h1>}
      <div></div>
    </div>
  );
}
