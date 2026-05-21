"use client";

import { useCategories } from "@/hooks/useCategories";

interface Props {
  selectedCategory?: string;

  onChange: (categoryId?: string) => void;
}

export default function Sidebar({
  selectedCategory,

  onChange,
}: Props) {
  const { categories } = useCategories();

  return (
    <aside
      className="
      w-[300px]

      p-10

      bg-white

      dark:bg-[#31304A]
      "
    >
      <h2
        className="
        mb-10

        text-[28px]

        font-bold
        "
      >
        Tasks
      </h2>

      <div
        className="
        flex

        flex-col

        gap-4
        "
      >
        <button
          onClick={() => onChange()}
          className={`
          rounded-xl

          px-5

          py-4

          text-left

          ${
            !selectedCategory
              ? `
            bg-[#59B7FF]

            text-white
            `
              : `
            bg-transparent
            `
          }
          `}
        >
          All
        </button>

        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`
              rounded-xl

              px-5

              py-4

              text-left

              ${
                selectedCategory === category.id
                  ? `
                bg-[#59B7FF]

                text-white
                `
                  : `
                `
              }
              `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
