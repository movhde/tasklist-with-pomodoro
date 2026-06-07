import { CircularProgress } from "./CircularProgress";
import { formatTime } from "@/utils/time";

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
}

export function TimerDisplay({ timeLeft, totalTime }: TimerDisplayProps) {
  return (
    <div
      className="rounded-full w-80 h-80 bg-white flex justify-center items-center"
      style={{
        boxShadow: "5px 5px 16px 0px #57A2F7 , -5px -5px 16px 0px #E0F4FD",
      }}
    >
      <div
        className="rounded-full w-44 h-44 bg-white flex justify-center items-center"
        style={{
          boxShadow: "5px 5px 16px 0px #57A2F7 , -5px -5px 16px 0px #E0F4FD",
        }}
      >
        <CircularProgress
          timeLeft={timeLeft}
          totalTime={totalTime}
          size={290}
          strokeWidth={35}
        >
          <span className="text-[#FD81B0] text-6xl font-bold font-sniglet">
            {formatTime(timeLeft)}
          </span>
        </CircularProgress>
      </div>
    </div>
  );
}
