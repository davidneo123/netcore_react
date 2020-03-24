/**
 * Gets the studentsitories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_STUDENTS, REMOVE_STUDENT } from './constants';
import { studentsLoaded, studentLoadingError} from './actions';
import {STUDENT_URI} from '../../utils/apis';
import {makeSelectStudentId} from './selectors';

/**
 *  students request/response handler
 */
export function* getStudents() {
  try {
    const students = yield call(request, STUDENT_URI);
    yield put(studentsLoaded(students));
  } catch (err) {
    yield put(studentLoadingError(err));
  }
}

/**
 *  students request/response handler
 */
export function* removeStudentId() {
  try {
    let options = {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
    }
    const id = yield select(makeSelectStudentId());
    console.log(' en saga ',id)
    let uri = STUDENT_URI + '?id=' + id;
    console.log(uri,' options: ', options)
    const payload = yield call(request, uri, options);
    console.log(payload)
    const students = yield call(request, uri);
    yield put(studentsLoaded(students));
  } catch (err) {
    yield put(studentLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* studentsData() {
  // Watches for LOAD_studentS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(LOAD_STUDENTS, getStudents);
  yield takeLatest(REMOVE_STUDENT, removeStudentId);
}