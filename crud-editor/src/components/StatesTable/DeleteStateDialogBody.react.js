import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import statePropTypes from './statePropTypes';
import {
  FormGroup,
  Radio,
  FormControl
} from 'react-bootstrap';

// TODO maybe optimize communication between components to make it less coupled
export default class DeleteStateDialogBody extends PureComponent {
  static propTypes = {
    states: PropTypes.arrayOf(statePropTypes).isRequired,
    stateName: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  constructor(...args) {
    super(...args);

    const { states, stateName } = this.props;

    this.state = {
      alternativeState: (states.filter(({ name }) => stateName !== name)[0] || {}).name,
      selectedOptionIndex: 0
    }
  }

  handleSelectState = ({ target: { value } }) => this.setState({
    alternativeState: value
  }, _ => this.props.onSelect({ index: this.state.selectedOptionIndex, alternative: value }))

  handleSelectOption = index => _ => this.setState({
    selectedOptionIndex: index
  }, _ => this.props.onSelect({ index, alternative: this.state.alternativeState }))

  render() {
    const { states, stateName } = this.props;

    const { alternativeState, selectedOptionIndex } = this.state;

    const otherStates = states.filter(({ name }) => stateName !== name);

    return (
      <div>
        <p>{`State "${stateName}" is used in transitions. Options to proceed:`}</p>
        <FormGroup>
          <Radio
            name="radioGroup"
            checked={selectedOptionIndex === 0}
            onChange={this.handleSelectOption(0)}
          >
            Delete this state and involved transitions
          </Radio>
          <Radio
            name="radioGroup"
            checked={selectedOptionIndex === 1}
            onChange={this.handleSelectOption(1)}
          >
            {`Swap state "${stateName}" with a different one:`}
            <FormControl
              componentClass="select"
              value={alternativeState}
              onChange={this.handleSelectState}
              onFocus={this.handleSelectOption(1)}
            >
              {
                otherStates.map(({ name, description }, i) => (
                  <option value={name} key={`${name}-${i}`}>{description}</option>
                ))
              }
            </FormControl>
          </Radio>
        </FormGroup>
      </div>
    )
  }
}
