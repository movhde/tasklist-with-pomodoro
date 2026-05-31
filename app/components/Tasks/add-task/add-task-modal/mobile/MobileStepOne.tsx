import ModalInput from "@/app/components/ui/modal-input";
import { AddTaskProps } from "../type";
import { TaskCategory } from "@/types/task";
import CategoryChip from "@/app/components/ui/category-chip";

export default function MobileStepOne({
  title,
  setTitle,
  categoryId,
  setCategoryId,
  next,
  categories = [],
}: AddTaskProps) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h2 className="text-[#252842] text-xl font-sniglet font-semibold ">
          Title
        </h2>

        <ModalInput value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-[#252842] text-xl font-sniglet font-semibold ">
          Category
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category: TaskCategory) => (
            <CategoryChip
              key={category.id}
              label={category.name}
              active={categoryId === category.id}
              onClick={() => setCategoryId(category.id)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <button
          onClick={next}
          className="mt-6 mb-10 w-full max-w-2/3 font-sniglet font-semibold text-xl bg-white border-2 border-[#FFB6D3] text-[#303153] p-2 rounded-[30px] drop-shadow-[2px_2px_6px_#F5B9D1]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
