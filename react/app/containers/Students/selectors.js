import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStudents = state => state.Students || initialState;

const makeSelect = () =>
  createSelector(
    selectStudents,
    state => state,
  );

  const makeSelectStudentId = () =>
  createSelector(
    selectStudents,
    state => state.studentId,
  );

export default makeSelect;
export  {makeSelectStudentId};