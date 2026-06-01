"use client";

import Image from "next/image";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { TaskCategory } from "@/types/task";
import UserProfile from "./UserProfile";
import DarkModeButton from "../Elements/DarkModeButton";
interface Filter {
  mode: "all" | "today" | "category" | "calendar";
  categoryId?: string;
  date?: string;
}

interface Props {
  email?: string;
  filter: Filter;
  onChange: (filter: Filter) => void;
  onAddTask: () => void;
}

const menu = [
  { label: "Add task", icon: "/icons/add-task.svg" },
  { label: "Today", icon: "/icons/today.svg" },
  { label: "Calendar", icon: "/icons/calendar.svg" },
  { label: "Pomodoro timer", icon: "/icons/pomodoro.svg" },
];

export default function SidebarMenu({
  email,
  filter,
  onChange,
  onAddTask,
}: Props) {
  const { categories } = useCategories();

  const [open, setOpen] = useState(true);

  const getSize = (label: string) =>
    label === "Add task" || label === "Pomodoro timer" ? 22 : 18;

  const iconClass =
    "dark:[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(29%)_saturate(2290%)_hue-rotate(295deg)_brightness(101%)_contrast(102%)]";

  function handleMenu(label: string) {
    if (label === "Add task") {
      onAddTask();

      return;
    }

    if (label === "Today") {
      onChange({
        mode: "today",
        date: new Date().toISOString().slice(0, 10),
      });

      return;
    }

    if (label === "Category") {
      onChange({
        mode: "category",
        categoryId: undefined,
        date: undefined,
      });

      return;
    }

    if (label === "Calendar") {
      onChange({
        mode: "calendar",
      });

      return;
    }

    onChange({
      mode: "all",
    });
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* DESKTOP */}

      <div className="hidden lg:flex flex-col h-full px-8 py-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <UserProfile email={email} />
          <DarkModeButton />
        </div>

        {/* desktop menu */}

        <div className="shrink-0">
          {menu.map((item) => {
            const active =
              (item.label === "Today" && filter.mode === "today") ||
              (item.label === "Calendar" && filter.mode === "calendar");

            return (
              <button
                key={item.label}
                onClick={() => handleMenu(item.label)}
                className={`w-full h-[50px] rounded-2xl px-3 flex items-center gap-4 cursor-pointer transition-all duration-200 ${
                  active
                    ? "bg-[#EEF5FF] dark:bg-[#414462] dark:shadow-[0_0_18px_#00000040]"
                    : "hover:bg-[#EEF5FF] dark:hover:bg-[#3D3E58]"
                }`}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={getSize(item.label)}
                  height={getSize(item.label)}
                  className={iconClass}
                />

                <span
                  className={`text-[15px] font-medium ${
                    active
                      ? "text-[#303153] dark:text-white"
                      : "text-[#303153] dark:text-[#F4F4F4]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="my-8 border-b border-[#59B7FF]/30 shrink-0" />

        {/* desktop categories */}

        <div className="flex flex-col flex-1 min-h-0">
          <button
            onClick={() => setOpen(!open)}
            className="
      w-full
      px-3 py-2
      flex items-center justify-between
      rounded-2xl
      cursor-pointer
      transition-all duration-200
      hover:bg-[#EEF5FF]
      dark:hover:bg-[#3D3E58]
    "
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/category.svg"
                alt="categories"
                width={18}
                height={18}
                className={iconClass}
              />

              <span className="text-[#303153] dark:text-white ">
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
                <button
                  onClick={() =>
                    onChange({
                      mode: "all",
                    })
                  }
                  className={`w-full h-[42px] cursor-pointer rounded-xl pl-8 pr-4 text-left text-[13px] transition-all duration-200 ${
                    filter.mode === "all"
                      ? "bg-[#EEF5FF] dark:bg-[#414462] text-[#303153] dark:text-white font-semibold dark:shadow-[0_0_18px_#00000040]"
                      : "text-[#6D7085] dark:text-[#D6D6E7] hover:bg-[#EEF5FF] dark:hover:bg-[#3D3E58]"
                  }`}
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
                    className={`w-full h-[42px] rounded-xl pl-8 pr-4 text-left text-[13px] cursor-pointer transition-all duration-200 ${
                      filter.mode === "category" &&
                      filter.categoryId === category.id
                        ? "bg-[#EEF5FF] dark:bg-[#414462] text-[#303153] dark:text-white font-semibold dark:shadow-[0_0_18px_#00000040]"
                        : "text-[#6D7085] dark:text-[#D6D6E7] hover:bg-[#EEF5FF] dark:hover:bg-[#3D3E58]"
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
      </div>

      {/* MOBILE */}

      <div className="lg:hidden">
        <div className="space-y-4">
          {[
            ...menu.filter((item) => item.label !== "Pomodoro timer"),
            {
              label: "Category",
            },
          ].map((item, index, array) => {
            const isLast = index === array.length - 1;

            return (
              <button
                key={item.label}
                onClick={() => handleMenu(item.label)}
                className={`w-full text-left  transition-all duration-200 ${
                  !isLast ? "pb-3 border-b border-[#59B7FF]/40" : "pb-0"
                }`}
              >
                <span className="text-[16px] font-semibold text-[#303153] dark:text-white">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE CATEGORIES */}
    </div>
  );
}
