/**
 * The MESSAGE_ID values for accessing the localized messages in the messages.<locale>.ts files in an unified way.
 * <br />
 * As an example, the value MESSAGE_ID.BUTTONS.PLAY_QUIZ should include exactly the name of the exported value of the
 * BUTTONS.PLAY_QUIZ attribute in the messages.<locale>.ts file.
 */
export const MESSAGE_ID = {
  BUTTONS: {
    // start
    PLAY_QUIZ: 'BUTTONS.PLAY_QUIZ',
    MANAGE_PREDEFINED_QUIZZES: 'BUTTONS.MANAGE_PREDEFINED_QUIZZES',
    MANAGE_QUESTIONS: 'BUTTONS.MANAGE_QUESTIONS',

    // quiz format
    RANDOM_QUIZ: 'BUTTONS.RANDOM_QUIZ',
    PREDEFINED_QUIZ: 'BUTTONS.PREDEFINED_QUIZ'
  },

  ERRORS: {
    NOT_EMPTY_ALL: 'ERRORS.NOT_EMPTY_ALL',
    ADMIN_TOKEN: 'ERRORS.ADMIN_TOKEN',
    NO_ADDED_QUESTION: 'ERRORS.NO_ADDED_QUESTION',
    BACKEND_NOT_REACHABLE: 'ERRORS.BACKEND_NOT_REACHABLE'
  },

  HEADERS: {
    EDIT_QUESTION: 'HEADERS.EDIT_QUESTION',
    DELETE_QUESTION: 'HEADERS.DELETE_QUESTION',
    ADD_QUESTION: 'HEADERS.ADD_QUESTION',
    MANAGE_QUESTIONS: 'HEADERS.MANAGE_QUESTIONS',
    ADD_QUIZ: 'HEADERS.ADD_QUIZ',
    EDIT_QUIZ: 'HEADERS.EDIT_QUIZ',
    DELETE_QUIZ: 'HEADERS.DELETE_QUIZ',
    MANAGE_PREDEFINED_QUIZZES: 'HEADERS.MANAGE_PREDEFINED_QUIZZES',
    SELECT_QUIZ_FORMAT: 'HEADERS.SELECT_QUIZ_FORMAT',
    SELECT_RANDOM_QUIZ: 'HEADERS.SELECT_RANDOM_QUIZ',
    SELECT_PREDEFINED_QUIZ: 'HEADERS.SELECT_PREDEFINED_QUIZ',
    FINISHED: 'HEADERS.FINISHED',
    ERROR: 'HEADERS.ERROR',
    STARTING_QUIZ: 'HEADERS.STARTING_QUIZ'
  },

  ATTRIBUTE_NAMES: {
    // common
    ID: 'ATTRIBUTE_NAMES.ID',

    // questions
    QUESTION_TEXT: 'ATTRIBUTE_NAMES.QUESTION_TEXT',
    CORRECT_ANSWER: 'ATTRIBUTE_NAMES.CORRECT_ANSWER',
    WRONG_ANSWER_1: 'ATTRIBUTE_NAMES.WRONG_ANSWER_1',
    WRONG_ANSWER_2: 'ATTRIBUTE_NAMES.WRONG_ANSWER_2',
    WRONG_ANSWER_3: 'ATTRIBUTE_NAMES.WRONG_ANSWER_3',
    ADMIN_TOKEN: 'ATTRIBUTE_NAMES.ADMIN_TOKEN',

    // predefined quizzes
    QUIZ_NAME: 'ATTRIBUTE_NAMES.QUIZ_NAME',
    QUESTION_COUNT: 'ATTRIBUTE_NAMES.QUESTION_COUNT',
    QUESTION_COUNT_BEFORE: 'ATTRIBUTE_NAMES.QUESTION_COUNT_BEFORE',
    QUESTION_COUNT_AFTER: 'ATTRIBUTE_NAMES.QUESTION_COUNT_AFTER',
    QUESTIONS: 'ATTRIBUTE_NAMES.QUESTIONS',
    USED_QUESTIONS: 'ATTRIBUTE_NAMES.USED_QUESTIONS',
    UNUSED_QUESTIONS: 'ATTRIBUTE_NAMES.UNUSED_QUESTIONS'
  },

  ACTION_LABELS: {
    ACTIONS: 'ACTION_LABELS.ACTIONS',
    EDIT: 'ACTION_LABELS.EDIT',
    DELETE: 'ACTION_LABELS.DELETE',
    CANCEL: 'ACTION_LABELS.CANCEL',
    SAVE: 'ACTION_LABELS.SAVE',
    SHOW_ANSWERS: 'ACTION_LABELS.SHOW_ANSWERS',
    HIDE_ANSWERS: 'ACTION_LABELS.HIDE_ANSWERS',
    EDIT_ANSWERS: 'ACTION_LABELS.EDIT_ANSWERS',
    NO_EDIT_ANSWERS: 'ACTION_LABELS.NO_EDIT_ANSWERS',
    ADD_QUESTION: 'ACTION_LABELS.ADD_QUESTION',
    ADD_PREDEFINED_QUIZ: 'ACTION_LABELS.ADD_PREDEFINED_QUIZ',
    REMOVE: 'ACTION_LABELS.REMOVE',
    ADD_QUESTIONS: 'ACTION_LABELS.ADD_QUESTIONS',
    BACK_TO_START: 'ACTION_LABELS.BACK_TO_START',
    PLAY: 'ACTION_LABELS.PLAY',
    NEXT_QUESTION: 'ACTION_LABELS.NEXT_QUESTION',
    FINISH_QUIZ: 'ACTION_LABELS.FINISH_QUIZ'
  },

  CONFIRMATION: {
    DELETE_QUESTION: 'CONFIRMATION.DELETE_QUESTION',
    DELETE_QUIZ: 'CONFIRMATION.DELETE_QUIZ'
  },

  SUCCESS: {
    QUESTION_CREATED: 'SUCCESS.QUESTION_CREATED',
    QUIZ_CREATED: 'SUCCESS.QUIZ_CREATED'
  },

  INFO: {
    NO_USED_QUESTIONS: 'INFO.NO_USED_QUESTIONS',
    NO_UNUSED_QUESTIONS: 'INFO.NO_UNUSED_QUESTIONS',
    NO_PREDEFINED_QUIZ: 'INFO.NO_PREDEFINED_QUIZ',
    QUESTION: 'INFO.QUESTION',
    CORRECT_ANSWERS: 'INFO.CORRECT_ANSWERS',
    WRONG_ANSWERS: 'INFO.WRONG_ANSWERS',
    RANDOM_QUIZ_NAME: 'INFO.RANDOM_QUIZ_NAME',
    NO_RANDOM_QUIZ_SINCE_NO_QUESTIONS: 'INFO.NO_RANDOM_QUIZ_SINCE_NO_QUESTIONS',
    NO_QUESTIONS: 'INFO.NO_QUESTIONS'
  }
}
