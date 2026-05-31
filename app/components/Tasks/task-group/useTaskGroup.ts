"use client";

import { useMemo, useState } from "react";

import { Task } from "@/types/task";
import { getTaskProgress } from "@/utils/taskProgress";
import { useQueryClient } from "@tanstack/react-query";
export default function useTaskGroup(task: Task) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [taskState, setTaskState] = useState<Task>(task);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const { progress, completed, done, total } = useMemo(
    () => getTaskProgress(taskState),
    [taskState],
  );
  const queryClient = useQueryClient();
  async function toggleTask() {
    const updatedCompleted = !taskState.completed;

    const updatedSubtasks =
      taskState.subtasks?.map((subtask) => ({
        ...subtask,
        completed: updatedCompleted,
      })) || [];

    const updatedTask = {
      ...taskState,
      completed: updatedCompleted,
      subtasks: updatedSubtasks,
    };

    setTaskState(updatedTask);

    try {
      const token = localStorage.getItem("token");

      await fetch(`/api/task/taskLists/${task.id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          completed: updatedCompleted,
        }),
      });
    } catch {
      setTaskState(taskState);
    }
  }
  async function deleteTask() {
    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`/api/task/taskLists/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      return true;
    } catch {
      return false;
    } finally {
      setDeleteLoading(false);
    }
  }

  async function toggleSubtask(subtaskId: string) {
    const previousTask = taskState;

    const updatedSubtasks =
      taskState.subtasks?.map((subtask) =>
        subtask.id === subtaskId
          ? {
              ...subtask,
              completed: !subtask.completed,
            }
          : subtask,
      ) || [];

    const allCompleted = updatedSubtasks.every((subtask) => subtask.completed);

    const updatedTask = {
      ...taskState,
      completed: allCompleted,
      subtasks: updatedSubtasks,
    };

    setTaskState(updatedTask);

    try {
      const token = localStorage.getItem("token");

      const targetSubtask = updatedSubtasks.find(
        (subtask) => subtask.id === subtaskId,
      );

      const res = await fetch(
        `/api/task/taskLists/${task.id}/subtasks/${subtaskId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            completed: targetSubtask?.completed,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
    } catch {
      setTaskState(previousTask);
    }
  }

  return {
    taskState,
    setTaskState,

    open,
    setOpen,

    editOpen,
    setEditOpen,

    progress,
    completed,
    done,
    total,

    toggleTask,
    toggleSubtask,

    deleteTask,

    deleteOpen,
    setDeleteOpen,

    deleteLoading,
  };
}
