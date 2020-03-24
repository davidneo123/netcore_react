import { createSelector } from 'reselect';
import { initialState } from './reducer';

const studentFormState = state => state && state.StudentForm || initialState;

const makeSelect = () =>
createSelector(
  studentFormState,
  state => state,
);

const makeSelectStudentId = () =>
createSelector(
  studentFormState,
  state => state.studentId,
);

const makeSelectType = () =>
createSelector(
  studentFormState,
  state => state.typeForm,
);

const makeSelectReturn = () =>
createSelector(
  studentFormState,
  state => state.returnTo,
);

export default makeSelect;
export {makeSelectStudentId, makeSelectType, makeSelectReturn};