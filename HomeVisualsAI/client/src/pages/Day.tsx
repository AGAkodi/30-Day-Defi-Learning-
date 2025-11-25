import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { LessonCard } from "@/components/LessonCard";
import { TaskList } from "@/components/TaskList";
import { QuizModal } from "@/components/QuizModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChevronLeft, ChevronRight, BookOpen, Mail, Award, ExternalLink } from "lucide-react";
import type { DailyLesson, UserProgress, QuizQuestion } from "@shared/schema";

export default function Day() {
  const [, params] = useRoute("/day/:id");
  const dayNumber = parseInt(params?.id || "1");
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  const { data: lesson, isLoading: lessonLoading } = useQuery<DailyLesson>({
    queryKey: ["/api/lessons", dayNumber],
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress", dayNumber],
    enabled: !!lesson,
  });

  const updateTasksMutation = useMutation({
    mutationFn: async (completedTasks: string[]) => {
      return apiRequest("POST", "/api/progress/tasks", { dayNumber, completedTasks });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", dayNumber] });
      queryClient.invalidateQueries({ queryKey: ["/api/streak"] });
    },
  });

  const submitNotesMutation = useMutation({
    mutationFn: async (notesText: string) => {
      return apiRequest("POST", "/api/progress/notes", { dayNumber, notes: notesText });
    },
    onSuccess: () => {
      toast({
        title: "Notes Submitted!",
        description: "Your learning notes have been saved and emailed.",
      });
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/progress", dayNumber] });
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (score: number) => {
      return apiRequest("POST", "/api/progress/quiz", { dayNumber, score });
    },
    onSuccess: () => {
      toast({
        title: "Quiz Completed!",
        description: "Your score has been recorded.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/progress", dayNumber] });
      queryClient.invalidateQueries({ queryKey: ["/api/streak"] });
    },
  });

  const handleToggleTask = (task: string) => {
    if (!progress) return;
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

  if (!lesson) {
    return (
      <Card className="p-8 text-center">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold mb-2">Lesson not found</h2>
        <p className="text-muted-foreground mb-4">This lesson doesn't exist.</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </Card>
    );
  }

  const quizQuestions = lesson.quizQuestions as QuizQuestion[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <Link href={dayNumber > 1 ? `/day/${dayNumber - 1}` : "/"}>
          <Button
            variant="outline"
            size="sm"
            disabled={dayNumber === 1}
            data-testid="button-prev-day"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center" data-testid="text-page-title">
          Day {dayNumber}
        </h1>

        <Link href={dayNumber < 30 ? `/day/${dayNumber + 1}` : "/"}>
          <Button
            variant="outline"
            size="sm"
            disabled={dayNumber === 30}
            data-testid="button-next-day"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <Card className="bg-card p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4" data-testid="text-lesson-title">
            {lesson.title}
          </h2>
          <p className="text-muted-foreground" data-testid="text-lesson-description">
            {lesson.description}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Reading Materials</h3>
          <div className="space-y-2">
            {lesson.readingLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline p-3 bg-muted/50 rounded-md hover-elevate"
                data-testid={`link-reading-${index}`}
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{link}</span>
              </a>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Tasks</h3>
        </div>
        <TaskList
          tasks={lesson.tasks}
          completedTasks={progress?.completedTasks || []}
          onToggleTask={handleToggleTask}
          disabled={updateTasksMutation.isPending}
        />
      </Card>

      <Card className="bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">What I Learned Today</h3>
        </div>
        <Textarea
          placeholder="Share your insights, questions, or reflections..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[150px] bg-muted text-foreground"
          data-testid="textarea-notes"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{notes.length} characters</span>
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
          <h3 className="text-xl font-semibold">Quiz</h3>
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
