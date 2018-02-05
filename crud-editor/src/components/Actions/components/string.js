import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

export default function StringInput({ value, ...props }) {
  return (
    <FormControl {...props} type='text' value={value || ''}/>
  )
}

StringInput.propTypes = {
  value: PropTypes.string
}
