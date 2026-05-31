"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Subtask } from "@/types/task";
import { TaskGroupContentProps } from "./types";
import SubTaskTimeline from "./SubTaskTimeline";

export default function TaskGroupContent({
  open,
  subtasks,
  onToggleSubtask,
}: TaskGroupContentProps) {
  if (!subtasks.length) return null;

  return (
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
          <SubTaskTimeline subtasks={subtasks} onToggle={onToggleSubtask} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
