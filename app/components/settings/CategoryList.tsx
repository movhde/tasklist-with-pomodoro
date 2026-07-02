"use client";

import { TaskCategory } from "@/types/task";

export default function CategoryList({
  categories,
  selectedId,
  onSelect,
}: {
  categories: TaskCategory[];
  selectedId?: string;
  onSelect: (categoryId?: string) => void;
}) {
  return (
    <div
      className="
    h-[220px]
    lg:h-[280px]

    overflow-hidden
    rounded-[24px]
    border
    border-[#DCE7F5]
    bg-white
    shadow-[0_10px_30px_rgba(0,0,0,0.03)]

    dark:border-[#FFFFFF18]
    dark:bg-[#2E2F46]
  "
    >
      {" "}
      <div className="h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.length === 0 ? (
          <div className="p-4 text-[13px] text-[#9B9B9B] dark:text-[#A8A9BD]">
            No categories
          </div>
        ) : (
          categories.map((cat, idx) => {
            const active = selectedId === cat.id;
            const isLast = idx === categories.length - 1;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelect(cat.id)}
                className={[
                  "w-full px-4 py-4 text-left text-[13px] cursor-pointer transition",
                  !isLast
                    ? "border-b border-[#EAEAEA] dark:border-[#FFFFFF10]"
                    : "",
                  active
                    ? "bg-[#F0FAFF] text-[#303153] dark:bg-[#FE92B0]/50 dark:text-white"
                    : "text-[#303153] hover:bg-[#F7FBFF] dark:text-[#D6D6E7] dark:hover:bg-[#3D3E58]",
                ].join(" ")}
              >
                {cat.name}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
