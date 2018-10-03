import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import ErrorLabel from '../../ErrorLabel.react';
import { valueOrNull } from '../../utils';

export default class DecimalInput extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  }

  static contextTypes = {
    i18n: PropTypes.object
  }

  constructor(...args) {
    super(...args);
    const { i18n } = this.context;
    const { value } = this.props;
    this.state = {
      value: i18n.formatDecimalNumber(valueOrNull(value)) || ''
    }
  }

  handleChange = ({ target: { value } }) => {
    const { i18n } = this.context;

    let error;

    try {
      const result = i18n.parseDecimalNumber(value || null);
      // chop long tail after decimal separator
      this.props.onChange(i18n.parseDecimalNumber(i18n.formatDecimalNumber(valueOrNull(result)) || null))
    } catch (err) {
      error = i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.decimalInput.inValid')
    } finally {
      this.setState({ value, error })
    }
  }

  handleBlur = _ => {
    const { i18n } = this.context;
    const { value } = this.state;

    try {
      const parsed = i18n.parseDecimalNumber(value || null);
      const formatted = i18n.formatDecimalNumber(valueOrNull(parsed));
      this.setState({ value: formatted || '' })
    } catch (err) {
      this.setState({ error: i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.decimalInput.inValid') })
    }
  }

  render() {
    const { value, error } = this.state;

    return (
      <div>
        <FormControl
          type='text'
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <ErrorLabel error={error}/>
      </div>
    )
  }
}

DecimalInput.propTypes = {
  value: PropTypes.number
}

DecimalInput.contextTypes = {
  i18n: PropTypes.object
}
