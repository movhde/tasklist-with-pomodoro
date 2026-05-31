"use client";

import { useState } from "react";

import MobileStepOne from "./MobileStepOne";
import MobileStepTwo from "./MobileStepTwo";
import MobileStepThree from "./MobileStepThree";

export default function MobileAddTaskForm(props: any) {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full p-2">
      <h1 className="text-[#252842] text-2xl font-sniglet font-bold text-center mb-4">
        Add new task
      </h1>
      {step === 1 && <MobileStepOne {...props} next={() => setStep(2)} />}

      {step === 2 && (
        <MobileStepTwo
          {...props}
          back={() => setStep(1)}
          next={() => setStep(3)}
        />
      )}

      {step === 3 && <MobileStepThree {...props} back={() => setStep(2)} />}
    </div>
  );
}
