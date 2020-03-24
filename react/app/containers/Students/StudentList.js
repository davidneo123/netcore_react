/* eslint-disable */
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ButtonToolbar,Button } from 'react-bootstrap';
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import  './style.css';
  
const getCaret = direction => {
    if (direction === 'asc') {
        return (
            <span> <i className="fa fa-sort-asc" aria-hidden="true"/></span>
        );
    }

    if (direction === 'desc') {
        return (
            <span> <i className="fa fa-sort-desc" aria-hidden="true"/></span>
        );
    }
    
    return (
        <span> <i className="fa fa-sort" aria-hidden="true" /></span>
    );
};

const Student = (props) => {

    let options = {
        sortIndicator: true,
        noDataText:<FormattedMessage {...messages.noDataText} />
    };

    let selectRowProp = {
        mode: 'radio',
        bgColor: '#c1f291',
        onSelect: props.handleRowSelect,
        clickToSelect: true, 
        hideSelectColumn: true            
    };

    let  ActiveFormatter =  (active)=>{
          return (
            <input type='checkbox' checked={ active } readOnly/>
          );
      }
      
      function activeFormatter(cell,row) {
        return (
          <ActiveFormatter active={ cell } />
        );
      }
      
    return (
        <BootstrapTable pagination data={props.students?props.students:null} selectRow={selectRowProp}  options={options} bordered={false} striped hover condensed>
            <TableHeaderColumn dataField="id" isKey>Id</TableHeaderColumn>                
            <TableHeaderColumn 
                dataField="username"                    
                dataSort={true}
                caretRender={getCaret}
                columnTitle
            >Username
            </TableHeaderColumn>
            <TableHeaderColumn 
                dataField="firstName"                    
                caretRender={getCaret}
                columnTitle
            >First Name
            </TableHeaderColumn>
            <TableHeaderColumn 
                dataField="lastName"                    
                caretRender={getCaret}
                columnTitle
            >Last Name
            </TableHeaderColumn>  
            <TableHeaderColumn 
                dataField="age"                    
                caretRender={getCaret}
                columnTitle
            >Age
            </TableHeaderColumn>                    
            <TableHeaderColumn 
                dataField="career"                    
                caretRender={getCaret}
                columnTitle
            >Career
            </TableHeaderColumn>                    
        </BootstrapTable>
    );
}


export default function StudentList(props) {
     const [studentId, setStudentId] = useState(null);
     const [redirect, setRedirect] = useState(false);
     const [remove, setRemove] = useState(false);
     const [type, setType] = useState('');


    const renderRedirect = () => {    
        if (redirect) {
            return <Redirect to={{
                pathname: '/StudentForm',
                state: { studentId, typeForm: type }
            }}/>
        }
    }

    const removeItem = () => {    
        if (remove) {
            props.removeStudentId(studentId) 
            setRemove(!remove)
        }
    }

    const editStudent = (type) => {
        if (studentId || type==='new') {
            setType(type)
            setRedirect(true)
        } else {
            Swal.fire({
                title: 'Please select a student',
                icon: 'info',
                confirmButtonText: 'Ok'
            });
        }
    }

    const removeStudent = () => {
        if (studentId >0) {
            setRemove(true)
        } else {
            Swal.fire({
                title: 'Please select one student to remove',
                icon: 'info',
                confirmButtonText: 'Ok'
            });
        }
    }
    

    const handleRowSelect = (row, isSelected) => {        
        if (isSelected) {
            setStudentId(row.id);
        }else{setStudentId(0)}
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Students</h1>
                    </div>
                </div>
                <ButtonToolbar>
                    {[renderRedirect(),removeItem()]}   
                    <div style ={{textAlign:"center"}}>     
                        <Button type="button" className="btn btn-primary btnStudent"  onClick={() => editStudent('new')}>
                            New Student
                        </Button>
                        <Button type="button" className="btn btn-warning ml-2 btnStudent" onClick={() => editStudent('edit')}      >
                            Edit Student
                        </Button>
                        <Button type="button" className="btn btn-success ml-2 btnStudent"   onClick={() => removeStudent()} >
                            Remove Student
                        </Button>
                    </div>
                </ButtonToolbar>
                <div className="row">
                    <div className="col">
                        <Student students={props.data} handleRowSelect={handleRowSelect} />
                    </div>
                </div>
            </div>
        </div>
    );
}