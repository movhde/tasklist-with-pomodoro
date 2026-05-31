import { Check } from "lucide-react";

interface Props {
  progress: number;
  completed?: boolean;
}

export default function ProgressRing({ progress, completed }: Props) {
  const radius = 14; // افزایش به 14

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 46 46"
        className="-rotate-90"
      >
        {/* background */}
        <circle
          cx="23"
          cy="23"
          r={radius}
          strokeWidth="3.5"
          className="stroke-[#E8EEF6] dark:stroke-[#40435C]"
          fill="transparent"
        />

        {/* progress */}
        <circle
          cx="23"
          cy="23"
          r={radius}
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
          className={`${
            completed
              ? "stroke-[#FD81B0]"
              : "stroke-[#59B7FF] dark:stroke-[#FD81B0]"
          }`}
        />
      </svg>

      <div
        className="absolute inset-0
        flex items-center justify-center
        text-[10px] sm:text-[11px] font-semibold
        text-[#303153] dark:text-white"
      >
        {completed ? (
          <Check
            size={12}
            className="sm:w-[14px] sm:h-[14px] text-[#59B7FF] dark:text-[#FD81B0]"
          />
        ) : (
          `${progress}%`
        )}
      </div>
    </div>
  );
}
