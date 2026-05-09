import { Button } from "@/app/components/Elements/Button";
import Image from "next/image";
import Link from "next/link";

export default function SignupSuccess() {
  return (
    <main className="w-full bg-linear-[160deg] from-10% from-[#FFF1E6] via-65% via-[#E5CBEB] to-125% to-[#FCC7E3] dark:bg-linear-180 dark:from-0% dark:from-[#34354D] dark:via-none dark:to-100% dark:to-[#9395C1]">
      <div className="relative w-full min-h-screen flex flex-col gap-12 md:gap-0">
        <section className="flex gap-1.5 items-center py-6 px-5 md:py-6 md:px-12">
          <Image
            src={"/images/logo.svg"}
            alt={"logo icon"}
            width={42}
            height={42}
          />
          <span className="text-black font-bold text-sm md:text-base dark:text-white">
            DailyWeb
          </span>
        </section>

        <section className="flex flex-col gap-4 md:gap-18 items-center w-full -mb-52 md:-mb-40">
          <h1 className="text-[#303153] text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white">
            Success!
          </h1>
          <div className="relative w-full max-w-md h-64 md:h-96 z-10">
            <Image
              src="/images/Timer2.svg"
              alt="timer image"
              fill
              className="object-contain"
            />
          </div>
        </section>

        <section className="flex-1 py-12 w-full px-4 flex flex-col items-center justify-center md:justify-center gap-8 bg-[#FEFEFE] rounded-t-[100%_30%] md:rounded-t-[50%_100%] drop-shadow-2xl dark:bg-[#32334B]">
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="text-black font-bold text-base sm:text-xl lg:text-2xl space dark:text-white">
              You are all set.
            </span>
            <span className="text-black font-bold text-base sm:text-xl md:text-2xl dark:text-white">
              Let us start your routines.
            </span>
            <span className="text-[#6F6F6F] font-bold text-base sm:text-xl md:text-2xl dark:text-[#9F9F9F]">
              Account created Successfully🙂
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <Button variant="gradient" className="max-w-xs">
              Go to dashboard
            </Button>
            <Link
              href={"/login"}
              className="text-[#6F6F6F] text-base md:text-xl font-bold dark:text-white"
            >
              Back to Log in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
