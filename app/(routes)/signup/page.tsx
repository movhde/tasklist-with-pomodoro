import Image from "next/image";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <main
      className="w-full"
      style={{
        background:
          "linear-gradient(160.91deg, #FFF1E6 12.3%, #E5CBEB 64.83%, #FCC7E3 124.86%)",
      }}
    >
      <div className="flex flex-col min-h-screen">
        <section className="flex gap-1.5 items-center py-6 px-5 md:py-6 md:px-12">
          <Image
            src={"/images/logo.svg"}
            alt={"logo icon"}
            width={42}
            height={42}
          />
          <span className="text-black font-bold text-sm md:text-base">
            DailyWeb
          </span>
        </section>

        <div className="flex flex-col flex-1 justify-center p-8 gap-5 md:gap-20">
          <section className="flex flex-col gap-4 md:gap-8 items-center">
            <h1 className="text-[#303153] text-3xl md:text-4xl lg:text-6xl font-bold text-center">
              Create your account
            </h1>
            <span className="text-[#282727] text-base md:text-2xl font-bold">
              Almost there!
            </span>
          </section>

          <SignupForm />
        </div>
      </div>
    </main>
  );
}
