/*
 *
 * ListaErroresPage reducer
 *
 */
import produce from 'immer';
import { LOAD_STUDENT, LOAD_STUDENT_SUCCESS, LOAD_STUDENT_ERROR, 
    POST_PUT_DATA, POST_PUT_DATA_SUCCESS, POST_PUT_DATA_ERROR,
    ONCHANGE_FORM, CLEAN_DATA, RETURN } 
    from './constants';


export const initialState = {
    loading: true,
    error: false,
    studentData: {
        id: null,
        username: '',
        firstName: '',
        lastName: '',
        age: 0,
        career:''
    },
    studentId: null,
    typeForm:'',
    returnTo:false,
    dataChanged:false
  };
  

/* eslint-disable default-case, no-param-reassign */
const studentForm = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case LOAD_STUDENT:
                draft.loading = true;
                draft.error = false;
                draft.studentId = action.studentId;
                draft.typeForm = action.typeForm
                break;
            case LOAD_STUDENT_SUCCESS:
                draft.studentData = action.studentData;
                draft.loading = false;
                break;
            case LOAD_STUDENT_ERROR:
                draft.error = action.error;
                draft.loading = false;
                break;
            case CLEAN_DATA:
                draft.loading= initialState.loading,
                draft.error= initialState.error,
                draft.studentData= initialState.studentData,
                draft.studentId= initialState.studentId,
                draft.typeForm= initialState.typeForm,
                draft.returnTo= initialState.returnTo,
                draft.dataChanged= initialState.dataChanged
                break;
            case ONCHANGE_FORM:
                draft.studentData[action.field] = action.data;
                draft.dataChanged=true;
                break;
            case POST_PUT_DATA:
                draft.loading = true;
                draft.error = false;
                break;
            case POST_PUT_DATA_SUCCESS:
                draft.studentData = action.studentData;
                draft.loading = false;
                draft.returnTo = !action.returnTo;
                break;
            case POST_PUT_DATA_ERROR:
                draft.error = action.error;
                draft.loading = false;
                break; 
            case RETURN:
                draft.returnTo =!initialState.returnTo;   
        }
    });

export default studentForm;
