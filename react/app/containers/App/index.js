/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import StudentsPage from 'containers/Students/Loadable';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../../global-styles';
import StudentForm from '../StudentForm/loadable';


const AppWrapper = styled.div`
  margin: 0 0;
  display: block;
  min-height: 100%;
  flex-direction: column;
`;
const DivHeader = styled.div`
position: -webkit-sticky;
position: sticky;
top: 0;
`;
export default function App() {
  return (
    <AppWrapper >
      <div  style={{marginBottom:"2%"}}>
        <Header/>
      </div>
      <div className="container">
          <Switch>
            <Route exact path="/" component={StudentsPage} />
            <Route path="/StudentForm" component={StudentForm} />
            <Route path="/HomePage" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
      </div>
    </AppWrapper>
  );
}
