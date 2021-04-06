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
    MANAGE_QUESTIONS: 'BUTTONS.MANAGE_QUESTIONS'
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
  },

  ACTION_LABELS: {
    ACTIONS: 'ACTION_LABELS.ACTIONS',
    EDIT: 'ACTION_LABELS.EDIT',
    DELETE: 'ACTION_LABELS.DELETE',
    SHOW_ANSWERS: 'ACTION_LABELS.SHOW_ANSWERS',
    HIDE_ANSWERS: 'ACTION_LABELS.HIDE_ANSWERS',
  }
}
