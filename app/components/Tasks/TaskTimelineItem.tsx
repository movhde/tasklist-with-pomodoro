"use client";

import { useState } from "react";

import Image from "next/image";

import TaskCard from "./TaskCard";

interface Props {
  task: any;

  isLast: boolean;
}

export default function TaskTimelineItem({
  task,

  isLast,
}: Props) {
  const [completed, setCompleted] = useState(task.completed);

  return (
    <div
      className="
      relative

      flex

      items-center

      gap-5

      pb-[26px]
      "
    >
      {/* timeline */}
      <div
        className="
        relative

        w-[28px]

        self-stretch

        shrink-0

        flex

        justify-center
        "
      >
        {/* line */}
        {!isLast && (
          <div
            className="
    absolute

    left-1/2

    top-[24px]

    h-[90px]

    md:h-[98px]

    -translate-x-1/2

    w-[2px]

    bg-[#59B7FF]

    rounded-full

    animate-grow-line

    origin-top
    "
          />
        )}
        {/* circle */}
        <button
          onClick={() => setCompleted(!completed)}
          className="
relative

cursor-pointer

active:scale-95

transition-transform

duration-150

z-20

mt-auto
mb-auto

w-[24px]
h-[24px]

rounded-full

border-[4px]

border-[#59B7FF]

bg-white

dark:bg-[#28273D]

flex

items-center

justify-center
"
        >
          <div
            className={`
transition-all
duration-150

rounded-full

bg-[#59B7FF]

${
  completed
    ? `
w-[8px]
h-[8px]
opacity-100
`
    : `
w-0
h-0
opacity-0
`
}
`}
          />
        </button>
      </div>

      {/* card */}
      <div
        className="
        flex-1

        min-w-0
        "
      >
        <TaskCard task={task} completed={completed} />
      </div>
    </div>
  );
}
