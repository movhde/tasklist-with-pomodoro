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
}

export function MainLayout({
  children,
  email,
  filter,
  onFilterChange,
  onAddTask,
  backgroundClassName,
}: MainLayoutProps) {
  return (
    <div
      className={[
        "min-h-screen",
        backgroundClassName ?? "bg-[#f8fcff] dark:bg-[#78719dc7]",
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

        <section className="min-h-screen relative flex-1 overflow-y-auto px-5 lg:px-14 pt-4 lg:py-8">
          {children}
        </section>
      </div>
    </div>
  );
}
