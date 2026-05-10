import Image from "next/image";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <main className="w-full bg-linear-[160deg] from-10% from-[#FFF1E6] via-65% via-[#E5CBEB] to-125% to-[#FCC7E3] dark:bg-linear-180 dark:from-0% dark:from-[#34354D] dark:via-none dark:to-100% dark:to-[#9395C1]">
      <div className="flex flex-col min-h-screen">
        <section className="flex gap-1.5 items-center py-6 px-5 md:py-6 md:px-12">
          <Image
            src={"/images/logo.svg"}
            alt={"logo icon"}
            width={42}
            height={42}
          />
          <span className="text-black font-sniglet tracking-widest font-bold text-sm md:text-base dark:text-white">
            DailyWeb
          </span>
        </section>

        <div className="flex flex-col flex-1 justify-center p-8 gap-5 md:gap-20">
          <section className="flex flex-col gap-4 md:gap-8 items-center font-sniglet tracking-wider">
            <h1 className="text-[#303153] text-3xl md:text-4xl lg:text-6xl font-bold text-center dark:text-white">
              Create your account
            </h1>
            <span className="text-[#282727] text-base md:text-2xl font-bold dark:text-white">
              Almost there!
            </span>
          </section>

          <SignupForm />
        </div>
      </div>
    </main>
  );
}
