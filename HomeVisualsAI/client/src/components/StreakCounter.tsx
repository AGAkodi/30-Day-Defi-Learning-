import { Flame, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak?: number;
  compact?: boolean;
}

export function StreakCounter({ currentStreak, longestStreak = 0, compact = false }: StreakCounterProps) {
  if (compact) {
    return (
      <Badge 
        variant="outline" 
        className="border-primary text-primary gap-1"
        data-testid="badge-streak-compact"
      >
        <Flame className="w-3 h-3 fill-primary" />
        <span data-testid="text-streak-count">{currentStreak}</span>
      </Badge>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/30">
      <div className="p-6 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary">
          <Flame className="w-10 h-10 text-primary fill-primary animate-pulse" />
        </div>
        
        <div className="space-y-1">
          <div className="text-5xl font-bold text-primary" data-testid="text-streak-current">
            {currentStreak}
          </div>
          <p className="text-sm text-muted-foreground">day streak</p>
        </div>

        {longestStreak > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span data-testid="text-streak-longest">Longest: {longestStreak} days</span>
          </div>
        )}

        <p className="text-xs text-muted-foreground italic">
          {currentStreak === 0 && "Start your journey today!"}
          {currentStreak > 0 && currentStreak < 7 && "Keep it up!"}
          {currentStreak >= 7 && currentStreak < 14 && "One week strong!"}
          {currentStreak >= 14 && currentStreak < 21 && "Two weeks and counting!"}
          {currentStreak >= 21 && currentStreak < 30 && "You're on fire!"}
          {currentStreak >= 30 && "Monarch status achieved!"}
        </p>
      </div>
    </Card>
  );
}
