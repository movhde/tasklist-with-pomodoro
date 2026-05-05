import Button from "@/app/components/Elements/Button";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main
      className="w-full"
      style={{
        background:
          "linear-gradient(160.91deg, #FFD8EA 12.3%, #E7E3FE 36.34%, #CCECFB 57.9%)",
      }}
    >
      <div className="flex min-h-screen flex-col gap-24">
        <section className="flex gap-1.5 items-center py-6 px-12">
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

        <section className="flex flex-col gap-5 items-center">
          <h1 className="text-[#303153] text-4xl md:text-6xl font-bold">
            Welcome Back!
          </h1>
          <p className="text-[#282727] text-base md:text-2xl font-bold">
            sign in with your details
          </p>
        </section>

        <section className="w-full flex-1 flex flex-col gap-9 items-center justify-center p-6  bg-white drop-shadow-2xl rounded-t-4xl md:rounded-t-[90px]">
          <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5 md:gap-10">
            <input
              type="text"
              placeholder="Email"
              aria-label="Email"
              className="w-full py-4 px-6 placeholder:text-[#2A2A34] text-[#2A2A34] bg-[#F6F6F8] rounded-4xl text-base md:text-xl outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              className="w-full py-4 px-6 placeholder:text-[#2A2A34] text-[#2A2A34] bg-[#F6F6F8] rounded-4xl text-base md:text-xl outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex flex-col gap-6 items-center">
            <Link
              href={""}
              className="text-[#787878] font-bold text-base md:text-xl outline-none hover:text-[#565656]"
            >
              Forget password?
            </Link>
            <Button
              href=""
              variant="lightPrimary"
              textColor="black"
              className="w-full md:max-w-xs drop-shadow-[-2px_6px_6px_#F77FCB40]"
            >
              Log In
            </Button>
          </div>

          <div>
            <Link
              className="text-[#6F6F6F] text-sm md:text-base font-bold outline-none hover:text-[#565656]"
              href={""}
            >
              Continue as guest
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
