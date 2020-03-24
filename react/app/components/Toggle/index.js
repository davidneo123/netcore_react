/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = <option>--</option>;
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption className="field" key={value.id} value={value.id.toString()} name={value.client} />
    ));
  }

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
     
    <Select  {...props.input} type={props.type} name={props.name} className="form-control" value={props.valueId} 
        onChange={(data)=>{
          props.onToggle(parseInt(data.currentTarget.value), props.input.name)}
         }>
      <option>--</option>
      {content}
    </Select>
    </div>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  value: PropTypes.string,
  id: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
