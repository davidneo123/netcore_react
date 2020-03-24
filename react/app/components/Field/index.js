import React from 'react';
import PropTypes from 'prop-types';

const FieldInput = ({valueId,input, type, label, placeholder,onFieldChange, meta: {touched, error, warning}}) => {
   input.checked= valueId
    return(
            <div className="form-group">
                <label htmlFor={input.name}>{label}</label>
                <div className="field">
                    <input 
                        {...input} 
                        type={type}
                        name={input.name}
                        className="form-control"
                        placeholder={placeholder} 
                        value = {valueId}
                        // defaultChecked= {valueId}
                        onChange={data =>{
                            let val = type==='checkbox'?!JSON.parse(data.currentTarget.value):
                            type==='number'?parseInt(data.currentTarget.value):data.currentTarget.value
                            onFieldChange(val,input.name)
                       }}
                    />
                    
                    {touched && ((error && <p className="text-danger">{error}</p>) || (warning && <p className="text-danger">{warning}</p>))}
                </div>
            </div>
    );
};

FieldInput.propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,   
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired,
};

export default FieldInput;
