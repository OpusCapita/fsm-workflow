import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

const splitFullName = (str = '') => {
  const s = str.replace(/ +(?= )/g, '');
  const spaceIndex = s.indexOf(' ');
  return [s.slice(0, spaceIndex), s.slice(spaceIndex + 1)];
}

export default class FullName extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    param: PropTypes.shape({
      value: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(...args) {
    super(...args);
    const [first, last] = splitFullName(this.props.param.value);

    this.state = {
      first,
      last
    }
  }

  componentWillReceiveProps({ param: { value } = {} }) {
    const [first, last] = splitFullName(value);
    this.setState({ first, last })
  }

  handleChange = _ => {
    const { first, last } = this.state;
    this.props.onChange({ value: first + ' ' + last })
  }

  handleChangeFirstName = ({ target: { value } }) => this.setState({
    first: value.trim()
  }, this.handleChange)

  handleChangeLastName = ({ target: { value } }) => this.setState({
    last: value
  }, this.handleChange)

  render() {
    const { label } = this.props;
    const { first, last } = this.state;

    return (
      <FormGroup>
        <ControlLabel>{label}{`\u2000`}(custom component)</ControlLabel>
        <FormControl
          type="text"
          value={first || ''}
          placeholder="First name"
          onChange={this.handleChangeFirstName}
        />
        <FormControl
          type="text"
          value={last || ''}
          placeholder="Last name"
          onChange={this.handleChangeLastName}
        />
        <FormControl.Feedback />
      </FormGroup>
    )
  }
}
