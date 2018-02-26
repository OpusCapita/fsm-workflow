import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import withExpressionInput from './PathExpressionInputInjector';

@withExpressionInput
export default class GenericInput extends PureComponent {
  render() {
    const { id, label, component: Component, ...props } = this.props;

    let renderLabel = label;

    if (typeof label === 'function') {
      const Label = label;
      renderLabel = (<Label/>)
    }

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{renderLabel}</ControlLabel>
        <Component {...props}/>
      </FormGroup>
    )
  }
}

GenericInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  component: PropTypes.func.isRequired
}
