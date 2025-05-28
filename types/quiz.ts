export interface IQuiz {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  documentId: string;
  question: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  answer: string;
  options: IOptions[];
}

export interface IOptions {
  id: number;
  option: string;
  isCorrect: boolean | null;
}

export interface ISubmitQuizPayload {
  quizId: number;
  answers: IAnswers[];
}

export interface IAnswers {
  questionId: string;
  selectedOption: string;
}
