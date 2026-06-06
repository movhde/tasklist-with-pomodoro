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
        className="w-14 h-14 flex items-center justify-center bg-white border border-[#F3FBFE]  font-semibold rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
        style={{
          boxShadow: "5px 5px 8px 0px #DBF2FC ,-2px -2px 16px 0px #E5F6FE",
        }}
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
        className="w-14 h-14 flex items-center justify-center bg-white border border-[#F3FBFE]  font-semibold rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
        style={{
          boxShadow: "5px 5px 8px 0px #DBF2FC ,-2px -2px 16px 0px #E5F6FE",
        }}
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
        className="w-14 h-14 flex items-center justify-center bg-white border border-[#F3FBFE]  font-semibold rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
        style={{
          boxShadow: "5px 5px 8px 0px #DBF2FC ,-2px -2px 16px 0px #E5F6FE",
        }}
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
