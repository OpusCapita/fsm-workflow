import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default class GenericInput extends PureComponent {
  render() {
    const { id, label, component: Component, ...props } = this.props;

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <Component
          {...props}
          placeholder="Enter value"
        />
      </FormGroup>
    )
  }
}

GenericInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}
