import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Play, Trophy, Target } from "lucide-react";

interface QuizWelcomeProps {
  onStartQuiz: () => void;
}

export const QuizWelcome = ({ onStartQuiz }: QuizWelcomeProps) => {
  return (
    <div className="min-h-screen bg-quiz-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">BrainBoost</h1>
            <p className="text-muted-foreground">
              Teste dein Wissen mit spannenden Wissenschaftsfragen!
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">5 Fragen aus verschiedenen Kategorien</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-sm text-foreground">Punkte sammeln und Wissen erweitern</span>
            </div>
          </div>

          <Button 
            onClick={onStartQuiz} 
            size="lg" 
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Quiz Starten
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};