import CalendarPicker from "@/app/components/ui/CalendarPicker";
import { AddTaskProps } from "../type";
import TimePicker from "@/app/components/ui/time-picker";
import ControlButton from "./ControlButton";

export default function MobileStepTwo({
  estimatedDuration,
  setEstimatedDuration,
  dueDate,
  setDueDate,
  next,
  handleCreateTask,
}: AddTaskProps) {
  return (
    <div className="flex  min-h-105 flex-col gap-7">
      <div className="flex-1 flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <label className="text-[#252842] text-xl font-sniglet font-semibold dark:text-white">
            Due date
          </label>
          <CalendarPicker value={dueDate} onChange={setDueDate} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252842] text-xl font-sniglet font-semibold dark:text-white">
            Focus time
          </label>
          <TimePicker
            value={estimatedDuration}
            onChange={setEstimatedDuration}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-8">
        <ControlButton buttonName="Next" onClick={next} />
        <ControlButton buttonName="Finish" onClick={handleCreateTask} />
      </div>
    </div>
  );
}
