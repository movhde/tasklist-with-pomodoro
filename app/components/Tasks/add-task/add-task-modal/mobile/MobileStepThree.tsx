import { AddTaskProps } from "../type";
import CalendarPicker from "@/app/components/ui/CalendarPicker";
import TaskSubtasksSection from "../../TaskSubtasksSection";
import ControlButton from "./ControlButton";

export default function MobileStepTwo({
  description,
  setDescription,
  subtasks,
  setSubtasks,
  next,
  handleCreateTask,
}: AddTaskProps) {
  return (
    <div className="flex min-h-105 flex-col gap-7">
      <div className="flex-1 flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#252842] text-xl font-sniglet font-semibold dark:text-white">
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
      </div>

      <div className="w-full flex justify-center items-center">
        <ControlButton buttonName="Finish" onClick={handleCreateTask} />
      </div>
    </div>
  );
}
