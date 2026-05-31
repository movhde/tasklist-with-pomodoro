import { CalendarDays, Clock3 } from "lucide-react";
import ModalInput from "@/app/components/ui/modal-input";
import CalendarPicker from "@/app/components/ui/CalendarPicker";
import TimePicker from "@/app/components/ui/time-picker";
import CategoryChip from "@/app/components/ui/category-chip";
import { TaskCategory } from "@/types/task";

import TaskSubtasksSection from "../../TaskSubtasksSection";
import AddTaskFooter from "../../AddTaskFooter";
import { AddTaskProps } from "../type";
import AddTaskHeader from "../../AddTaskHeader";

export default function DesktopAddTaskForm({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  estimatedDuration,
  setEstimatedDuration,
  categoryId,
  setCategoryId,
  subtasks,
  setSubtasks,
  isCreating,
  handleCreateTask,
  onClose,
  categories = [],
}: AddTaskProps) {
  return (
    <div className="mt-4 space-y-6">
      <AddTaskHeader onClose={onClose} />

      {/* TITLE */}

      <div>
        <label className="font-sniglet mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Task title
        </label>

        <ModalInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Study for math exam..."
        />
      </div>

      {/* DESCRIPTION */}

      <div>
        <label className="font-sniglet mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Description
        </label>

        <div className="rounded-[26px] border border-[#E8EEF7] bg-[#F8FAFD] p-1 shadow-[0_4px_14px_rgba(15,23,42,.04)] dark:border-[#FFFFFF10] dark:bg-[#363750]">
          <div className="flex gap-3 px-4 py-2">
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something..."
              className="font-sniglet w-full resize-none bg-transparent text-[15px] text-[#303153] outline-none placeholder:text-[#9EA3B5] dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* DATE + TIME */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="font-sniglet mb-3 flex items-center gap-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
            <CalendarDays size={14} stroke="#5B8CFF" />
            Due date
          </label>

          <CalendarPicker value={dueDate} onChange={setDueDate} />
        </div>

        <div>
          <label className="font-sniglet mb-3 flex items-center gap-2 px-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
            <Clock3 size={14} stroke="#5B8CFF" />
            Focus time
          </label>

          <TimePicker
            value={estimatedDuration}
            onChange={setEstimatedDuration}
          />
        </div>
      </div>

      {/* CATEGORY */}

      <div>
        <label className="font-sniglet mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Category
        </label>

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

      {/* SUBTASKS */}

      <TaskSubtasksSection subtasks={subtasks} setSubtasks={setSubtasks} />

      {/* FOOTER */}

      <AddTaskFooter
        isCreating={isCreating}
        onClose={onClose}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
