import Button from "@/app/components/Elements/Button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="w-full flex lg:flex-row flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(160.91deg, #FFF1E6 18.83%, #F3E6FA 36.34%, #C9B1F6 124.86%",
      }}
    >
      <div className="flex lg:hidden gap-1.5 items-center py-6 px-5 md:px-6">
        <Image
          src={"/images/logo.svg"}
          alt={"logo icon"}
          width={42}
          height={42}
        />
        <span className="text-black font-bold text-sm md:text-base">
          DailyWeb
        </span>
      </div>

      <section className="lg:flex-5 relative lg:h-auto lg:top-10 h-[60vh] overflow-hidden">
        <Image src={"/images/Timer.svg"} alt="timer image" fill />
      </section>

      <section className="-mt-40 lg:mt-0 grow bg-white py-6 px-14 rounded-t-[90px] lg:rounded-t-none lg:rounded-l-[90px] flex lg:block justify-center lg:flex-4 flex-col shadow-2xl">
        <div className="hidden lg:flex gap-1.5 items-center">
          <Image
            src={"/images/logo.svg"}
            alt={"logo icon"}
            width={50}
            height={50}
          />
          <span className="text-black font-bold text-base">DailyWeb</span>
        </div>

        <div className="flex flex-col justify-center h-full items-center w-full gap-14 lg:gap-16">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-2xl font-bold md:text-4xl text-[#303153]">
              Ready to focus?
            </h1>
            <p className="text-[#6F6F6F] font-bold text-sm md:text-base">
              start with pomodoro routines
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 lg:gap-9 w-full">
            <div className="flex gap-6 lg:gap-16 w-full justify-center max-w-96">
              <Button href={"/login"} variant="primary">
                Log In
              </Button>
              <Button href={"/signup"} variant="secondary">
                Sign Up
              </Button>
            </div>
            <Link
              className="outline-none text-[#6F6F6F] text-sm md:text-base font-bold hover:text-[#565656]"
              href={""}
            >
              continue as guest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
