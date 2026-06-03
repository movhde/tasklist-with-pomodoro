"use client";

import { TaskWithCategory } from "@/types/task";

import useTaskGroup from "./useTaskGroup";
import TaskGroupHeader from "./TaskGroupHeader";
import TaskGroupContent from "./TaskGroupContent";
import EditTaskModal from "../edit-task/EditTaskModal";
import DeleteTaskModal from "../delete-task/DeleteTaskModal";
interface Props {
  task: TaskWithCategory;
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

    deleteOpen,
    setDeleteOpen,
    deleteLoading,
    deleteTask,
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
        onDelete={() => setDeleteOpen(true)}
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
      <DeleteTaskModal
        open={deleteOpen}
        loading={deleteLoading}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          const success = await deleteTask();

          if (success) {
            setDeleteOpen(false);
          }
        }}
      />
    </div>
  );
}
