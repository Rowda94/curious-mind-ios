import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/types/quiz";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number, timeSpent: number) => void;
  showResult?: boolean;
  userAnswer?: number;
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult = false,
  userAnswer
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(selectedAnswer ?? -1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    const timeSpent = (Date.now() - startTime) / 1000;
    onAnswer(answerIndex, timeSpent);
  };

  const getButtonVariant = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? "default" : "outline";
    }
    
    if (index === question.correctAnswer) {
      return "default";
    }
    if (userAnswer === index && index !== question.correctAnswer) {
      return "destructive";
    }
    return "outline";
  };

  const getButtonClassName = (index: number) => {
    if (!showResult) return "";
    
    if (index === question.correctAnswer) {
      return "border-success bg-success text-success-foreground shadow-correct";
    }
    if (userAnswer === index && index !== question.correctAnswer) {
      return "border-destructive bg-destructive text-destructive-foreground shadow-incorrect";
    }
    return "opacity-60";
  };

  const progressValue = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-quiz-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-8">
          {/* Progress Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Frage {questionNumber} von {totalQuestions}
              </span>
              {!showResult && (
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {timeLeft}s
                </div>
              )}
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
              {question.category}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-foreground mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4 mb-6">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={getButtonVariant(index)}
                className={`w-full h-auto min-h-[60px] text-left justify-start p-6 text-lg transition-all duration-300 hover:scale-105 ${getButtonClassName(index)}`}
                onClick={() => {
                  if (!showResult) {
                    setSelectedAnswer(index);
                    setTimeout(() => handleAnswer(index), 100);
                  }
                }}
                disabled={showResult}
              >
                <span className="w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center mr-4 font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && (
                  <span className="ml-4">
                    {index === question.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : userAnswer === index ? (
                      <XCircle className="w-6 h-6 text-destructive" />
                    ) : null}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && question.explanation && (
            <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-foreground mb-2">Erklärung:</h3>
              <p className="text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};