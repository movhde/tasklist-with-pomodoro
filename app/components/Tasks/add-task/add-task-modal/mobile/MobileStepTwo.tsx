import CalendarPicker from "@/app/components/ui/CalendarPicker";
import { AddTaskProps } from "../type";
import TimePicker from "@/app/components/ui/time-picker";

export default function MobileStepTwo({
  estimatedDuration,
  setEstimatedDuration,
  dueDate,
  setDueDate,
  next,
  handleCreateTask,
}: AddTaskProps) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <label className="text-[#252842] text-xl font-sniglet font-semibold">
          Due date
        </label>
        <CalendarPicker value={dueDate} onChange={setDueDate} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#252842] text-xl font-sniglet font-semibold">
          Focus time
        </label>
        <TimePicker value={estimatedDuration} onChange={setEstimatedDuration} />
      </div>

      <div className="w-full flex justify-center items-center gap-8">
        <button
          onClick={next}
          className="mt-6 mb-10 w-full max-w-1/2 font-sniglet font-semibold text-xl bg-white border-2 border-[#FFB6D3] text-[#303153] p-2 rounded-[30px] drop-shadow-[2px_2px_6px_#F5B9D1]"
        >
          Next
        </button>
        <button
          onClick={handleCreateTask}
          className="mt-6 mb-10 w-full max-w-1/2 font-sniglet font-semibold text-xl bg-white border-2 border-[#FFB6D3] text-[#303153] p-2 rounded-[30px] drop-shadow-[2px_2px_6px_#F5B9D1]"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
