"use client";

import ModalInput from "@/app/components/ui/modal-input";
import TimePicker from "@/app/components/ui/time-picker";
import CategoryChip from "@/app/components/ui/category-chip";
import CalendarPicker from "@/app/components/ui/CalendarPicker";

import { TaskCategory, Subtask } from "@/types/task";

import { CalendarDays, Clock3, StickyNote } from "lucide-react";

import EditTaskSubtasks from "./EditTaskSubtasks";

interface Props {
  title: string;
  setTitle: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  dueDate: string;
  setDueDate: (value: string) => void;

  estimatedDuration: number | null;
  setEstimatedDuration: (value: number) => void;

  categoryId: string;
  setCategoryId: (value: string) => void;

  categories: TaskCategory[];

  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
}

export default function EditTaskForm({
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

  categories,

  subtasks,
  setSubtasks,
}: Props) {
  return (
    <div className="space-y-6">
      {/* TITLE */}

      <div>
        <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Task title
        </label>

        <ModalInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
        />
      </div>

      {/* DESCRIPTION */}

      <div>
        <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Description
        </label>

        <div
          className="
          rounded-[26px]
          border border-[#E8EEF7]
          bg-[#F8FAFD]
          p-3
          dark:border-[#FFFFFF10]
          dark:bg-[#363750]
        "
        >
          <div className="flex gap-3">
            <div
              className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-[#EEF5FF]
              dark:bg-[#434560]
            "
            >
              <StickyNote size={18} className="text-[#7B84B2]" />
            </div>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something..."
              className="
                w-full
                resize-none
                bg-transparent
                text-[15px]
                text-[#303153]
                outline-none
                dark:text-white
              "
            />
          </div>
        </div>
      </div>

      {/* DATE + TIME */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
            <CalendarDays size={14} />
            Due date
          </label>

          <CalendarPicker value={dueDate} onChange={setDueDate} />
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
            <Clock3 size={14} />
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
        <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Category
        </label>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => (
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

      <EditTaskSubtasks subtasks={subtasks} setSubtasks={setSubtasks} />
    </div>
  );
}
