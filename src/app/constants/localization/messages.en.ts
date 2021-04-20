export const BUTTONS = {
  // start
  PLAY_QUIZ: 'Play a Quiz',
  MANAGE_PREDEFINED_QUIZZES: 'Manage predefined Quizzes',
  MANAGE_QUESTIONS: 'Manage questions'
}

export const ERRORS =  {
  NOT_EMPTY_ALL: 'The shown input fields must not be empty.',
  ADMIN_TOKEN: 'The Admin Token is missing.',
  QUIZ_NOT_PLAYABLE: 'To play this quiz, the quiz has to contain 10 to 30 questions!'
}

export const HEADERS = {
  // questions
  EDIT_QUESTION: 'Edit Question',
  DELETE_QUESTION: 'Delete Question',
  ADD_QUESTION: 'Add Question',
  MANAGE_QUESTIONS: 'Manage Questions',

  // predefined quizzes
  DELETE_QUIZ: 'Delete predefined Quiz',
  MANAGE_PREDEFINED_QUIZZES: 'Manage predefined Quizzes'
}

export const ATTRIBUTE_NAMES = {
  // common
  ID: 'ID',

  // questions
  QUESTION_TEXT: 'Question Text',
  CORRECT_ANSWER: 'Correct Answer',
  WRONG_ANSWER_1: 'Wrong Answer 1',
  WRONG_ANSWER_2: 'Wrong Answer 2',
  WRONG_ANSWER_3: 'Wrong Answer 3',
  ADMIN_TOKEN: 'Admin Token',

  // predefined quizzes
  QUIZ_NAME: 'Quiz Name',
  QUESTION_COUNT: 'Question Count',
  QUESTIONS: 'Questions'
}

export const ACTION_LABELS = {
  ACTIONS: 'Actions',
  EDIT: 'Edit',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
  SAVE: 'Save',
  SHOW_ANSWERS: 'Show Answers',
  HIDE_ANSWERS: 'Hide Answers',
  EDIT_ANSWERS: 'Edit Answers',
  NO_EDIT_ANSWERS: 'Don\'t edit Answers',
  ADD_QUESTION: 'Add Question',
  ADD_PREDEFINED_QUIZ: 'Add predefined Quiz'
}

export const CONFIRMATION = {
  DELETE_QUESTION: 'Do you really wish to delete the Question?',
  DELETE_QUIZ: 'Do you really wish to delete the predefined Quiz?'
}

export const SUCCESS = {
  QUESTION_CREATED: 'The Question was created successfully!'
}
