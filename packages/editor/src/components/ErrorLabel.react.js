import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label.react';

export default function ErrorLabel({ error }) {
  return (
    <Label bsStyle="danger" message={error} />
  )
}

ErrorLabel.propTypes = {
  error: PropTypes.string
}
