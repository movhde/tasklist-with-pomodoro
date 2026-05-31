"use client";

import { useState } from "react";

import MobileStepOne from "./MobileStepOne";
import MobileStepTwo from "./MobileStepTwo";
import MobileStepThree from "./MobileStepThree";
import { AddTaskProps } from "../type";
import { ArrowLeft, X } from "lucide-react";

export default function MobileAddTaskForm({ onClose, ...props }: AddTaskProps) {
  const [step, setStep] = useState(1);

  function handleBack() {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="w-full py-4 px-2">
      <div className="w-full flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="flex h-11 w-11 bg-[#ffb6d32e] cursor-pointer items-center justify-center rounded-full border border-black/5 transition-all duration-200 hover:scale-105 hover:bg-[#ffb6d387] md:dark:bg-[#3A3C57] md:dark:hover:bg-[#4A4C69] dark:bg-[#3aaff869] dark:hover:bg-[#3aaff8aa]"
        >
          <ArrowLeft size={18} className="text-[#ea75a4] dark:text-white" />
        </button>
        <h1 className="text-[#252842] text-2xl font-sniglet font-bold text-center dark:text-white">
          Add new task
        </h1>
        <button
          onClick={onClose}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#ffb6d32e] border border-black/5 transition-all duration-200 hover:rotate-90 hover:scale-105 hover:bg-[#ffb6d387] md:dark:bg-[#3A3C57] md:dark:hover:bg-[#4A4C69] dark:bg-[#3aaff869] dark:hover:bg-[#3aaff8aa]"
        >
          <X size={18} className="text-[#ea75a4] dark:text-white" />
        </button>
      </div>

      {step === 1 && <MobileStepOne {...props} next={() => setStep(2)} />}

      {step === 2 && <MobileStepTwo {...props} next={() => setStep(3)} />}

      {step === 3 && <MobileStepThree {...props} />}
    </div>
  );
}
