import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

export default function BooleanInput({ value, ...props }) {
  return (
    <Checkbox {...props} checked={!!value} />
  )
}

BooleanInput.propTypes = {
  value: PropTypes.bool
}
