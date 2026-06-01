"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useCategories } from "@/hooks/useCategories";
import { Task, Subtask } from "@/types/task";
import EditTaskHeader from "./EditTaskHeader";
import EditTaskForm from "./EditTaskForm";
import EditTaskFooter from "./EditTaskFooter";

interface Props {
  task: Task;
  open: boolean;
  onClose: () => void;
  onUpdated: (task: Task) => void;
}

export default function EditTaskModal({
  task,
  open,
  onClose,
  onUpdated,
}: Props) {
  const queryClient = useQueryClient();
  const { categories } = useCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(
    null,
  );
  const [categoryId, setCategoryId] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  // Reset form when modal opens or task changes
  useEffect(() => {
    if (open && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setEstimatedDuration(task.estimatedDuration || null);
      setCategoryId(task.categoryId || "");
      setSubtasks(task.subtasks || []);
    }
  }, [open, task]);

  const updateTask = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        description: description || null,
        dueDate: dueDate || null,
        estimatedDuration: estimatedDuration || null,
        categoryId: categoryId || null,
        subtasks: subtasks.map(({ id, title, completed }) => ({
          id,
          title,
          completed,
        })),
      };
      const res = await axiosInstance.patch(
        `/api/task/taskLists/${task.id}`,
        payload,
      );
      return res.data;
    },
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", task.id] });
      onUpdated(updatedTask);
      onClose();
    },
    onError: (error) => console.error("Error updating task:", error),
  });

  const deleteTask = useMutation({
    mutationFn: async () =>
      await axiosInstance.delete(`/api/task/taskLists/${task.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    },
    onError: (error) => console.error("Error deleting task:", error),
  });

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col sm:flex sm:items-center sm:justify-center bg-white sm:bg-black/20 dark:bg-[#2B2D42] sm:dark:bg-black/20 backdrop-blur-[3px]">
        <div className="flex-1 flex flex-col h-full sm:h-auto w-full max-w-[760px] sm:max-h-[88vh] sm:rounded-[34px] sm:border sm:border-white/20 sm:bg-gray-100 sm:dark:bg-[#2B2D42]/95 sm:shadow-[0_20px_70px_rgba(0,0,0,0.18)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex-1  p-5 pb-24  sm:pb-5">
            <EditTaskHeader onClose={onClose} />
            <div className="mt-6">
              <EditTaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                dueDate={dueDate}
                setDueDate={setDueDate}
                estimatedDuration={estimatedDuration}
                setEstimatedDuration={setEstimatedDuration}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                categories={categories}
                subtasks={subtasks}
                setSubtasks={setSubtasks}
              />
            </div>
            <div className="mt-8">
              <EditTaskFooter
                isLoading={updateTask.isPending || deleteTask.isPending}
                onSave={() => updateTask.mutate()}
                onDelete={() => deleteTask.mutate()}
                onCancel={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
