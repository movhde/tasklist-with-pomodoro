"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

interface CreateSubtask {
  title: string;
}

interface CreateTaskData {
  title: string;

  description?: string;

  dueDate?: string;

  estimatedDuration?: number;

  categoryId?: string;

  subtasks?: CreateSubtask[];
}

async function createTask(data: CreateTaskData) {
  const res = await axiosInstance.post("/api/task/taskLists", data);

  return res.data;
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return {
    createTask: mutation.mutateAsync,

    isCreating: mutation.isPending,

    error: mutation.error,
  };
}
