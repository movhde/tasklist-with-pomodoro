"use client";

import { useCategories } from "@/hooks/useCategories";
import AddTaskHeader from "../AddTaskHeader";
import DesktopAddTaskForm from "./desktop/DesktopAddTaskForm";
import MobileAddTaskForm from "./mobile/MobileAddTaskForm";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useState } from "react";
import { Subtask } from "@/types/task";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ open, onClose }: Props) {
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

  const formProps = {
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
    categories,
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/20 p-0 md:p-6 backdrop-blur-[3px]">
      <div className="relative w-full max-w-190 md:max-h-[88vh] max-h-fit overflow-y-auto md:rounded-[34px] rounded-b-none rounded-t-[34px] border border-white/20 bg-white md:bg-gray-100 shadow-[0_20px_70px_rgba(0,0,0,0.18)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-[#2B2D42]/95 animate-in fade-in zoom-in-95 duration-200">
        <div className="relative z-10 p-2 px-6 md:p-5">
          <div className="hidden md:block">
            <DesktopAddTaskForm {...formProps} onClose={onClose} />
          </div>
          <div className="block md:hidden">
            <MobileAddTaskForm {...formProps} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
