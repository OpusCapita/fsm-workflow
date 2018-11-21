import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';

export default function StringInput({ value, onChange, ...props }, { i18n }) {
  return (
    <FormControl
      placeholder={i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.stringInput.placeholder')}
      type='text'
      {...props}
      value={value || ''}
      onChange={({ target: { value } }) => onChange(value)}
    />
  )
}

StringInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

StringInput.contextTypes = {
  i18n: PropTypes.object.isRequired
}
