import { useState, useEffect } from "react";
import { QuizWelcome } from "@/components/QuizWelcome";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizResults } from "@/components/QuizResults";
import { getRandomQuestions } from "@/data/questions";
import { Question, QuizResult, QuizSession } from "@/types/quiz";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const startQuiz = () => {
    const questions = getRandomQuestions(5);
    setQuizSession({
      questions,
      currentQuestionIndex: 0,
      results: [],
      score: 0,
      isCompleted: false,
      startTime: Date.now()
    });
    setShowResult(false);
    toast({
      title: "Quiz gestartet!",
      description: "Viel Erfolg bei den 5 Wissenschaftsfragen!",
    });
  };

  const handleAnswer = (answerIndex: number, timeSpent: number) => {
    if (!quizSession) return;

    const currentQuestion = quizSession.questions[quizSession.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    const result: QuizResult = {
      question: currentQuestion,
      userAnswer: answerIndex,
      isCorrect,
      timeSpent
    };

    const newResults = [...quizSession.results, result];
    const newScore = quizSession.score + (isCorrect ? 1 : 0);

    setQuizSession({
      ...quizSession,
      results: newResults,
      score: newScore
    });

    // Show result for current question
    setShowResult(true);

    // Move to next question or complete quiz after delay
    setTimeout(() => {
      if (quizSession.currentQuestionIndex + 1 < quizSession.questions.length) {
        setQuizSession(prev => prev ? {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        } : null);
        setShowResult(false);
      } else {
        setQuizSession(prev => prev ? {
          ...prev,
          isCompleted: true
        } : null);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuizSession(null);
    setShowResult(false);
  };

  // Show welcome screen
  if (!quizSession) {
    return <QuizWelcome onStartQuiz={startQuiz} />;
  }

  // Show results screen
  if (quizSession.isCompleted) {
    const totalTime = (Date.now() - quizSession.startTime) / 1000;
    return (
      <QuizResults
        results={quizSession.results}
        totalQuestions={quizSession.questions.length}
        totalTime={totalTime}
        onRestart={resetQuiz}
      />
    );
  }

  // Show current question
  const currentQuestion = quizSession.questions[quizSession.currentQuestionIndex];
  const userAnswer = showResult ? quizSession.results[quizSession.results.length - 1]?.userAnswer : undefined;

  return (
    <QuizQuestion
      question={currentQuestion}
      questionNumber={quizSession.currentQuestionIndex + 1}
      totalQuestions={quizSession.questions.length}
      onAnswer={handleAnswer}
      showResult={showResult}
      userAnswer={userAnswer}
    />
  );
};

export default Index;
