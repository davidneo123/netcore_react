import {
  LOAD_STUDENT,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_ERROR,
  ONCHANGE_FORM,
  POST_PUT_DATA,
  POST_PUT_DATA_SUCCESS,
  POST_PUT_DATA_ERROR,
  CLEAN_DATA,
  RETURN
} from './constants';

/**
 * Load the student, this action starts the request saga
 *
 * @param  {any} studentId The studentitory data
 * 
 * @param  {string} typeForm The studentitory data
 *  * 
 * @return {object} An action object with a type of LOAD_STUDENT
 */
export function loadStudent(studentId,typeForm) {
  return {
    type: LOAD_STUDENT,
    studentId,
    typeForm
  };
}

/**
 * Dispatched when the student are loaded by the request saga
 *
 * @param  {array} studentData The studentitory data
 *
 * @return {object}      An action object with a type of LOAD_STUDENT_SUCCESS passing the student
 */
export function studentLoaded(studentData) {
  return {
    type: LOAD_STUDENT_SUCCESS,
    studentData,
  };
}

/**
 * Dispatched when loading the student fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STUDENT_ERROR passing the error
 */
export function studentLoadingError(error) {
  return {
    type: LOAD_STUDENT_ERROR,
    error,
  };
}

/**
 * Dispatched when loading the student fails
 *
 * @param  {object} data The error
 *
 * @return {object}       An action object with a type of LOAD_STUDENT_ERROR passing the error
 */
export function putData(data) {
  return {
    type: POST_PUT_DATA,
    data
  };
}

/**
 * Dispatched when the student are loaded by the request saga
 *
 * @param  {object} studentData The error
 * 
 * @return {object}      An action object with a type of LOAD_STUDENT_SUCCESS passing the student
 */
export function dataPutted(studentData) {
  return {
    type: POST_PUT_DATA_SUCCESS,
    studentData
  };
}

/**
 * Dispatched when loading the student fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STUDENT_ERROR passing the error
 */
export function putDataError(error) {
  return {
    type: POST_PUT_DATA_ERROR,
    error,
  };
}

/**
 * Dispatched when the student are loaded by the request saga
 *
 * @param  {data} any The studentitory data
 *
 * @return {object}      An action object with a type of LOAD_STUDENT_SUCCESS passing the student
 */
export function updateData(data,field) {
  return {
    type: ONCHANGE_FORM,
    data,
    field
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
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function returnTo() {
  return {
    type: RETURN
  };
}