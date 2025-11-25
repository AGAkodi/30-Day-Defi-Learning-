import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Award } from "lucide-react";
import type { QuizQuestion } from "@shared/schema";

interface QuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  title?: string;
}

export function QuizModal({ open, onOpenChange, questions, onComplete, title = "Daily Quiz" }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ question: string; selected: string; correct: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: currentQuestion.correctAnswer,
      },
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const score = newAnswers.filter((a) => a.selected === a.correct).length;
      setShowResults(true);
      onComplete(score);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    onOpenChange(false);
  };

  const score = answers.filter((a) => a.selected === a.correct).length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card"
        data-testid="dialog-quiz"
      >
        {!showResults ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between gap-4 w-full">
                <DialogTitle className="text-2xl text-primary" data-testid="text-quiz-title">
                  {title}
                </DialogTitle>
                <Badge variant="outline" data-testid="text-question-counter">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium flex-1" data-testid={`text-question-${currentQuestionIndex}`}>
                  {currentQuestion.question}
                </h3>
                {currentQuestion.difficulty && (
                  <Badge 
                    variant="outline" 
                    className={`flex-shrink-0 ${
                      currentQuestion.difficulty === 'easy' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30' :
                      currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30' :
                      'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'
                    }`}
                    data-testid={`badge-difficulty-${currentQuestionIndex}`}
                  >
                    {currentQuestion.difficulty === 'easy' ? '⭐ Easy' :
                     currentQuestion.difficulty === 'medium' ? '⭐⭐ Medium' :
                     '⭐⭐⭐ Hard'}
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <Card
                    key={index}
                    className={`p-4 cursor-pointer transition-all hover-elevate ${
                      selectedAnswer === option
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                    data-testid={`option-${currentQuestionIndex}-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === option
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedAnswer === option && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm">{option}</span>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="w-full"
                data-testid="button-quiz-next"
              >
                {isLastQuestion ? "Submit Quiz" : "Next Question"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary flex items-center gap-2" data-testid="text-quiz-results">
                <Award className="w-6 h-6" />
                Quiz Results
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-primary" data-testid="text-quiz-score">
                  {percentage}%
                </div>
                <p className="text-muted-foreground" data-testid="text-quiz-score-detail">
                  You answered {score} out of {totalQuestions} questions correctly
                </p>
                {percentage === 100 && (
                  <p className="text-primary font-semibold">Perfect score! Well done, Monarch!</p>
                )}
                {percentage >= 70 && percentage < 100 && (
                  <p className="text-primary font-semibold">Great job! Your reign continues!</p>
                )}
                {percentage < 70 && (
                  <p className="text-accent font-semibold">Keep studying to build your kingdom!</p>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Review Your Answers:</h4>
                {answers.map((answer, index) => {
                  const isCorrect = answer.selected === answer.correct;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-md border ${
                        isCorrect ? "border-primary/30 bg-primary/5" : "border-accent/30 bg-accent/5"
                      }`}
                      data-testid={`result-item-${index}`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{answer.question}</p>
                          <p className="text-sm">
                            Your answer: <span className={isCorrect ? "text-primary" : "text-accent"}>{answer.selected}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-primary">
                              Correct answer: {answer.correct}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button onClick={handleClose} className="w-full" data-testid="button-quiz-close">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
