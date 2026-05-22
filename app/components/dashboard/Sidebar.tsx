"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCategories } from "@/hooks/useCategories";
// import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  selectedCategory?: string;
  onChange: (id?: string) => void;
}

const menuItems = ["Add task", "Today", "Calendar", "Pomodoro timer"];

export default function Sidebar({ selectedCategory, onChange }: SidebarProps) {
  const router = useRouter();

  const { categories } = useCategories();

  const [open, setOpen] = useState(false);

  // const { user } = useAuth();

  const email = "test@gmail.com";

  const handleCategory = (id?: string) => {
    onChange(id);

    if (id) {
      router.push(`/categories/${id}`);
    }
  };

  const iconClass =
    "dark:[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(32%)_saturate(1150%)_hue-rotate(296deg)_brightness(103%)_contrast(101%)]";

  const Content = (
    <div
      className="
      mx-auto
      w-[220px]
      flex
      flex-col
      "
    >
      {/* PROFILE */}

      <div
        className="
        mb-12
        flex
        items-center
        gap-3
        "
      >
        <div
          className="
          h-10
          w-10
          rounded-full
          bg-gradient-to-br
          from-pink-300
          to-orange-300
          "
        />

        <p
          className="
          text-[13px]
          font-medium
          text-[#303153]
          dark:text-white
          "
        >
          {email}
        </p>
      </div>

      {/* MENU */}

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item}
            className="
              flex

              h-[46px]

              w-full

              items-center

              gap-4

              rounded-2xl

              px-4

              font-medium

              transition-all

              hover:bg-[#EEF5FF]

              dark:hover:bg-[#3D3B58]
              "
          >
            <Image
              src={`/icons/${
                ["add-task", "today", "calendar", "pomodoro"][index]
              }.svg`}
              alt={item}
              width={18}
              height={18}
              className={iconClass}
            />

            <span
              className="
                text-[14px]

                tracking-[0.2px]

                text-[#303153]

                dark:text-white
                "
            >
              {item}
            </span>
          </button>
        ))}
      </nav>

      {/* DIVIDER */}

      <div
        className="
        my-8

        w-[85%]

        self-center

        border-t

        border-[#3AAFF8]
        "
      />

      {/* CATEGORY */}

      <div
        className="
        mb-4

        flex

        items-center

        gap-4

        px-4

        text-[14px]

        font-medium
        "
      >
        <Image
          src="/icons/category.svg"
          alt=""
          width={18}
          height={18}
          className={iconClass}
        />

        <span>Categories</span>
      </div>

      {/* LIST */}

      <div className="space-y-2">
        <button
          onClick={() => handleCategory()}
          className="
          h-[44px]

          w-full

          rounded-2xl

          px-4

          text-left

          font-medium

          text-[#303153]

          hover:bg-[#EEF5FF]

          dark:text-white

          dark:hover:bg-[#3D3B58]
          "
        >
          All
        </button>

        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => handleCategory(category.id)}
            className="
              h-[44px]

              w-full

              rounded-2xl

              px-4

              text-left

              font-medium

              text-[#303153]

              hover:bg-[#EEF5FF]

              dark:text-white

              dark:hover:bg-[#3D3B58]
              "
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE */}

      <button
        onClick={() => setOpen(true)}
        className="
        fixed

        left-5
        top-5

        z-50

        lg:hidden
        "
      >
        <Image src="/icons/menu.svg" alt="" width={24} height={24} />
      </button>

      {open && (
        <div
          className="
          fixed

          inset-0

          z-50

          bg-black/20

          lg:hidden
          "
        >
          <div
            className="
            absolute

            top-0

            w-full

            h-[160px]

            overflow-x-auto

            bg-white

            dark:bg-[#292842]

            [scrollbar-width:none]
            "
          >
            {menuItems.map((item) => (
              <button
                key={item}
                className="
                  relative

                  h-[52px]

                  w-full

                  text-left

                  px-8

                  text-[#303153]

                  dark:text-white
                  "
              >
                {item}

                <div
                  className="
                    absolute

                    bottom-0

                    left-[8%]

                    w-[84%]

                    border-b

                    border-[#3AAFF8]
                    "
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DESKTOP */}

      <aside
        className="
        hidden

        h-screen

        w-[360px]

        flex-col

        bg-white

        py-8

        shadow-[0_20px_60px_rgba(80,120,255,.25)]

        dark:bg-[#292842]

        lg:flex
        "
      >
        {Content}
      </aside>
    </>
  );
}
