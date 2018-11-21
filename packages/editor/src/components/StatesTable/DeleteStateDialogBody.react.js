import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import statePropTypes from './statePropTypes';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import FormControl from 'react-bootstrap/lib/FormControl';
import { getLabel } from '../utils';

// TODO maybe optimize communication between components to make it less coupled
export default class DeleteStateDialogBody extends PureComponent {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
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
    const { states, stateName, i18n } = this.props;
    const { alternativeState, selectedOptionIndex } = this.state;
    const otherStates = states.filter(({ name }) => stateName !== name);
    const getStateName = getLabel(i18n)('states');

    return (
      <div>
        <p>
          {i18n.getMessage(
            'fsmWorkflowEditor.ui.states.deleteDialog.message.description',
            { stateName: getStateName(stateName) }
          )}
        </p>
        <FormGroup>
          <Radio
            name="radioGroup"
            checked={selectedOptionIndex === 0}
            onChange={this.handleSelectOption(0)}
          >
            {i18n.getMessage('fsmWorkflowEditor.ui.states.deleteDialog.message.delete')}
          </Radio>
          <Radio
            name="radioGroup"
            checked={selectedOptionIndex === 1}
            onChange={this.handleSelectOption(1)}
          >
            {i18n.getMessage(
              'fsmWorkflowEditor.ui.states.deleteDialog.message.swap',
              { stateName: getStateName(stateName) }
            )}
            <FormControl
              componentClass="select"
              value={alternativeState}
              onChange={this.handleSelectState}
              onFocus={this.handleSelectOption(1)}
            >
              {
                otherStates.map(({ name }, i) => (
                  <option value={name} key={`${name}-${i}`}>{getStateName(name)}</option>
                ))
              }
            </FormControl>
          </Radio>
        </FormGroup>
      </div>
    )
  }
}
