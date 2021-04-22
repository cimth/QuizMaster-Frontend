export const BUTTONS = {
  // start
  PLAY_QUIZ: 'Ein Quiz spielen',
  MANAGE_PREDEFINED_QUIZZES: 'Vorgegebene Quiz-Runden verwalten',
  MANAGE_QUESTIONS: 'Fragen verwalten'
}

export const ERRORS =  {
  NOT_EMPTY_ALL: 'Die angezeigten Eingabefelder dürfen nicht leer sein.',
  ADMIN_TOKEN: 'Das Admin-Token fehlt.',
  NO_ADDED_QUESTION: 'Es muss mindestens eine Frage hinzugefügt werden, um eine Änderung vorzunehmen.'
}

export const HEADERS = {
  // questions
  EDIT_QUESTION: 'Frage bearbeiten',
  DELETE_QUESTION: 'Frage löschen',
  ADD_QUESTION: 'Frage hinzufügen',
  MANAGE_QUESTIONS: 'Fragen verwalten',

  // predefined quizzes
  EDIT_QUIZ: 'Quiz bearbeiten',
  DELETE_QUIZ: 'Quiz löschen',
  MANAGE_PREDEFINED_QUIZZES: 'Vorgegebene Quiz-Runden verwalten'
}

export const ATTRIBUTE_NAMES = {
  // common
  ID: 'ID',

  // questions
  QUESTION_TEXT: 'Frage',
  CORRECT_ANSWER: 'Richtige Antwort',
  WRONG_ANSWER_1: 'Falsche Antwort 1',
  WRONG_ANSWER_2: 'Falsche Antwort 2',
  WRONG_ANSWER_3: 'Falsche Antwort 3',
  ADMIN_TOKEN: 'Admin Token',

  // predefined quizzes
  QUIZ_NAME: 'Quiz-Name',
  QUESTION_COUNT: 'Anzahl der Fragen',
  QUESTION_COUNT_BEFORE: 'Anzahl der Fragen (vor Änderung)',
  QUESTION_COUNT_AFTER: 'Anzahl der Fragen (nach Änderung)',
  QUESTIONS: 'Fragen',
  USED_QUESTIONS: 'Verwendete Fragen',
  UNUSED_QUESTIONS: 'Nicht verwendete Fragen'
}

export const ACTION_LABELS = {
  ACTIONS: 'Aktionen',
  EDIT: 'Bearbeiten',
  DELETE: 'Löschen',
  CANCEL: 'Abbrechen',
  SAVE: 'Speichern',
  SHOW_ANSWERS: 'Antworten anzeigen',
  HIDE_ANSWERS: 'Antworten ausblenden',
  EDIT_ANSWERS: 'Antworten bearbeiten',
  NO_EDIT_ANSWERS: 'Antworten nicht bearbeiten',
  ADD_QUESTION: 'Frage hinzufügen',
  ADD_PREDEFINED_QUIZ: 'Quiz hinzufügen',
  REMOVE: 'Entfernen',
  ADD_QUESTIONS: 'Fragen hinzufügen',
  BACK_TO_START: 'Zurück zum Hauptmenü'
}

export const CONFIRMATION = {
  DELETE_QUESTION: 'Soll die Frage wirklich gelöscht werden?',
  DELETE_QUIZ: 'Soll das Quiz wirklich gelöscht werden?'
}

export const SUCCESS = {
  QUESTION_CREATED: 'Die Frage wurde erfolgreich erstellt!',
  QUIZ_CREATED: 'Das Quiz wurde erfolgreich erstellt!'
}

export const INFO = {
  NO_USED_QUESTIONS: 'Aktuell sind diesem Quiz keine Fragen zugeordnet.',
  NO_UNUSED_QUESTIONS: 'Aktuell sind diesem Quiz bereits alle existierenden Fragen zugeordnet.'
}
