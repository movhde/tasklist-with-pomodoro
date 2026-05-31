import TaskTimeline from "../Tasks/task-group/TaskTimeline";
import MobileTaskFilter from "./MobileTaskFilter";

interface Props {
  title: string;
  subtitle?: string;
  categoryId?: string;
  date?: string;
  onMobileFilter?: (mode: "all" | "today") => void;
  onAddTask: () => void;
}

export default function TasksSection({
  title,
  subtitle,
  categoryId,
  date,
  onMobileFilter,
  onAddTask,
}: Props) {
  return (
    <div className="mt-5 mb-22 lg:mb-0 flex flex-col items-start">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-sniglet font-bold text-2xl md:text-4xl text-[#303153] dark:text-white">
          {title}
        </h1>

        <MobileTaskFilter onChange={(mode) => onMobileFilter?.(mode)} />
      </div>

      {subtitle && (
        <p className="font-sniglet pl-2 text-md text-gray-500 dark:text-[#C6C7D2] text-right">
          {subtitle}
        </p>
      )}

      <div className="mt-4 md:mt-8 w-full">
        <TaskTimeline
          categoryId={categoryId}
          date={date}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  );
}
