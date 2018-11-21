import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import ErrorLabel from '../../ErrorLabel.react';
import { valueOrNull } from '../../utils';

export default class IntegerInput extends PureComponent {
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
      value: i18n.formatNumber(valueOrNull(value)) || ''
    }
  }

  handleChange = ({ target: { value } }) => {
    const { i18n } = this.context;

    let error;

    try {
      const result = i18n.parseNumber(value || null);
      this.props.onChange(result)
    } catch (err) {
      error = i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.integerInput.inValid')
    } finally {
      this.setState({ value, error })
    }
  }

  handleBlur = _ => {
    const { i18n } = this.context;
    const { value } = this.state;

    try {
      const parsed = i18n.parseNumber(value || null);
      this.setState({ value: i18n.formatNumber(valueOrNull(parsed)) || '' })
    } catch (err) {
      this.setState({ error: i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.integerInput.inValid') })
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

IntegerInput.propTypes = {
  value: PropTypes.number
}

IntegerInput.contextTypes = {
  i18n: PropTypes.object
}
