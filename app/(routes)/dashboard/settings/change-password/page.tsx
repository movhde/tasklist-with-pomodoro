"use client";

import { MainLayout } from "@/app/components/dashboard/MainLayout";
import ModalInput from "@/app/components/ui/modal-input";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/hooks/useUser";
import { Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      await axiosInstance.post("/api/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password updated");
      router.push("/dashboard/settings");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Could not update password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout email={user?.email}>
      <div className="w-full max-w-[760px]">
        <section className="w-full rounded-[40px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:bg-[#32334B] sm:p-10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-[#303153] hover:underline dark:text-white"
            >
              <ArrowLeft size={22} className="text-[#59B7FF]" />
            </button>
          </div>

          <div className="mt-6">
            <h1 className="text-[28px] font-bold text-[#2A2A34] dark:text-white sm:text-[34px]">
              Change password
            </h1>
            <p className="mt-1 text-[14px] text-[#9B9B9B]">
              Enter your current password and set a new one.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <ModalInput
              icon={Lock}
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <ModalInput
              icon={Lock}
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ModalInput
              icon={Lock}
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-[18px] bg-[#59B7FF] py-3 text-[14px] font-semibold text-white transition hover:bg-[#3AAFF8] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </section>
      </div>
    </MainLayout>
  );
}
