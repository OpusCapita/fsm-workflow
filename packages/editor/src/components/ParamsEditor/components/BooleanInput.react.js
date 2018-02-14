import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-bootstrap/lib/Checkbox';

export default function BooleanInput({ value, onChange, ...props }) {
  return (
    <Checkbox
      {...props}
      checked={!!value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  )
}

BooleanInput.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}
