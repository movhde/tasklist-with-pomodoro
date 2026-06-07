import { CircularProgress } from "./CircularProgress";
import { formatTime } from "@/utils/time";

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
}

export function TimerDisplay({ timeLeft, totalTime }: TimerDisplayProps) {
  return (
    <div className="rounded-full w-80 h-80 bg-white dark:bg-[#3D3E57] flex justify-center items-center shadow-[5px_5px_16px_0px_#57A2F7,_-5px_-5px_16px_0px_#E0F4FD] dark:shadow-[5px_5px_16px_0px_#000000,_-5px_-5px_16px_0px_#FEFEFE]">
      <div className="rounded-full w-44 h-44 bg-white dark:bg-[#3D3E57] flex justify-center items-center shadow-[5px_5px_16px_0px_#57A2F7,_-5px_-5px_16px_0px_#E0F4FD] dark:shadow-[5px_5px_16px_0px_#000000,_-5px_-5px_16px_0px_#FEFEFE]">
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
