import Image from "next/image";
import LoginForm from "./LoginForm";

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

        <section className="flex flex-col gap-5 items-center">
          <h1 className="text-[#303153] text-4xl md:text-6xl font-bold">
            Welcome Back!
          </h1>
          <p className="text-[#282727] text-base md:text-2xl font-bold">
            sign in with your details
          </p>
        </section>

        <LoginForm />
      </div>
    </main>
  );
}
