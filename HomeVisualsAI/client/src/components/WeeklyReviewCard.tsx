import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Award, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

interface WeeklyReviewCardProps {
  weekNumber: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  completedDays: number;
  totalDays: number;
  score?: number;
}

export function WeeklyReviewCard({ 
  weekNumber, 
  isUnlocked, 
  isCompleted, 
  completedDays, 
  totalDays,
  score
}: WeeklyReviewCardProps) {
  return (
    <Card 
      className={`bg-card border-2 transition-all ${
        isCompleted 
          ? "border-primary bg-primary/5" 
          : isUnlocked 
            ? "border-primary/50 hover-elevate" 
            : "border-muted-foreground/30 opacity-60"
      }`}
      data-testid={`card-week-review-${weekNumber}`}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge 
                variant={isCompleted ? "default" : "outline"}
                className={isCompleted ? "bg-primary" : "border-primary text-primary"}
                data-testid={`badge-week-${weekNumber}`}
              >
                Week {weekNumber}
              </Badge>
              {isCompleted && (
                <Badge variant="outline" className="border-primary text-primary">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              {!isUnlocked && (
                <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                  <Lock className="w-3 h-3 mr-1" />
                  Locked
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-primary" data-testid={`text-week-title-${weekNumber}`}>
              Week {weekNumber} Review
            </h3>
            
            <p className="text-sm text-muted-foreground">
              {isCompleted 
                ? `Completed with ${score !== undefined ? `${score}/3` : '0'} questions correct`
                : isUnlocked
                  ? "Complete this review to unlock the next week"
                  : `Complete all Week ${weekNumber} lessons to unlock this review`
              }
            </p>
          </div>
          
          {isCompleted ? (
            <Award className="w-6 h-6 text-primary flex-shrink-0" />
          ) : isUnlocked ? (
            <Unlock className="w-6 h-6 text-primary flex-shrink-0" />
          ) : (
            <Lock className="w-6 h-6 text-muted-foreground flex-shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(completedDays / totalDays) * 100}%` }}
              data-testid={`progress-week-${weekNumber}`}
            />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap" data-testid={`text-week-progress-${weekNumber}`}>
            {completedDays}/{totalDays} days
          </span>
        </div>

        {isUnlocked && (
          <Link href={`/week/${weekNumber}`}>
            <Button 
              className="w-full"
              variant={isCompleted ? "outline" : "default"}
              data-testid={`button-week-review-${weekNumber}`}
            >
              {isCompleted ? "Review Again" : "Start Review"}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
