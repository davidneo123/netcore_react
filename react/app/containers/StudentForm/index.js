import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import React, { useEffect, memo } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FieldInput from 'components/Field';
import H1 from 'components/H1';
import { createStructuredSelector } from 'reselect';
import makeSelect,{makeSelectReturn} from './selectors';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import * as actions from './actions';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Redirect } from 'react-router-dom'

const key = 'StudentForm';

export function StudentForm(
  {location, 
    onLoad, 
    student, 
    onChangeForm, 
    cleanState, 
    onSubmitData, 
    returnTo, 
    renderRedirect,
    cancelPut
  } 
  =props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    onLoad(location.state.studentId,location.state.typeForm)
  }, []);
  useEffect(() => {return () => cleanState()}, []);
console.log(student)
  let form= student.loading || student.studentData.typeForm===''?<LoadingIndicator/>:
  <div className="container">
      <form onSubmit={(evt)=>{
        evt !== undefined && evt.preventDefault?evt.preventDefault():null;
        onSubmitData()}
      }>
        <H1>Update Student</H1>
        <Field
          type="text"
          name="username"
          label="Username"
          placeholder="Username"
          valueId={student.studentData.username}
          component={FieldInput}
          onFieldChange={onChangeForm}
          />
        <Field
          type="text"
          name ="firstName"
          label="First Name"
          placeholder="First Name"
          valueId={student.studentData.firstName}
          onFieldChange={onChangeForm}
          component={FieldInput}
          />
        <Field
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          valueId={student.studentData.lastName}
          component={FieldInput}
          onFieldChange={onChangeForm}
          />
        <Field
          type="number"
          name="age"
          label="Age"
          valueId={student.studentData.age}
          component={FieldInput}
          onFieldChange={onChangeForm}
          />
        <Field
          type="text"
          name="career"
          label="Career"
          placeholder="Career"
          valueId={student.studentData.career}
          component={FieldInput}
          onFieldChange={onChangeForm}
          />
        <div className="row mt-3">
          <div className="col">
            <div className="btn-group" role="group">
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-plus" aria-hidden="true" /> Save Student
              </button>
              <button type="button" onClick={()=> cancelPut(student.dataChanged)} className="btn btn-danger ml-2">
                  <i className="fa fa-trash-o" aria-hidden="true" /> Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

  return ([ renderRedirect(returnTo)  , form]
  );
}
StudentForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  student : PropTypes.object,
  studentId: PropTypes.string,
  onLoad: PropTypes.func,
  onSubmitData: PropTypes.func,
  cleanState: PropTypes.func,
  returnTo: PropTypes.bool,
  dataChanged: PropTypes.bool,
  cancelPut: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  student: makeSelect(),
  returnTo: makeSelectReturn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: (studentId,typeForm) => dispatch(actions.loadStudent(studentId,typeForm)),
    cleanState: () => dispatch(actions.cleanData()),
    onChangeForm: (e,field) => dispatch(actions.updateData(e, field)),
    onSubmitData: () => [dispatch(actions.putData()),Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Data saved',
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      })
    ],
    renderRedirect: (returnTo) => {if (returnTo) {
          return <Redirect to={{
              pathname: '/'
          }}/>
      }
  },
  cancelPut: (dataChanged) => {
    dataChanged?Swal.fire({
      title: 'Are you sure?',
      text: "Data changed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I want to return!'
    }).then((result) => {
      if (result.value) {
        dispatch(actions.returnTo())
      }
    }):dispatch(actions.returnTo())
    }
  }
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  );

  export default compose(
    withConnect,
    memo,
    reduxForm({
      destroyOnUnmount: true,
      enableReinitialize: true,
      keepDirtyOnReinitialize: true,
      form: 'StudentForm'
    }),
    )(StudentForm);