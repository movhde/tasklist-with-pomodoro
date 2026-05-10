"use client";

import { Button } from "@/app/components/Elements/Button";
import { Input } from "@/app/components/Elements/Input";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { login, error } = useAuth();

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex-1 flex flex-col gap-9 items-center justify-center p-6  bg-white drop-shadow-2xl rounded-t-4xl md:rounded-t-[90px] dark:bg-[#32334B]"
    >
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5 md:gap-10">
        <Input
          type="text"
          placeholder="Email"
          aria-label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          aria-label="Password"
          error={errors.password?.message}
          {...register("password")}
        />
        {error && <p className="ml-2 -mt-8 text-red-500 text-sm">{error}</p>}
      </div>

      <div className="w-full flex flex-col gap-6 items-center">
        <Link
          href={""}
          className="text-[#787878] font-bold text-base md:text-xl outline-none hover:text-[#565656] dark:text-white"
        >
          Forget password?
        </Link>
        <Button
          type="submit"
          variant="lightPrimary"
          className="sm:max-w-xs text-black drop-shadow-[-2px_6px_6px_#F77FCB40]"
        >
          Log In
        </Button>
      </div>

      <div>
        <Link
          className="text-[#6F6F6F] text-sm md:text-base font-bold outline-none hover:text-[#565656] dark:text-white"
          href={""}
        >
          Continue as guest
        </Link>
      </div>
    </form>
  );
}
