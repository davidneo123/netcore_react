import produce from 'immer';
import {
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS,
  LOAD_STUDENTS_ERROR,
  CLEAN_DATA,
  REMOVE_STUDENT
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  students: [],
  studentId: 0
}

/* eslint-disable default-case, no-param-reassign */
const studentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_STUDENTS:
        draft.loading = true;
        draft.error = false;
        draft.students = false;
        break;
      case LOAD_STUDENTS_SUCCESS:
        draft.students = action.students;
        draft.loading = false;
        break;
      case LOAD_STUDENTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CLEAN_DATA:
        draft.students = false;
        break;
      case REMOVE_STUDENT:
        draft.studentId = action.studentId;
        break;  
    }
  });

export default studentReducer;
