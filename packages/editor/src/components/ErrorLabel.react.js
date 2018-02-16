import React from 'react';
import PropTypes from 'prop-types';
import Label from 'react-bootstrap/lib/Label';

export default function ErrorLabel({ error }) {
  return (
    <Label
      bsStyle="danger"
      style={{
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: '8px',
        display: 'inline-block',
        ...(!error && { opacity: 0 })
      }}
    >
      {error ? error : '\u00A0'}
    </Label>
  )
}

ErrorLabel.propTypes = {
  error: PropTypes.string
}
