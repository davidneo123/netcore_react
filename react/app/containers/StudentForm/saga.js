import { call, put, takeLatest,select } from 'redux-saga/effects';
import { LOAD_STUDENT, POST_PUT_DATA } 
from './constants';
import {STUDENT_URI} from '../../utils/apis';
import { studentLoaded,studentLoadingError, dataPutted, putDataError } 
from './actions';
import makeSelect,{makeSelectStudentId, makeSelectType} from './selectors'
import request from '../../utils/request';
import {initialState} from './reducer'

export function* getStudent() {
  const studentId = yield select(makeSelectStudentId());
  const type = yield select(makeSelectType());
  try {
        let resultStudent = type==='new' ?{object:initialState.studentData}:        
        yield call(request, `${STUDENT_URI}/${studentId}`)
        yield put(studentLoaded(resultStudent.object||resultStudent));
    } catch (err) {
       console.log(err);
       yield put(studentLoadingError(err));
    }
}

export function* putAndPostData() {
    const type = yield select(makeSelectType());
    const data = yield select(makeSelect());
    let method =  'put'
    let dataDef = {...data.studentData}
    if (type ==='new'){
        method ='post'
        delete dataDef['id']
    }    
    let options = {
        method: method,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dataDef)
     }
     console.log(options);


    try {
        let puttedStudent = yield call(request, STUDENT_URI, options)
        yield put(dataPutted(puttedStudent));
      } catch (err) {
         console.log(err);
         yield put(putDataError(err));
      }
  }

export default function* studentFormSaga() {
    yield takeLatest(LOAD_STUDENT, getStudent);
    yield takeLatest(POST_PUT_DATA, putAndPostData);
}