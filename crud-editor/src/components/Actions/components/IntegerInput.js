import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Label } from 'react-bootstrap';

export default class IntegerInput extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  }

  static contextTypes = {
    i18n: PropTypes.object
  }

  state = {
    value: this.context.i18n.formatNumber(this.props.value || null) || ''
  }

  handleChange = ({ target: { value } }) => {
    const { i18n } = this.context;

    let error;

    try {
      const result = i18n.parseNumber(value || null);
      this.props.onChange({ target: { value: result } })
    } catch (err) {
      error = 'Not a valid integer'
    } finally {
      this.setState({ value, error })
    }
  }

  handleBlur = _ => {
    const { i18n } = this.context;
    const { value } = this.state;

    try {
      const parsed = i18n.parseNumber(value || null);
      this.setState({
        value: i18n.formatNumber(parsed || null) || ''
      })
    } catch (err) {
      this.setState({
        error: 'Not a valid integer'
      })
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
        <Label bsStyle='danger' style={{ ...(!error && { opacity: 0 }) }}>{error}{` `}</Label>
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
