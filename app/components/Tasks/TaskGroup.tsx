"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ChevronDown, Clock3 } from "lucide-react";

import SubTaskTimeline from "./SubTaskTimeline";

import ProgressRing from "./ProgressRing";

import { getTaskProgress } from "@/utils/taskProgress";

import { Task } from "@/types/task";

interface Props {
  task: Task;
}

export default function TaskGroup({ task }: Props) {
  const [open, setOpen] = useState(false);

  const [taskState, setTaskState] = useState<Task>(task);

  const { progress, completed, done, total } = useMemo(
    () => getTaskProgress(taskState),
    [taskState],
  );

  async function toggleTask() {
    const updatedCompleted = !taskState.completed;

    const updatedSubtasks =
      taskState.subtasks?.map((s) => ({
        ...s,
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

  async function toggleSubtask(subtaskId: string) {
    const previousTask = taskState;

    const updatedSubtasks =
      taskState.subtasks?.map((s) =>
        s.id === subtaskId
          ? {
              ...s,
              completed: !s.completed,
            }
          : s,
      ) || [];

    const allCompleted = updatedSubtasks.every((s) => s.completed);

    const updatedTask = {
      ...taskState,
      completed: allCompleted,
      subtasks: updatedSubtasks,
    };

    setTaskState(updatedTask);

    try {
      const token = localStorage.getItem("token");

      const targetSubtask = updatedSubtasks.find((s) => s.id === subtaskId);

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

      console.log(await res.json());
    } catch (error) {
      console.error(error);

      // rollback
      setTaskState(previousTask);
    }
  }

  return (
    <div
      className="
      rounded-[22px]
      overflow-hidden
      border border-[#59B7FF]/20
      dark:border-[#FD81B0]/15
      bg-white dark:bg-[#31304A]
      shadow-[0_4px_20px_rgba(0,0,0,.03)]
      transition-all duration-300
    "
    >
      {/* HEADER */}

      <div className="px-5 py-4 flex items-center justify-between gap-4">
        {/* LEFT */}

        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* CHECK */}

          <button
            onClick={toggleTask}
            className="
              mt-1
              w-[22px]
              h-[22px]
              rounded-full
              border-[4px]
              border-[#59B7FF]
              dark:border-[#FD81B0]
              flex items-center justify-center
              transition-all duration-200
              shrink-0
            "
          >
            <div
              className={`
                rounded-full bg-[#59B7FF] dark:bg-[#FD81B0]
                transition-all duration-200
                ${
                  completed
                    ? "w-[8px] h-[8px] opacity-100"
                    : "w-0 h-0 opacity-0"
                }
              `}
            />
          </button>

          {/* TEXT */}

          <div className="min-w-0 flex-1">
            <h3
              className={`
                font-sniglet
                font-semibold
                tracking-wide
                text-[17px] md:text-[19px]
                transition-all duration-300
                ${
                  completed
                    ? "line-through opacity-50 text-[#7E809A]"
                    : "text-[#303153] dark:text-white"
                }
              `}
            >
              {taskState.title}
            </h3>

            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <p className="text-[12px] text-[#7B7D93] dark:text-[#C6C7D2]">
                {taskState.subtasks?.length
                  ? `${done} of ${total} subtasks completed`
                  : completed
                    ? "Completed"
                    : "Not completed"}
              </p>

              {taskState.estimatedDuration && (
                <div className="flex items-center gap-1 text-[12px] text-[#7B7D93] dark:text-[#C6C7D2]">
                  <Clock3 size={13} />
                  <span>{taskState.estimatedDuration}m</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3 shrink-0">
          <ProgressRing progress={progress} completed={completed} />

          <button
            onClick={() => taskState.subtasks?.length && setOpen(!open)}
            disabled={!taskState.subtasks?.length}
          >
            <motion.div
              animate={{
                rotate: open ? 180 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <ChevronDown
                size={20}
                className={
                  taskState.subtasks?.length
                    ? "text-[#59B7FF] dark:text-[#FD81B0]"
                    : "text-gray-300 dark:text-gray-600"
                }
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* BODY */}

      {!!taskState.subtasks?.length && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.28,
              }}
              className="overflow-hidden"
            >
              <SubTaskTimeline
                subtasks={taskState.subtasks}
                onToggle={toggleSubtask}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
