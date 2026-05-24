"use client";

export default function AppLoader() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-10">
          <div className="h-5 w-5 rounded-full bg-[#bbd0ec] dark:bg-[#393851]" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-full md:w-[30%] rounded-full bg-[#bbd0ec] dark:bg-[#393851]" />
            <div className="h-4 w-full md:w-[70%] rounded-full bg-[#bbd0ec] dark:bg-[#393851]" />
          </div>
        </div>
      ))}
    </div>
  );
}
