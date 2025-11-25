import { Checkbox } from "@/components/ui/checkbox";
import { Circle, CheckCircle2 } from "lucide-react";

interface TaskListProps {
  tasks: string[];
  completedTasks: string[];
  onToggleTask: (task: string) => void;
  disabled?: boolean;
}

export function TaskList({ tasks, completedTasks, onToggleTask, disabled = false }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => {
        const isCompleted = completedTasks.includes(task);
        
        return (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover-elevate transition-all min-h-[44px]"
            data-testid={`task-item-${index}`}
          >
            <Checkbox
              id={`task-${index}`}
              checked={isCompleted}
              onCheckedChange={() => onToggleTask(task)}
              disabled={disabled}
              className="mt-1"
              data-testid={`checkbox-task-${index}`}
            />
            <label
              htmlFor={`task-${index}`}
              className={`flex-1 text-sm leading-relaxed cursor-pointer ${
                isCompleted ? "line-through text-muted-foreground" : "text-foreground"
              }`}
              data-testid={`label-task-${index}`}
            >
              {task}
            </label>
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
