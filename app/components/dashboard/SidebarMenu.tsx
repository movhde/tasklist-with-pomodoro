"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { TaskCategory } from "@/types/task";
import UserProfile from "./UserProfile";
import DarkModeButton from "../Elements/DarkModeButton";
import { Filter, getMenuForPath, ICON_DARK_CLASS } from "./sidebarConfig";

interface Props {
  email?: string;
  filter: Filter;
  onChange: (filter: Filter) => void;
  onAddTask: () => void;
}

const menuItemBase =
  "w-full h-[50px] rounded-2xl px-3 flex items-center gap-4 cursor-pointer transition-all duration-200";
const menuItemActive =
  "bg-[#EEF5FF] dark:bg-[#414462] dark:shadow-[0_0_18px_#00000040]";
const menuItemHover = "hover:bg-[#EEF5FF] dark:hover:bg-[#3D3E58]";

const categoryItemBase =
  "w-full h-[42px] rounded-xl pl-8 pr-4 text-left text-[13px] cursor-pointer transition-all duration-200";
const categoryItemActive =
  "bg-[#EEF5FF] dark:bg-[#414462] text-[#303153] dark:text-white font-semibold dark:shadow-[0_0_18px_#00000040]";
const categoryItemInactive =
  "text-[#6D7085] dark:text-[#D6D6E7] hover:bg-[#EEF5FF] dark:hover:bg-[#3D3E58]";

export default function SidebarMenu({
  email,
  filter,
  onChange,
  onAddTask,
}: Props) {
  const { categories } = useCategories();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const menu = getMenuForPath(pathname);

  function handleMenu(label: string) {
    const routes: Record<string, string> = {
      Dashboard: "/dashboard",
      Settings: "/settings",
      "Pomodoro timer": "/pomodoro",
    };

    if (label === "Add task") {
      onAddTask();
      return;
    }
    if (routes[label]) {
      router.push(routes[label]);
      return;
    }
    if (label === "Today") {
      onChange({ mode: "today", date: new Date().toISOString().slice(0, 10) });
      return;
    }
    if (label === "Calendar") {
      onChange({ mode: "calendar" });
      return;
    }

    onChange({ mode: "all" });
  }

  function isActive(label: string) {
    return (
      (label === "Today" && filter.mode === "today") ||
      (label === "Calendar" && filter.mode === "calendar")
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full px-8 py-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <UserProfile email={email} />
          <DarkModeButton />
        </div>

        <div className="shrink-0">
          {menu.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenu(item.label)}
              className={`${menuItemBase} ${isActive(item.label) ? menuItemActive : menuItemHover}`}
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  alt=""
                  width={22}
                  height={22}
                  className={ICON_DARK_CLASS}
                />
              )}
              <span className="text-[15px] font-medium text-[#303153] dark:text-[#F4F4F4]">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {pathname === "/dashboard" && (
          <>
            <div className="my-8 border-b border-[#59B7FF]/30 shrink-0" />

            <div className="flex flex-col flex-1 min-h-0">
              {/* Categories button */}
              <button
                onClick={() => setOpen(!open)}
                className={`w-full px-3 py-2 flex items-center justify-between rounded-2xl cursor-pointer transition-all duration-200 ${menuItemHover}`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/category.svg"
                    alt="categories"
                    width={22}
                    height={22}
                    className={ICON_DARK_CLASS}
                  />
                  <span className="text-[#303153] dark:text-white">
                    Categories
                  </span>
                </div>
                <span className="text-[#FD81B0] text-[24px] leading-none">
                  {open ? "−" : "+"}
                </span>
              </button>

              {open && (
                <div className="relative flex-1 mt-3 min-h-0">
                  <div className="absolute bottom-0 left-0 right-0 h-[72px] pointer-events-none bg-gradient-to-t from-white dark:from-[#32334B] to-transparent z-20" />
                  <div className="h-full overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {/* All */}
                    <button
                      onClick={() => onChange({ mode: "all" })}
                      className={`${categoryItemBase} ${filter.mode === "all" ? categoryItemActive : categoryItemInactive}`}
                    >
                      All
                    </button>

                    {categories.map((category: TaskCategory) => (
                      <button
                        key={category.id}
                        onClick={() =>
                          onChange({
                            mode: "category",
                            categoryId: category.id,
                          })
                        }
                        className={`${categoryItemBase} ${
                          filter.mode === "category" &&
                          filter.categoryId === category.id
                            ? categoryItemActive
                            : categoryItemInactive
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                    <div className="h-[80px]" />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="space-y-4">
          {menu.map((item, i) => (
            <button
              key={item.label}
              onClick={() => handleMenu(item.label)}
              className={`w-full text-left transition-all duration-200 ${
                i < menu.length - 1
                  ? "pb-3 border-b border-[#59B7FF]/40"
                  : "pb-0"
              }`}
            >
              <span className="text-[16px] font-semibold text-[#303153] dark:text-white">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
