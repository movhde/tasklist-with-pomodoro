import Image from "next/image";

interface Props {
  task: any;
  completed?: boolean;
}

export default function TaskCard({ task, completed }: Props) {
  return (
    <div
      className={`w-full font-sniglet h-[56px] md:h-[64px] rounded-[15px] border-[2px] flex items-center justify-between px-3 md:px-4 transition-all duration-500 cursor-pointer hover:-translate-y-[1px]
         ${completed ? "bg-[#ECECEC] dark:bg-[#3A3B57] border-[#D9D9D9] dark:border-[#4D4E68] opacity-70" : "bg-white dark:bg-[#31304A] border-[#59B7FF] hover:shadow-[0_0_15px_5px_rgba(89,183,255,0.18)] dark:hover:shadow-[0_0_18px_#00000040]"}`}
    >
      {/* left */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <h3
          className={`tracking-wider font-semibold truncate text-[12px] md:text-[14px] 
            ${completed ? "line-through text-[#8A8A8A]  dark:text-[#B7B7C9]" : "text-black dark:text-white"}`}
        >
          {task.title}
        </h3>
        <p className="mt-[2px] truncate text-[10px] md:text-[12px] text-gray-500 dark:text-[#C6C7D2]">
          {task.description || "No description"}
        </p>
      </div>

      {/* right */}
      <div className="ml-3 flex items-center gap-2 md:gap-3 shrink-0">
        <div className="w-px h-[28px] md:h-[40px] bg-[#59B7FF]" />
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/icons/clock.svg"
            alt="clock"
            width={18}
            height={18}
            className="w-[16px] md:w-[20px] h-auto dark:[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(29%)_saturate(1464%)_hue-rotate(291deg)]"
          />
          <span className="mt-[2px] text-[8px] md:text-[10px] text-gray-500 dark:text-[#D0D1DC]">
            30 min
          </span>
        </div>
      </div>
    </div>
  );
}
