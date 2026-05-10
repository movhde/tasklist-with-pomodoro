"use client";

import { Button } from "@/app/components/Elements/Button";
import { Input } from "@/app/components/Elements/Input";
import { useAuth } from "@/hooks/useAuth";
import { SignupFormData, signupSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const { signup, error } = useAuth();

  const onSubmit = (data: SignupFormData) => signup(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-11 justify-center max-w-6xl w-full bg-[#FEFEFE] rounded-4xl md:rounded-[90px] p-6 md:p-7 mx-auto drop-shadow-2xl dark:bg-[#32334B]"
    >
      <div className="sm:max-w-md w-full flex flex-col gap-4 md:gap-7">
        <Input
          type="text"
          placeholder="Email"
          aria-label="Email"
          className="border border-[#EFEFEF] bg-white"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          aria-label="Password"
          className="border border-[#EFEFEF] bg-white"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          aria-label="Confirm password"
          className="border border-[#EFEFEF] bg-white"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        {error && <p className="ml-2 -mt-6 text-red-500 text-sm">{error}</p>}
      </div>
      <div className="w-full flex flex-col items-center gap-6">
        <Button
          type="submit"
          variant="secondary"
          className="sm:max-w-64 drop-shadow-[-2px_6px_6px_#45CAB440]"
        >
          Sign Up
        </Button>
        <label className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 md:w-5 md:h-5 rounded-md outline-none"
          />
          <span className="text-[#6F6F6F] text-sm md:text-base font-bold dark:text-white">
            I agree to the terms
          </span>
        </label>
      </div>
    </form>
  );
}
