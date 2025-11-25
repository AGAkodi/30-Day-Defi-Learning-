import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { LessonCard } from "@/components/LessonCard";
import { QuizModal } from "@/components/QuizModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Award, Lock, CheckCircle2 } from "lucide-react";
import type { DailyLesson, UserProgress, WeeklyReview, QuizQuestion } from "@shared/schema";

export default function Week() {
  const [, params] = useRoute("/week/:number");
  const weekNumber = parseInt(params?.number || "1");
  const { toast } = useToast();
  const [reviewNotes, setReviewNotes] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  const { data: weekLessons, isLoading: lessonsLoading } = useQuery<DailyLesson[]>({
    queryKey: ["/api/lessons/week", weekNumber],
  });

  const { data: weekProgress, isLoading: progressLoading } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress/week", weekNumber],
  });

  const { data: weeklyReview, isLoading: reviewLoading } = useQuery<WeeklyReview | null>({
    queryKey: ["/api/weekly-review", weekNumber],
  });

  const submitReviewMutation = useMutation({
    mutationFn: async (data: { notes: string; score: number }) => {
      return apiRequest("POST", "/api/weekly-review", {
        weekNumber,
        ...data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Weekly Review Completed!",
        description: "Your review has been saved. Continue to next week!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/weekly-review", weekNumber] });
    },
  });

  const handleQuizComplete = (score: number) => {
    if (!reviewNotes.trim()) {
      toast({
        title: "Add Review Notes",
        description: "Please write your weekly reflection before submitting.",
        variant: "destructive",
      });
      setShowQuiz(false);
      return;
    }
    submitReviewMutation.mutate({ notes: reviewNotes, score });
    setShowQuiz(false);
  };

  if (lessonsLoading || progressLoading || reviewLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const lessons = weekLessons || [];
  const progress = weekProgress || [];
  const review = weeklyReview;

  const completedDays = progress.filter(p => p.completed).length;
  const totalDays = lessons.length;
  const isWeekComplete = completedDays === totalDays;
  const isReviewComplete = review?.completed || false;

  // Weekly quiz questions (3 questions total)
  const weeklyQuizQuestions: QuizQuestion[] = [
    {
      question: `What was the main topic covered in Week ${weekNumber}?`,
      options: [
        "DeFi Fundamentals",
        "Advanced Trading",
        "NFT Creation",
        "Smart Contracts"
      ],
      correctAnswer: "DeFi Fundamentals"
    },
    {
      question: "Which concept did you find most valuable this week?",
      options: [
        "Liquidity Pools",
        "Yield Farming",
        "DEX Trading",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
    {
      question: "How will you apply what you learned?",
      options: [
        "Research more DeFi protocols",
        "Start small investments",
        "Share knowledge with others",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-page-title">
          Week {weekNumber} Overview
        </h1>
        <p className="text-muted-foreground">
          {isReviewComplete 
            ? "You've completed this week! Well done, Monarch!"
            : isWeekComplete
              ? "Complete the weekly review to unlock the next week"
              : `Complete all ${totalDays} lessons to unlock the weekly review`
          }
        </p>
      </div>

      <Card className="bg-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Progress</h2>
            <p className="text-muted-foreground">
              {completedDays} of {totalDays} lessons completed
            </p>
          </div>
          <div className="flex gap-2">
            {isReviewComplete && (
              <Badge className="bg-primary">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Week Completed
              </Badge>
            )}
            {!isWeekComplete && (
              <Badge variant="outline" className="border-primary text-primary">
                <Lock className="w-4 h-4 mr-1" />
                Review Locked
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(completedDays / totalDays) * 100}%` }}
              data-testid="progress-week"
            />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {Math.round((completedDays / totalDays) * 100)}%
          </span>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const lessonProgress = progress.find(p => p.dayNumber === lesson.dayNumber);
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              progress={lessonProgress}
              compact
            />
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/50 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-semibold">Weekly Review</h2>
            <p className="text-sm text-muted-foreground">
              {isReviewComplete 
                ? `Completed with ${review?.quizScore || 0}/3 questions correct`
                : isWeekComplete
                  ? "Reflect on your learning and take the weekly quiz"
                  : "Complete all lessons to unlock this review"
              }
            </p>
          </div>
        </div>

        {isWeekComplete && (
          <>
            <div className="space-y-3">
              <label className="text-sm font-medium">Weekly Reflection</label>
              <Textarea
                placeholder="What were your key takeaways from this week? What challenges did you face? What will you focus on next?"
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="min-h-[150px] bg-muted text-foreground"
                disabled={isReviewComplete}
                data-testid="textarea-review-notes"
              />
            </div>

            {!isReviewComplete && (
              <Button
                onClick={() => setShowQuiz(true)}
                disabled={!reviewNotes.trim() || submitReviewMutation.isPending}
                className="w-full"
                data-testid="button-start-review-quiz"
              >
                Take Weekly Quiz
              </Button>
            )}

            {isReviewComplete && (
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <p className="text-primary font-semibold">
                  Week {weekNumber} Completed!
                </p>
                {weekNumber < 4 && (
                  <Link href={`/week/${weekNumber + 1}`}>
                    <Button className="mt-4">
                      Continue to Week {weekNumber + 1}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </>
        )}

        {!isWeekComplete && (
          <div className="text-center py-8 space-y-4">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              Complete all {totalDays} lessons to unlock the weekly review
            </p>
            <Link href="/">
              <Button variant="outline">
                Continue Learning
              </Button>
            </Link>
          </div>
        )}
      </Card>

      <QuizModal
        open={showQuiz}
        onOpenChange={setShowQuiz}
        questions={weeklyQuizQuestions}
        onComplete={handleQuizComplete}
        title={`Week ${weekNumber} Review Quiz`}
      />
    </div>
  );
}
