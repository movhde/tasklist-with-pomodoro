import LoginForm from "./LoginForm";
import Header from "@/app/components/Layout/Header";

export default function LoginPage() {
  return (
    <main className="w-full bg-linear-[160deg] from-10% from-[#FFD8EA] via-35% via-[#E7E3FE] to-60% to-[#CCECFB] dark:bg-linear-[168deg] dark:from-5% dark:from-[#32334B] dark:via-none dark:to-80% dark:to-[#9496C2]">
      <div className="flex min-h-screen flex-col gap-24">
        <Header />

        <section className="flex flex-col gap-5 items-center font-sniglet tracking-wider">
          <h1 className="text-[#303153] text-4xl md:text-6xl font-extrabold dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-[#282727] text-base md:text-2xl font-bold dark:text-white">
            sign in with your details
          </p>
        </section>

        <LoginForm />
      </div>
    </main>
  );
}
