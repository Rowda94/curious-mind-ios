import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizResult } from "@/types/quiz";
import { Trophy, RotateCcw, Target, Clock, Award } from "lucide-react";

interface QuizResultsProps {
  results: QuizResult[];
  totalQuestions: number;
  totalTime: number;
  onRestart: () => void;
}

export const QuizResults = ({ results, totalQuestions, totalTime, onRestart }: QuizResultsProps) => {
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  const averageTime = totalTime / totalQuestions;

  const getPerformanceMessage = () => {
    if (scorePercentage >= 80) {
      return { message: "Ausgezeichnet! Du bist ein echter Wissenschafts-Experte! 🎉", color: "text-success" };
    } else if (scorePercentage >= 60) {
      return { message: "Sehr gut! Du kennst dich schon gut aus! 👍", color: "text-primary" };
    } else if (scorePercentage >= 40) {
      return { message: "Nicht schlecht! Mit etwas Übung wirst du noch besser! 📚", color: "text-warning" };
    } else {
      return { message: "Kopf hoch! Jeder fängt mal an. Probier es nochmal! 💪", color: "text-muted-foreground" };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-quiz-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-8">
          {/* Header with Trophy */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quiz beendet!</h1>
            <p className={`text-lg ${performance.color} font-medium`}>
              {performance.message}
            </p>
          </div>

          {/* Score Display */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-primary mb-2">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-2xl font-semibold text-muted-foreground">
                {scorePercentage.toFixed(0)}% richtig
              </div>
            </div>
            <Progress value={scorePercentage} className="h-4 mb-4" />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="border border-border">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Richtige Antworten</div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{averageTime.toFixed(1)}s</div>
                <div className="text-sm text-muted-foreground">Ø pro Frage</div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Badge */}
          {scorePercentage >= 80 && (
            <div className="mb-8 p-4 bg-success/10 rounded-lg border border-success/20 text-center">
              <Award className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold text-success">Wissenschafts-Experte!</div>
              <div className="text-sm text-success/80">Du hast mindestens 80% der Fragen richtig beantwortet</div>
            </div>
          )}

          {/* Results Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Deine Antworten:</h3>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={result.question.id}
                  className={`p-4 rounded-lg border ${
                    result.isCorrect 
                      ? 'bg-success/5 border-success/20' 
                      : 'bg-destructive/5 border-destructive/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      result.isCorrect ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">
                        {result.question.question}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.isCorrect ? '✓' : '✗'} {result.question.options[result.question.correctAnswer]}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.timeSpent.toFixed(1)}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button 
              onClick={onRestart} 
              size="lg" 
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Neues Quiz starten
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};