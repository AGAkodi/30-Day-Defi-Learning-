import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, BookOpen, Award, Target, TrendingUp } from "lucide-react";
import type { User as UserType, UserProgress, Streak } from "@shared/schema";

export default function Profile() {
  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ["/api/user"],
  });

  const { data: allProgress, isLoading: progressLoading } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress/all"],
  });

  const { data: streak, isLoading: streakLoading } = useQuery<Streak>({
    queryKey: ["/api/streak"],
  });

  if (userLoading || progressLoading || streakLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const progress = allProgress || [];
  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = 30;
  const totalQuizScore = progress.reduce((sum, p) => sum + (p.quizScore || 0), 0);
  const maxQuizScore = completedLessons * 3; // 3 questions per lesson
  const averageScore = maxQuizScore > 0 ? Math.round((totalQuizScore / maxQuizScore) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-page-title">
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          Track your DeFi learning journey
        </p>
      </div>

      <Card className="bg-card p-6 md:p-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold" data-testid="text-user-email">
              {user?.email || "Scholar"}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-primary">
                DeFi Learner
              </Badge>
              {completedLessons >= 7 && (
                <Badge variant="outline" className="border-primary text-primary">
                  Week 1 Complete
                </Badge>
              )}
              {completedLessons >= 30 && (
                <Badge className="bg-accent text-accent-foreground">
                  Course Complete
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Lessons Completed</h3>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary" data-testid="text-lessons-completed">
              {completedLessons} / {totalLessons}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {Math.round((completedLessons / totalLessons) * 100)}%
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Quiz Performance</h3>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary" data-testid="text-quiz-average">
              {averageScore}%
            </div>
            <p className="text-sm text-muted-foreground">
              {totalQuizScore} / {maxQuizScore} correct answers
            </p>
          </div>
        </Card>

        <Card className="bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Current Streak</h3>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary" data-testid="text-profile-streak">
              {streak?.currentStreak || 0}
            </div>
            <p className="text-sm text-muted-foreground">
              Longest: {streak?.longestStreak || 0} days
            </p>
          </div>
        </Card>
      </div>

      <Card className="bg-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Learning Goals</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Complete Week 1</span>
              <span className="text-sm text-muted-foreground">
                {Math.min(completedLessons, 7)}/7
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${completedLessons >= 7 ? 'bg-primary' : 'bg-primary/60'}`}
                style={{ width: `${Math.min((completedLessons / 7) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Complete Week 2</span>
              <span className="text-sm text-muted-foreground">
                {Math.max(0, Math.min(completedLessons - 7, 7))}/7
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${completedLessons >= 14 ? 'bg-primary' : 'bg-primary/60'}`}
                style={{ width: `${Math.max(0, Math.min(((completedLessons - 7) / 7) * 100, 100))}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Complete Week 3</span>
              <span className="text-sm text-muted-foreground">
                {Math.max(0, Math.min(completedLessons - 14, 7))}/7
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${completedLessons >= 21 ? 'bg-primary' : 'bg-primary/60'}`}
                style={{ width: `${Math.max(0, Math.min(((completedLessons - 14) / 7) * 100, 100))}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Complete Week 4</span>
              <span className="text-sm text-muted-foreground">
                {Math.max(0, Math.min(completedLessons - 21, 9))}/9
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${completedLessons >= 30 ? 'bg-primary' : 'bg-primary/60'}`}
                style={{ width: `${Math.max(0, Math.min(((completedLessons - 21) / 9) * 100, 100))}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/30 p-6 md:p-8 text-center space-y-4">
        <Award className="w-16 h-16 text-primary mx-auto" />
        <h3 className="text-2xl font-semibold text-primary">
          {completedLessons === 0 && "Begin Your Journey"}
          {completedLessons > 0 && completedLessons < 15 && "Building Your Kingdom"}
          {completedLessons >= 15 && completedLessons < 30 && "Halfway to Mastery"}
          {completedLessons === 30 && "Master of DeFi"}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto italic font-serif text-lg">
          "To know is to be free"
        </p>
      </Card>
    </div>
  );
}
