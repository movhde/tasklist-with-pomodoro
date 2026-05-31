import { AddTaskProps } from "../type";
import CalendarPicker from "@/app/components/ui/CalendarPicker";
import TaskSubtasksSection from "../../TaskSubtasksSection";

export default function MobileStepTwo({
  description,
  setDescription,
  subtasks,
  setSubtasks,
  next,
  handleCreateTask,
}: AddTaskProps) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h2 className="text-[#252842] text-xl font-sniglet font-semibold ">
          Description
        </h2>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Not essential"
          className="w-full p-2 font-sniglet resize-none bg-transparent text-[15px] text-[#303153] border border-[#3AAFF8] rounded-[14px] outline-none placeholder:text-[#9EA3B5] dark:text-white"
        />
      </div>
      <div className="flex flex-col gap-2">
        <TaskSubtasksSection subtasks={subtasks} setSubtasks={setSubtasks} />
      </div>

      <div className="w-full flex justify-center items-center">
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
