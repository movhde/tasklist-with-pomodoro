"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SignOutConfirmModal({
  open,
  loading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[4px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] sm:rounded-[32px] border border-white/10 bg-white p-5 sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,.15)] dark:bg-[#31304A]"
          >
            <div className="flex flex-col items-center text-center font-sniglet">
              <div className="mb-4 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#FD81B0]/10">
                <LogOut
                  size={24}
                  className="sm:w-[28px] sm:h-[28px] text-[#FD81B0]"
                />
              </div>

              <h3 className="text-[20px] sm:text-[22px] font-sniglet font-semibold text-[#252842] dark:text-white">
                Sign out?
              </h3>

              <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] font-sniglet text-[#7B8096] dark:text-[#BFC3D4]">
                You can sign in again any time.
              </p>

              <div className="mt-6 sm:mt-7 flex w-full gap-2.5 sm:gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 cursor-pointer rounded-[16px] font-sniglet sm:rounded-[18px] border border-black/5 bg-[#F4F7FB] py-2.5 sm:py-3 text-[14px] sm:text-[15px] text-[#303153] transition-all hover:bg-[#EAEFF5] dark:bg-[#3A3C57] dark:text-white dark:hover:bg-[#43456B]"
                >
                  No
                </button>

                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="flex-1 cursor-pointer rounded-[16px] font-sniglet sm:rounded-[18px] bg-[#FD81B0] py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-white transition-all hover:scale-[1.02] hover:bg-[#FD6BA0] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing out..." : "Yes"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

