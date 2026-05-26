import TaskTimeline from "../Tasks/TaskTimeline";

interface Props {
  title: string;
  subtitle?: string;
  categoryId?: string;
  date?: string;
}

export default function TasksSection({
  title,
  subtitle,
  categoryId,
  date,
}: Props) {
  return (
    <div className="mt-5">
      <h1 className="font-sniglet font-bold  text-2xl md:text-4xl text-[#303153] dark:text-white">
        {title}
      </h1>

      {subtitle && (
        <p className=" font-sniglet text-md text-gray-500 dark:text-[#C6C7D2]">
          {subtitle}
        </p>
      )}

      <div className="mt-4">
        <TaskTimeline categoryId={categoryId} date={date} />
      </div>
    </div>
  );
}
