import {QuestionInRawFormat} from './question';

export interface PredefinedQuiz {
  quizId: number;
  quizName: string;
  questionCount: number;
}

export interface PredefinedQuizWithResolvedQuestions {
  quizId: number,
  quizName: string,
  questionCount: number,
  resolvedQuestions: QuestionInRawFormat[]
}
