import {QuestionInRawFormat} from './question';

export interface PredefinedQuiz {
  quizId: number;
  quizName: string;
  questionCount: number;
  playable: boolean;
}

export interface PredefinedQuizWithResolvedQuestions {
  quizId: number,
  quizName: string,
  questionCount: number,
  playable: boolean,
  resolvedQuestions: QuestionInRawFormat[]
}
