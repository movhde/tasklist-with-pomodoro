"use client";

import { useState } from "react";

import { CalendarDays, Clock3 } from "lucide-react";
import { toast } from "sonner";

import ModalInput from "@/app/components/ui/modal-input";
import CalendarPicker from "@/app/components/ui/CalendarPicker";
import TimePicker from "@/app/components/ui/time-picker";
import CategoryChip from "@/app/components/ui/category-chip";

import { useCategories } from "@/hooks/useCategories";
import { useCreateTask } from "@/hooks/useCreateTask";

import { Subtask } from "@/types/task";

import TaskSubtasksSection from "./TaskSubtasksSection";
import AddTaskFooter from "./AddTaskFooter";

interface Props {
  onClose: () => void;
}

export default function AddTaskForm({ onClose }: Props) {
  const today = new Date();

  const defaultDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const { categories } = useCategories();

  const { createTask, isCreating } = useCreateTask();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState(defaultDate);

  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(
    null,
  );

  const [categoryId, setCategoryId] = useState("");

  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  async function handleCreateTask() {
    if (!title.trim()) {
      toast.error("Task title is required", {
        description: "Give your task a clear name.",
      });

      return;
    }

    if (!categoryId) {
      toast.error("Category is required", {
        description: "Select a category before continuing.",
      });

      return;
    }

    try {
      await createTask({
        title,
        description: description || undefined,
        dueDate,
        estimatedDuration: estimatedDuration || undefined,
        categoryId,
        subtasks: subtasks.map((subtask) => ({
          title: subtask.title,
        })),
      });

      toast.success("Task created successfully ✨", {
        description: "Your task has been added to today's workflow.",
      });

      setTitle("");
      setDescription("");
      setDueDate(defaultDate);
      setEstimatedDuration(null);
      setCategoryId("");
      setSubtasks([]);

      onClose();
    } catch {
      toast.error("Failed to create task", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="mt-4 space-y-6">
      {/* TITLE */}

      <div>
        <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
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
        <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Description
        </label>

        <div className="rounded-[26px] border border-[#E8EEF7] bg-[#F8FAFD] p-1 shadow-[0_4px_14px_rgba(15,23,42,.04)] dark:border-[#FFFFFF10] dark:bg-[#363750]">
          <div className="flex gap-3 px-4 py-2">
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something..."
              className="w-full resize-none bg-transparent text-[15px] text-[#303153] outline-none placeholder:text-[#9EA3B5] dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* DATE + TIME */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
            <CalendarDays size={14} stroke="#5B8CFF" />
            Due date
          </label>

          <CalendarPicker value={dueDate} onChange={setDueDate} />
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 px-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
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
        <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
          Category
        </label>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((category: any) => (
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
