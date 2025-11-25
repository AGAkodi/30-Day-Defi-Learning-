import { useQuery } from "@tanstack/react-query";
import { StreakCounter } from "@/components/StreakCounter";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, TrendingUp, Award, Flame } from "lucide-react";
import type { Streak } from "@shared/schema";

export default function StreakPage() {
  const { data: streak, isLoading } = useQuery<Streak>({
    queryKey: ["/api/streak"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const currentStreak = streak?.currentStreak || 0;
  const longestStreak = streak?.longestStreak || 0;
  const lastActiveDate = streak?.lastActiveDate ? new Date(streak.lastActiveDate) : null;

  // Generate heatmap data for last 30 days
  const today = new Date();
  const heatmapDays: { date: Date; active: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Simple logic: mark as active if within current streak
    const active = lastActiveDate ? date <= lastActiveDate && i < currentStreak : false;
    heatmapDays.push({ date, active });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-page-title">
          Your Streak
        </h1>
        <p className="text-muted-foreground">
          Build your knowledge kingdom day by day
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StreakCounter currentStreak={currentStreak} longestStreak={longestStreak} />

        <Card className="bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Statistics</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="text-xl font-bold text-primary" data-testid="text-current-streak">
                {currentStreak} days
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-muted-foreground">Longest Streak</span>
              <span className="text-xl font-bold text-primary" data-testid="text-longest-streak">
                {longestStreak} days
              </span>
            </div>
            
            {lastActiveDate && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <span className="text-muted-foreground">Last Active</span>
                <span className="text-sm text-foreground" data-testid="text-last-active">
                  {lastActiveDate.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {currentStreak >= 7 && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Achievement Unlocked!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentStreak >= 30 && "30-Day Monarch - You're unstoppable!"}
                {currentStreak >= 21 && currentStreak < 30 && "21-Day Champion - Elite status!"}
                {currentStreak >= 14 && currentStreak < 21 && "14-Day Warrior - Keep pushing!"}
                {currentStreak >= 7 && currentStreak < 14 && "7-Day Scholar - First week done!"}
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card className="bg-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Activity Heatmap</h2>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Last 30 days of learning activity
        </p>

        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {heatmapDays.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-md transition-all ${
                day.active
                  ? "bg-primary hover-elevate"
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
              title={day.date.toLocaleDateString()}
              data-testid={`heatmap-day-${index}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
          <span>Less active</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-muted/30 rounded-sm" />
            <div className="w-4 h-4 bg-primary/40 rounded-sm" />
            <div className="w-4 h-4 bg-primary/70 rounded-sm" />
            <div className="w-4 h-4 bg-primary rounded-sm" />
          </div>
          <span>More active</span>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/30 p-6 md:p-8 text-center space-y-4">
        <Flame className="w-16 h-16 text-primary mx-auto fill-primary" />
        <h3 className="text-2xl font-semibold text-primary">Keep the Fire Burning</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {currentStreak === 0 && "Start your learning journey today and build your first streak!"}
          {currentStreak > 0 && currentStreak < 7 && "You're off to a great start! Keep learning every day to build your streak."}
          {currentStreak >= 7 && currentStreak < 30 && "You're building a strong habit! Don't break the chain now."}
          {currentStreak >= 30 && "You're a true Monarch! Your dedication is inspiring."}
        </p>
      </Card>
    </div>
  );
}
