"use client";

interface Props {
  selected?: string;
  onChange: (date: string) => void;
}

function formatLocalDate(date: Date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function WeekCalendar({ selected, onChange }: Props) {
  const today = new Date();

  const start = new Date(today);

  start.setDate(today.getDate() - today.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);

    d.setDate(start.getDate() + i);

    return d;
  });

  return (
    <div className="mt-3 md:mt-1 py-1 md:py-2 pr-0 md:pr-5 rounded-[22px] md:rounded-[28px]">
      <div className="grid grid-cols-7 gap-2 md:hidden py-3">
        {days.map((day) => {
          const value = formatLocalDate(day);

          const active = selected === value;

          return (
            <button
              key={value}
              onClick={() => {
                if (selected === value) {
                  onChange("");
                  return;
                }

                onChange(value);
              }}
              className={`
                w-full
                h-[49px]
                cursor-pointer
                rounded-[14px]
                border transition-all duration-200
                flex flex-col items-center justify-center
                ${
                  active
                    ? "bg-white dark:bg-[#32334B] border-[#59B7FF] shadow-[0_0_12px_rgba(89,190,255,.35)] dark:shadow-[0_0_18px_#00000040]"
                    : "bg-white dark:bg-[#32334B] border-[#59B7FF]/60 hover:shadow-[0_0_10px_rgba(89,183,255,.18)] dark:hover:shadow-[0_0_14px_#00000030]"
                }
              `}
            >
              <div
                className={`text-[13px] font-sniglet font-bold ${
                  active
                    ? "text-[#303153] dark:text-white"
                    : "text-[#303153] dark:text-[#F4F4F5]"
                }`}
              >
                {day.toLocaleDateString("en", {
                  weekday: "short",
                })}
              </div>

              <div
                className={`text-[12px] font-sniglet font-semibold ${
                  active
                    ? "text-[#605C5C] dark:text-[#D7D8E2]"
                    : "text-[#605C5C] dark:text-[#BFC2D3]"
                }`}
              >
                {day.getDate()}
              </div>
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex gap-2 md:gap-3 overflow-x-auto py-3 md:py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {days.map((day) => {
          const value = formatLocalDate(day);

          const active = selected === value;

          return (
            <button
              key={value}
              onClick={() => {
                if (selected === value) {
                  onChange("");
                  return;
                }

                onChange(value);
              }}
              className={`
                w-[39px] sm:w-[78px] sm:h-[68px]
                h-[49px]
                cursor-pointer
                shrink-0
                rounded-[14px] md:rounded-[18px]
                border transition-all duration-200
                flex flex-col items-center justify-center
                ${
                  active
                    ? "bg-white dark:bg-[#32334B] border-[#59B7FF] shadow-[0_0_12px_rgba(89,190,255,.35)] dark:shadow-[0_0_18px_#00000040]"
                    : "bg-white dark:bg-[#32334B] border-[#59B7FF]/60 hover:shadow-[0_0_10px_rgba(89,183,255,.18)] dark:hover:shadow-[0_0_14px_#00000030]"
                }
              `}
            >
              <div
                className={`text-[13px] font-sniglet sm:text-xl xl:text-[22px] font-bold ${
                  active
                    ? "text-[#303153] dark:text-white"
                    : "text-[#303153] dark:text-[#F4F4F5]"
                }`}
              >
                {day.toLocaleDateString("en", {
                  weekday: "short",
                })}
              </div>

              <div
                className={`text-[12px] font-sniglet sm:text-base md:text-[18px] font-semibold ${
                  active
                    ? "text-[#605C5C] dark:text-[#D7D8E2]"
                    : "text-[#605C5C] dark:text-[#BFC2D3]"
                }`}
              >
                {day.getDate()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
