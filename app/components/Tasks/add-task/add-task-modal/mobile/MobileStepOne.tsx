import ModalInput from "@/app/components/ui/modal-input";
import { AddTaskProps } from "../type";
import { TaskCategory } from "@/types/task";
import CategoryChip from "@/app/components/ui/category-chip";
import ControlButton from "./ControlButton";

export default function MobileStepOne({
  title,
  setTitle,
  categoryId,
  setCategoryId,
  next,
  categories = [],
}: AddTaskProps) {
  return (
    <div className="flex min-h-105 flex-col">
      <div className="flex-1 flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#252842] dark:text-white text-xl font-sniglet font-semibold ">
            Title
          </h2>

          <ModalInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-[#252842] dark:text-white text-xl font-sniglet font-semibold ">
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
      </div>

      <div className="w-full flex justify-center items-center">
        <ControlButton buttonName="Next" onClick={next} />
      </div>
    </div>
  );
}
