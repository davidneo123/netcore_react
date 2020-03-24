import Swal from 'sweetalert2';
import {reduxForm } from 'redux-form/immutable';
import LoadingIndicator from '../../components/LoadingIndicator'
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import H2 from 'components/H2';
import makeSelect, {makeSelectStudentId} from './selectors';
import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';
import { loadStudents, cleanData, removeStudent } from './actions';
import reducer from './reducer';
import saga from './saga';
import StudentList from './StudentList';

const key = 'Students';

export function StudentsPage({
  studentId,
  removeStudentId,
  onLoad,
  studentsData}){
let {
  loading,
  error,
  students,
  } = studentsData;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
  onLoad()
  },[]);
  
  const studentsListProps = {
    loading,
    error,
    data:students.object,
    type:'student',
    removeStudentId
  };
    
  let list=studentsListProps.data !==undefined && !loading?
  <StudentList {...studentsListProps} />  : <LoadingIndicator/>
  return (
    <article>
      <Helmet>
        <title>Students API</title>
        <meta
          name="studentsDescription"
          content="Students App"
        />
      </Helmet>
      <div className="container">
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.header} />
          </H2>
        </CenteredSection>
        <Section>
          {list}
        </Section>
      </div>
    </article>
  );
}

StudentsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  studentsData : PropTypes.object,
  removeStudentId: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  studentsData: makeSelect(),
  studentId: makeSelectStudentId()
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {dispatch(loadStudents())},
    cleanData:() => {dispatch(cleanData())},
    removeStudentId: (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "Data will be lost!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to remove it!'
      }).then((result) => {
        if (result.value) {
          {dispatch(removeStudent(id))}
        }
      })
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    form: 'StudentsPage'
  }),
)(StudentsPage);
