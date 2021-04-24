export interface QuestionInRawFormat {
  id: number,
  questionText: string,
  correctAnswer: string,
  wrongAnswer1: string,
  wrongAnswer2: string,
  wrongAnswer3: string
}

export interface QuestionInPlayFormat {
  id: number,
  questionText: string,
  possibleAnswers: [
    {
      answerLetter: string,
      answerText: string
    }
  ],
  correctAnswer: string
}
