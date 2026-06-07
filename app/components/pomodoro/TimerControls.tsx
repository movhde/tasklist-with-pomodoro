import Image from "next/image";

interface TimerControlsProps {
  isRunning: boolean;
  showSettings: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex justify-center gap-10">
      <button
        onClick={onReset}
        className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#3D3E57] border border-[#F3FBFE] dark:border-none font-semibold rounded-full cursor-pointer hover:scale-105 transition-all duration-300 dark:shadow-[0px_0px_22.5px_0px_#000000DB] shadow-[5px_5px_8px_0px_#DBF2FC,_-2px_-2px_16px_0px_#E5F6FE]"
      >
        <Image
          width={20}
          height={20}
          src={"/icons/stop-icon.svg"}
          alt="play icon"
        />
      </button>
      <button
        onClick={onStart}
        className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#3D3E57] border border-[#F3FBFE] dark:border-none font-semibold rounded-full cursor-pointer hover:scale-105 transition-all duration-300 dark:shadow-[0px_0px_22.5px_0px_#000000DB] shadow-[5px_5px_8px_0px_#DBF2FC,_-2px_-2px_16px_0px_#E5F6FE]"
      >
        <Image
          width={20}
          height={20}
          src={"/icons/play-icon.svg"}
          alt="stop icon"
        />
      </button>

      <button
        onClick={onPause}
        className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#3D3E57] border border-[#F3FBFE] dark:border-none  font-semibold rounded-full cursor-pointer hover:scale-105 transition-all duration-300 dark:shadow-[0px_0px_22.5px_0px_#000000DB] shadow-[5px_5px_8px_0px_#DBF2FC,_-2px_-2px_16px_0px_#E5F6FE]"
      >
        <Image
          width={20}
          height={20}
          src={"/icons/pause-icon.svg"}
          alt="pause icon"
        />
      </button>
    </div>
  );
}
