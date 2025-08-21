export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
}

export interface QuizResult {
  question: Question;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizSession {
  questions: Question[];
  currentQuestionIndex: number;
  results: QuizResult[];
  score: number;
  isCompleted: boolean;
  startTime: number;
}