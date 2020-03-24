import {
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
  REMOVE_STUDENT,
  CLEAN_DATA
} from './constants';

/**
 * Load the students, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_STUDENTS
 */
export function loadStudents() {
  return {
    type: LOAD_STUDENTS,
  };
}

/**
 * Dispatched when the students are loaded by the request saga
 *
 * @param  {array} students The studentsitory data
 *
 * @return {object}      An action object with a type of LOAD_STUDENTS_SUCCESS passing the students
 */
export function studentsLoaded(students) {
  return {
    type: LOAD_STUDENTS_SUCCESS,
    students,
  };
}

/**
 * Dispatched when loading the students fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STUDENTS_ERROR passing the error
 */
export function studentLoadingError(error) {
  return {
    type: LOAD_STUDENTS_ERROR,
    error,
  };
}

/**
 * Changes the input field of the form
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function cleanData() {
  return {
    type: CLEAN_DATA
  };
}


/**
 * Changes the input field of the form
 *
 * @return {object} An action object with a type of 
 */
export function removeStudent(studentId) {
  return {
    type: REMOVE_STUDENT,
    studentId
  }
}
