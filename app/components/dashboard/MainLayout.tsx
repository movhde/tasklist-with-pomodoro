"use client";

import { ReactNode } from "react";
import Sidebar from "../dashboard/Sidebar";
import { Filter } from "../dashboard/sidebarConfig";

interface MainLayoutProps {
  children: ReactNode;
  email?: string;
  filter?: Filter;
  onFilterChange?: (filter: Filter) => void;
  onAddTask?: () => void;
  backgroundClassName?: string;
  contentClassName?: string;
}

export function MainLayout({
  children,
  email,
  filter,
  onFilterChange,
  onAddTask,
  backgroundClassName,
  contentClassName,
}: MainLayoutProps) {
  return (
    <div
      className={[
        "min-h-screen",
        backgroundClassName ?? "bg-[#F5FBFF] dark:bg-[#78719dc7]",
      ].join(" ")}
    >
      <div className="min-h-screen lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            email={email}
            filter={filter ?? { mode: "all" }}
            onChange={onFilterChange ?? (() => {})}
            onAddTask={onAddTask ?? (() => {})}
          />
        </div>

        <section
          className={[
            `
            relative
            flex-1

            px-5
            pt-5
            pb-10

            lg:px-14
            lg:py-8

            min-h-screen
            `,
            contentClassName ?? "overflow-y-auto",
          ].join(" ")}
        >
          {children}
        </section>
      </div>
    </div>
  );
}
