import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import { withExpressionInput } from '@opuscapita/fsm-workflow-editor';

const splitFullName = str => {
  const s = (str || '').replace(/ +(?= )/g, '');
  const spaceIndex = s.indexOf(' ');
  return [s.slice(0, spaceIndex), s.slice(spaceIndex + 1)];
}

@withExpressionInput
export default class FullName extends PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    component: PropTypes.func
  }

  constructor(...args) {
    super(...args);
    const [first, last] = splitFullName(this.props.value);
    this.state = { first, last }
  }

  componentWillReceiveProps({ value }) {
    const [first, last] = splitFullName(value);
    this.setState(prevState => ({
      ...(first !== prevState.first && { first }),
      ...(last !== prevState.last && { last })
    }))
  }

  handleChange = _ => {
    const { first, last } = this.state;
    this.props.onChange(first + ' ' + last)
  }

  handleChangeFirstName = ({ target: { value } }) => this.setState({
    first: value.trim()
  }, this.handleChange)

  handleChangeLastName = ({ target: { value } }) => this.setState({
    last: value
  }, this.handleChange)

  render() {
    const { label, component: Component, value } = this.props;
    const { first, last } = this.state;

    // TODO maybe move this logic to HOC; it doesn't belong here
    let renderLabel = label;

    if (typeof label === 'function') {
      const Label = label;
      renderLabel = (<Label/>)
    }

    return (
      <FormGroup>
        <ControlLabel>{renderLabel}</ControlLabel>
        {
          Component ?
            (
              <Component value={value} onChange={this.props.onChange}/>
            ) :
            (
              <div>
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
              </div>
            )
        }
      </FormGroup>
    )
  }
}
