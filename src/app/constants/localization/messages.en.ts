export const BUTTONS = {
  // start
  PLAY_QUIZ: 'Play a Quiz',
  MANAGE_PREDEFINED_QUIZZES: 'Manage predefined Quizzes',
  MANAGE_QUESTIONS: 'Manage Questions',

  // quiz format
  RANDOM_QUIZ: 'Random Quiz',
  PREDEFINED_QUIZ: 'Predefined Quiz'
}

export const ERRORS =  {
  NOT_EMPTY_ALL: 'The shown input fields must not be empty.',
  ADMIN_TOKEN: 'The Admin Token is missing.',
  NO_ADDED_QUESTION: 'There has to be added at least one Question to apply a change.'
}

export const HEADERS = {
  EDIT_QUESTION: 'Edit Question',
  DELETE_QUESTION: 'Delete Question',
  ADD_QUESTION: 'Add Question',
  MANAGE_QUESTIONS: 'Manage Questions',
  EDIT_QUIZ: 'Edit Quiz',
  DELETE_QUIZ: 'Delete Quiz',
  MANAGE_PREDEFINED_QUIZZES: 'Manage predefined Quizzes',
  SELECT_QUIZ_FORMAT: 'Quiz-Format auswählen',
  SELECT_RANDOM_QUIZ: 'Create a random Quiz',
  SELECT_PREDEFINED_QUIZ: 'Select predefined Quiz',
  FINISHED: 'Finished!'
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
  QUESTION_COUNT_BEFORE: 'Question Count (before changes)',
  QUESTION_COUNT_AFTER: 'Question Count (after changes)',
  QUESTIONS: 'Questions',
  USED_QUESTIONS: 'Added Questions',
  UNUSED_QUESTIONS: 'Unused Questions'
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
  ADD_PREDEFINED_QUIZ: 'Add predefined Quiz',
  REMOVE: 'Remove',
  ADD_QUESTIONS: 'Add Questions',
  BACK_TO_START: 'Back to the main menu',
  PLAY: 'Play',
  NEXT_QUESTION: 'Next Question',
  FINISH_QUIZ: 'Finish Quiz'
}

export const CONFIRMATION = {
  DELETE_QUESTION: 'Do you really wish to delete the Question?',
  DELETE_QUIZ: 'Do you really wish to delete the predefined Quiz?'
}

export const SUCCESS = {
  QUESTION_CREATED: 'The Question was created successfully!',
  QUIZ_CREATED: 'The Quiz was created successfully!'
}

export const INFO = {
  NO_USED_QUESTIONS: 'Currently no questions are assigned to this Quiz.',
  NO_UNUSED_QUESTIONS: 'Currently all existing questions are already assigned to this Quiz.',
  NO_PREDEFINED_QUIZ: 'Currently no predefined Quizzes are existing.',
  QUESTION: 'Question',
  CORRECT_ANSWERS: 'Correct Answers',
  WRONG_ANSWERS: 'Wrong Answers',
  RANDOM_QUIZ_NAME: 'Random Quiz',
  NO_RANDOM_QUIZ_SINCE_NO_QUESTIONS: 'Currently you have not created any questions. Thus, you cannot play a random Quiz.',
  NO_QUESTIONS: 'Currently no questions are existing.'
}
