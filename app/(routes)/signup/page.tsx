import Button from "@/app/components/Elements/Button";
import Image from "next/image";

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

          <section className="flex flex-col items-center gap-11 justify-center max-w-6xl w-full bg-[#FEFEFE] rounded-4xl md:rounded-[90px] p-6 md:p-7 mx-auto drop-shadow-2xl">
            <div className="max-w-md w-full flex flex-col gap-4 md:gap-7">
              <input
                type="text"
                placeholder="Username"
                aria-label="text"
                className="w-full py-3 px-4 md:py-4 md:px-6 placeholder:text-[#726D6D] text-[#2A2A34] bg-[#FEFEFE] border-4 border-[#EFEFEF] rounded-4xl text-sm md:text-xl outline-none focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                className="w-full py-3 px-4 md:py-4 md:px-6 placeholder:text-[#726D6D] text-[#2A2A34] bg-[#FEFEFE] border-4 border-[#EFEFEF] rounded-4xl text-sm md:text-xl outline-none focus:outline-none"
              />
              <input
                type="password"
                placeholder="Repeat password"
                aria-label="Repeat password"
                className="w-full py-3 px-4 md:py-4 md:px-6 placeholder:text-[#726D6D] text-[#2A2A34] bg-[#FEFEFE] border-4 border-[#EFEFEF] rounded-4xl text-sm md:text-xl outline-none focus:outline-none"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-6">
              <Button
                href=""
                variant="secondary"
                className="w-full max-w-64 drop-shadow-[-2px_6px_6px_#45CAB440]"
              >
                Sign Up
              </Button>
              <label className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 md:w-5 md:h-5 rounded-md"
                />
                <span className="text-[#6F6F6F] text-sm md:text-base font-bold">
                  I agree to the terms
                </span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
