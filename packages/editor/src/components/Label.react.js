import React from 'react';
import PropTypes from 'prop-types';
import Label from 'react-bootstrap/lib/Label';

export default function FixedLabel({ message, style, ...rest }) {
  return (
    <Label
      className='oc-fsm-crud-editor--label'
      style={{
        ...(!message && { opacity: 0 }),
        ...style
      }}
      {...rest}
    >
      {message ? message : '\u00A0'}
    </Label>
  )
}

FixedLabel.propTypes = {
  message: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string)
}
