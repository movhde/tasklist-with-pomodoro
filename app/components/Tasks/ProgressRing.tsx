interface Props {
  progress: number;
  completed?: boolean;
}

export default function ProgressRing({ progress, completed }: Props) {
  const radius = 18;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-[46px] h-[46px]">
      <svg width="46" height="46" className="-rotate-90">
        {/* background */}

        <circle
          cx="23"
          cy="23"
          r={radius}
          strokeWidth="4"
          className="stroke-[#E8EEF6] dark:stroke-[#40435C]"
          fill="transparent"
        />

        {/* progress */}

        <circle
          cx="23"
          cy="23"
          r={radius}
          strokeWidth="4"
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
        text-[10px] font-semibold
        text-[#303153] dark:text-white"
      >
        {completed ? "✓" : `${progress}%`}
      </div>
    </div>
  );
}
