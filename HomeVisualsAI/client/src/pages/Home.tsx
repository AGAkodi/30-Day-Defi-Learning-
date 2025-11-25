import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { LessonCard } from "@/components/LessonCard";
import { TaskList } from "@/components/TaskList";
import { QuizModal } from "@/components/QuizModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { BookOpen, Mail, Award, LogIn, UserPlus, Zap, BarChart3 } from "lucide-react";
import type { DailyLesson, UserProgress, QuizQuestion } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
  });

  const { data: todayLesson, isLoading: lessonLoading } = useQuery<DailyLesson>({
    queryKey: ["/api/lessons/today"],
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress/today"],
    enabled: !!todayLesson,
  });

  const updateTasksMutation = useMutation({
    mutationFn: async (completedTasks: string[]) => {
      return apiRequest("POST", "/api/progress/tasks", { 
        dayNumber: todayLesson!.dayNumber,
        completedTasks 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress/today"] });
      queryClient.invalidateQueries({ queryKey: ["/api/streak"] });
    },
  });

  const submitNotesMutation = useMutation({
    mutationFn: async (notesText: string) => {
      return apiRequest("POST", "/api/progress/notes", {
        dayNumber: todayLesson!.dayNumber,
        notes: notesText,
      });
    },
    onSuccess: () => {
      toast({
        title: "Notes Submitted!",
        description: "Your learning notes have been saved and emailed.",
      });
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/progress/today"] });
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (score: number) => {
      return apiRequest("POST", "/api/progress/quiz", {
        dayNumber: todayLesson!.dayNumber,
        score,
      });
    },
    onSuccess: () => {
      toast({
        title: "Quiz Completed!",
        description: "Your score has been recorded.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/progress/today"] });
      queryClient.invalidateQueries({ queryKey: ["/api/streak"] });
    },
  });

  const handleToggleTask = (task: string) => {
    if (!progress || !todayLesson) return;
    
    const currentTasks = progress.completedTasks || [];
    const newTasks = currentTasks.includes(task)
      ? currentTasks.filter(t => t !== task)
      : [...currentTasks, task];
    
    updateTasksMutation.mutate(newTasks);
  };

  const handleSubmitNotes = () => {
    if (!notes.trim()) {
      toast({
        title: "Empty Notes",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }
    submitNotesMutation.mutate(notes);
  };

  const handleQuizComplete = (score: number) => {
    submitQuizMutation.mutate(score);
    setShowQuiz(false);
  };

  if (lessonLoading || progressLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Show login/signup prompt when user is not authenticated
  if (!user) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-page-title">
            Welcome to Monarch DeFi
          </h1>
          <p className="text-muted-foreground text-lg">To know is to be free</p>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8 md:p-12 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Start Your DeFi Learning Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners mastering decentralized finance with our comprehensive 30-day curriculum. 
              Build your knowledge from fundamentals to advanced strategies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/login">
              <Button size="lg" className="gap-2" data-testid="button-login">
                <LogIn className="w-5 h-5" />
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-signup">
                <UserPlus className="w-5 h-5" />
                Sign Up
              </Button>
            </Link>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <Card className="p-6 space-y-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <h3 className="font-semibold text-lg">30-Day Curriculum</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive lessons covering DeFi fundamentals to advanced strategies
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h3 className="font-semibold text-lg">Interactive Quizzes</h3>
            <p className="text-sm text-muted-foreground">
              15 progressive questions per day with easy, medium, and hard difficulty levels
            </p>
          </Card>
          <Card className="p-6 space-y-3">
            <Zap className="w-8 h-8 text-primary" />
            <h3 className="font-semibold text-lg">Track Your Streak</h3>
            <p className="text-sm text-muted-foreground">
              Build consistency and maintain your learning streak with daily lessons
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (!todayLesson) {
    return (
      <Card className="p-8 text-center">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold mb-2">No lesson available</h2>
        <p className="text-muted-foreground">Check back later for today's lesson.</p>
      </Card>
    );
  }

  const quizQuestions = todayLesson.quizQuestions as QuizQuestion[];

  return (
    <div className="space-y-8">
      <div>
        {user && (
          <p className="text-lg text-primary font-serif mb-4">
            Welcome, <span className="font-bold">{(user as any).username}</span> 👑
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-page-title">
          Today's Lesson
        </h1>
        <p className="text-muted-foreground">Build your DeFi knowledge, one day at a time</p>
      </div>

      <LessonCard lesson={todayLesson} progress={progress} />

      <Card className="bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Daily Tasks</h2>
        </div>
        <TaskList
          tasks={todayLesson.tasks}
          completedTasks={progress?.completedTasks || []}
          onToggleTask={handleToggleTask}
          disabled={updateTasksMutation.isPending}
        />
      </Card>

      <Card className="bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">What I Learned Today</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Write down your key takeaways. They'll be saved and emailed to you.
        </p>
        <Textarea
          placeholder="Share your insights, questions, or reflections..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[150px] bg-muted text-foreground"
          data-testid="textarea-notes"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {notes.length} characters
          </span>
          <Button
            onClick={handleSubmitNotes}
            disabled={submitNotesMutation.isPending || !notes.trim()}
            data-testid="button-submit-notes"
          >
            Submit & Email
          </Button>
        </div>
      </Card>

      <Card className="bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Daily Quiz</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Test your understanding with {quizQuestions.length} questions.
          {progress?.quizScore !== undefined && (
            <span className="block mt-1 text-primary">
              Your last score: {progress.quizScore}/{quizQuestions.length}
            </span>
          )}
        </p>
        <Button
          onClick={() => setShowQuiz(true)}
          className="w-full md:w-auto"
          data-testid="button-start-quiz"
        >
          {progress?.quizScore !== undefined ? "Retake Quiz" : "Take Quiz"}
        </Button>
      </Card>

      <QuizModal
        open={showQuiz}
        onOpenChange={setShowQuiz}
        questions={quizQuestions}
        onComplete={handleQuizComplete}
      />
    </div>
  );
}
