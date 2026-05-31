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

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");

    setDescription(task.description || "");

    setDueDate(task.dueDate || "");

    setEstimatedDuration(task.estimatedDuration || null);

    setCategoryId(task.categoryId || "");

    setSubtasks(task.subtasks || []);
  }, [task]);

  const updateTask = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.patch(`/api/task/taskLists/${task.id}`, {
        title,
        description: description || null,
        dueDate: dueDate || null,
        estimatedDuration,
        categoryId: categoryId || null,
        subtasks,
      });

      return res.data;
    },

    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      onUpdated(updatedTask);

      onClose();
    },
  });

  const deleteTask = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/api/task/taskLists/${task.id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      onClose();
    },
  });

  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/20
      p-6
      backdrop-blur-[3px]
    "
    >
      <div
        className="
        relative
        w-full
        max-w-[760px]
        max-h-[88vh]
        overflow-y-auto

        rounded-[34px]

        border border-white/20

        bg-gray-100

        dark:bg-[#2B2D42]/95

        shadow-[0_20px_70px_rgba(0,0,0,0.18)]

        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
      >
        <div className="p-5">
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
  );
}
