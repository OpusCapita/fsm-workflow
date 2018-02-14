import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';

export default function EnumInput({ value, onChange, options, type, ...props }) {
  return (
    <FormControl
      componentClass="select"
      value={String(value) || ''}
      onChange={
        ({ target: { value } }) => onChange(
          value === '' ?
            null :
            type === 'number' || type === 'integer' ?
              Number(value) :
              value
        )
      }
    >
      <option value=""></option>
      {
        options.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))
      }
    </FormControl>
  )
}

EnumInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  type: PropTypes.oneOf(['string', 'number', 'integer'])
}
