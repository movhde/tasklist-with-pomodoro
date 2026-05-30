"use client";

interface Props {
  subtask: any;
  isLast: boolean;
  onToggle: (id: string) => void;
}

export default function SubTaskItem({ subtask, isLast, onToggle }: Props) {
  return (
    <div className="relative flex gap-4 pb-5">
      {/* TIMELINE */}
      <div className="relative w-[24px] shrink-0 flex justify-center">
        {/* line */}
        {!isLast && (
          <div
            className="
          absolute
          top-[20px]
          left-1/2
          -translate-x-1/2
          w-[2px]
          h-0
          rounded-full
          bg-[#FD81B0]
          dark:bg-[#FD81B0]
          animate-grow-line
        "
          />
        )}

        {/* circle */}
        <button
          onClick={() => onToggle(subtask.id)}
          className="
            relative z-10
            w-[20px]
            h-[20px]
            rounded-full
            border-[4px]
            transition-all duration-200
            flex items-center justify-center
            shadow-[0_0_10px_rgba(0,0,0,.08)]
            dark:shadow-[0_0_12px_rgba(0,0,0,.25)]
          "
          style={{
            borderColor: subtask.completed ? "#FD81B0" : "#FD81B0",
            background: subtask.completed ? "#FD81B0" : "#303153",
          }}
        >
          <div
            className={`
              rounded-full bg-white dark:bg-[#303153] transition-all duration-200
              ${
                subtask.completed
                  ? "w-[6px] h-[6px] opacity-100"
                  : "w-0 h-0 opacity-0"
              }
            `}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div
        className={`
          flex-1 flex items-center justify-between
          border-b border-[#FD81B0]/10 dark:border-[#FD81B0]/10
          pb-5
          transition-all duration-300
          ${subtask.completed ? "opacity-50" : ""}
        `}
      >
        <div className="min-w-0">
          <p
            className={`
              font-sniglet text-[14px] md:text-[15px]
              transition-all duration-300
              ${
                subtask.completed
                  ? "line-through text-[#75767f]"
                  : "text-[#303153] dark:text-white"
              }
            `}
          >
            {subtask.title}
          </p>
        </div>
      </div>
    </div>
  );
}
