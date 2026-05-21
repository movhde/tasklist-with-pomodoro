import { Button } from "@/app/components/Elements/Button";
import GuestButton from "@/app/components/Elements/GuestButton";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full flex lg:flex-row flex-col min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180 dark:from-0% dark:from-[#0F102A] dark:via-none dark:to-100% dark:to-[#999999] ">
      <div className="flex lg:hidden gap-1.5 items-center py-6 px-5 md:px-6">
        <Image
          src={"/images/logo.svg"}
          alt={"logo icon"}
          width={42}
          height={42}
        />
        <span className="font-sniglet tracking-widest text-black font-bold text-sm md:text-base dark:text-white">
          DailyWeb
        </span>
      </div>

      <section className="lg:flex-5 relative lg:h-auto lg:top-10 h-[60vh] overflow-hidden">
        <Image src={"/images/Timer.svg"} alt="timer image" fill />
      </section>

      <section className="-mt-40 lg:mt-0 grow bg-white py-6 px-14 rounded-t-[90px] lg:rounded-t-none lg:rounded-l-[90px] flex lg:block justify-center lg:flex-4 flex-col shadow-2xl dark:bg-[#32334B]">
        <div className="hidden lg:flex gap-1.5 items-center">
          <Image
            src={"/images/logo.svg"}
            alt={"logo icon"}
            width={50}
            height={50}
          />
          <span className="font-sniglet tracking-widest text-black font-bold text-base dark:text-white">
            DailyWeb
          </span>
        </div>

        <div className="flex flex-col justify-center h-full items-center w-full gap-14 lg:gap-16">
          <div className="flex flex-col items-center gap-5">
            <h1 className="font-sniglet tracking-wider text-2xl font-bold md:text-4xl xl:text-6xl text-[#303153] dark:text-white">
              Ready to focus?
            </h1>
            <p className="font-sniglet tracking-widest text-[#6F6F6F] font-bold text-sm md:text-base xl:text-xl dark:text-white">
              start with pomodoro routines
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 lg:gap-9 w-full">
            <div className="flex gap-6 lg:gap-16 w-full justify-center max-w-96">
              <Link href={"/login"} className="flex-1 focus:outline-none">
                <Button variant="primary">Log In</Button>
              </Link>
              <Link href={"/signup"} className="flex-1 focus:outline-none">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </div>
            <GuestButton />
          </div>
        </div>
      </section>
    </main>
  );
}

/////////////////////////////////////////////////////////

// "use client";

// import { useState } from "react";
// import EmptyState from "@/app/components/Tasks/EmptyState";

// export default function HomePage() {
//   const [tasks, setTasks] = useState([]); // فعلاً خالی

//   const handleAddTask = () => {
//     alert("باز کردن مودال افزودن تسک");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1E1F2E] dark:to-[#2A2B40]">
//       {/* کامپوننت EmptyState */}
//       <EmptyState onAddTask={handleAddTask} />
//     </div>
//   );
// }

///////////////////////////////

// import TaskTimelinePreview from "@/app/components/Tasks/TaskTimelinePreview";

// export default function HomePage() {
//   return <TaskTimelinePreview />;
// }
