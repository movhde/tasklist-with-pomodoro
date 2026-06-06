// components/layout/MainLayout.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../dashboard/Sidebar";
import MobileSidebar from "../dashboard/MobileSidebar";
import SidebarMenu from "../dashboard/SidebarMenu";
import UserProfile from "../dashboard/UserProfile";
import SearchInput from "../ui/SearchInput";
import GreetingHeader from "../dashboard/GreetingHeader";
import FloatingAddButton from "../dashboard/FloatingAddButton";
import { Filter } from "../dashboard/sidebarConfig";

interface MainLayoutProps {
  children: ReactNode;
  email?: string;
  filter?: Filter;
  onFilterChange?: (filter: Filter) => void;
  onAddTask?: () => void;
  search?: string;
  onSearchChange?: (search: string) => void;
  showSearch?: boolean;
  showGreeting?: boolean;
  showAddButton?: boolean;
}

export function MainLayout({
  children,
  email,
  filter,
  onFilterChange,
  onAddTask,
  search,
  onSearchChange,
  showSearch = true,
  showGreeting = true,
  showAddButton = true,
}: MainLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  const safeFilter = filter ?? { mode: "all" as const };
  const safeOnFilter = onFilterChange ?? (() => {});
  const safeOnAddTask = onAddTask ?? (() => {});

  return (
    <div className="min-h-screen bg-[#f8fcff] dark:bg-[#78719dc7]">
      <div className="min-h-screen lg:flex">
        {/* desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            email={email}
            filter={safeFilter}
            onChange={safeOnFilter}
            onAddTask={safeOnAddTask}
          />
        </div>

        {/* Dashboard page only */}
        {isDashboard && (
          <section className="min-h-screen relative flex-1 overflow-y-auto px-5 lg:px-14 pt-4 lg:py-8">
            {/* Mobile Header */}
            <div className="lg:hidden mb-3">
              <div className="mb-4 flex items-center gap-3">
                {showSearch && onSearchChange && (
                  <div className="flex-1">
                    <SearchInput
                      value={search ?? ""}
                      onChange={onSearchChange}
                    />
                  </div>
                )}
                <UserProfile mobile email={email} />
              </div>

              {showGreeting && (
                <GreetingHeader email={email ?? "user@gmail.com"} />
              )}

              <div className="flex items-center justify-end gap-1">
                <MobileSidebar>
                  <SidebarMenu
                    email={email}
                    filter={safeFilter}
                    onAddTask={safeOnAddTask}
                    onChange={safeOnFilter}
                  />
                </MobileSidebar>
              </div>
            </div>

            {children}
          </section>
        )}

        {/* floating button - dashboard only */}
        {showAddButton && onAddTask && isDashboard && (
          <FloatingAddButton onClick={onAddTask} />
        )}
      </div>
    </div>
  );
}
