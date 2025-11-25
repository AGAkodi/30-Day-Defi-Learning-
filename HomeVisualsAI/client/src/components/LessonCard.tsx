import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { DailyLesson, UserProgress } from "@shared/schema";

interface LessonCardProps {
  lesson: DailyLesson;
  progress?: UserProgress;
  compact?: boolean;
}

export function LessonCard({ lesson, progress, compact = false }: LessonCardProps) {
  const isCompleted = progress?.completed || false;
  const completedTasksCount = progress?.completedTasks?.length || 0;
  const totalTasks = lesson.tasks.length;

  return (
    <Card 
      className="bg-card border-l-4 border-l-primary hover-elevate transition-all"
      data-testid={`card-lesson-${lesson.dayNumber}`}
    >
      <div className="p-6 md:p-8 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge 
                variant="default" 
                className="bg-primary text-primary-foreground"
                data-testid={`badge-day-${lesson.dayNumber}`}
              >
                Day {lesson.dayNumber}
              </Badge>
              <Badge 
                variant="secondary"
                data-testid={`badge-week-${lesson.weekNumber}`}
              >
                Week {lesson.weekNumber}
              </Badge>
              {isCompleted && (
                <Badge 
                  variant="outline" 
                  className="border-primary text-primary"
                  data-testid={`badge-completed-${lesson.dayNumber}`}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold text-primary" data-testid={`text-lesson-title-${lesson.dayNumber}`}>
              {lesson.title}
            </h3>
            
            <p className="text-muted-foreground" data-testid={`text-lesson-description-${lesson.dayNumber}`}>
              {lesson.description}
            </p>
          </div>
          
          <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
        </div>

        {!compact && (
          <>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Reading Materials</h4>
              <div className="space-y-1">
                {lesson.readingLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                    data-testid={`link-reading-${lesson.dayNumber}-${index}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="truncate">{link}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(completedTasksCount / totalTasks) * 100}%` }}
                  data-testid={`progress-tasks-${lesson.dayNumber}`}
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap" data-testid={`text-task-progress-${lesson.dayNumber}`}>
                {completedTasksCount}/{totalTasks} tasks
              </span>
            </div>
          </>
        )}

        <Link href={`/day/${lesson.dayNumber}`}>
          <Button 
            className="w-full md:w-auto"
            variant="default"
            data-testid={`button-view-lesson-${lesson.dayNumber}`}
          >
            {isCompleted ? "Review Lesson" : "Start Lesson"}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
