export interface IAddQuize {
  addQuiz: (newQuiz: IQuiz) => void;
}

export interface IQuestion {
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  question: string;
}

export interface IQuiz {
  id: number;
  title: string;
  questions: Array<IQuestion>;
}

export interface IQuizItemProps {
  quiz: IQuiz;
  removeQuiz: (id: number) => void;
}

export interface IQuizzesItemProps {
  quizzes: Array<IQuiz>;
  removeQuiz: (id: number) => void;
}

export interface IQuizResults {
  numOfQuestions: number;
  correctAnswers: number;
}

export interface IQuizTimer {
  timeLimit: number;
  onTimeExpired: () => void;
}