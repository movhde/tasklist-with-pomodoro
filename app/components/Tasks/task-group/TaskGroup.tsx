"use client";

import { Task } from "@/types/task";

import useTaskGroup from "./useTaskGroup";
import TaskGroupHeader from "./TaskGroupHeader";
import TaskGroupContent from "./TaskGroupContent";
import EditTaskModal from "../edit-task/EditTaskModal";
interface Props {
  task: Task;
}

export default function TaskGroup({ task }: Props) {
  const {
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
  } = useTaskGroup(task);
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#59B7FF]/20 bg-white shadow-[0_4px_20px_rgba(0,0,0,.03)] transition-all duration-300 dark:border-[#FD81B0]/15 dark:bg-[#31304A]">
      <TaskGroupHeader
        task={taskState}
        completed={completed}
        done={done}
        total={total}
        progress={progress}
        open={open}
        onToggleTask={toggleTask}
        onToggleOpen={() => setOpen(!open)}
        onEdit={() => setEditOpen(true)}
      />
      <TaskGroupContent
        open={open}
        subtasks={taskState.subtasks || []}
        onToggleSubtask={toggleSubtask}
      />
      <EditTaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={taskState}
        onUpdated={setTaskState}
      />
    </div>
  );
}
