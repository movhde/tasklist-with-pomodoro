import SubTaskItem from "./SubTaskItem";

interface Props {
  subtasks: any[];

  onToggle: (subtaskId: string) => void;
}

export default function SubTaskTimeline({ subtasks, onToggle }: Props) {
  return (
    <div className="px-10   pb-5 pt-1">
      {subtasks.map((item, index) => (
        <SubTaskItem
          key={item.id}
          subtask={item}
          isLast={index === subtasks.length - 1}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}
