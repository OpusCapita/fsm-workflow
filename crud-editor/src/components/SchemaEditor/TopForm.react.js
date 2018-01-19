import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import Select from '@opuscapita/react-select';
import { state2rs, rs2state, existingStates } from './utils';

export default class TopForm extends PureComponent {

  handleNameChange = this.props.onNameChange;

  handleInitialStateChange = initialState => this.props.onInitialStateChange(initialState && rs2state(initialState));

  handleFinalStatesChange = finalStates => this.props.onFinalStatesChange(finalStates.map(rs2state));

  render() {
    const { schema } = this.props;

    const states = existingStates(schema.transitions);

    return (
      <div>
        <h1>FSM Workflow Editor</h1>
        <Form horizontal>
          <FormGroup controlId="fsmName">
            <Col componentClass={ControlLabel} sm={2}>
              FSM name
          </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Name of your FSM schema"
                value={schema.name}
                onChange={this.handleNameChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="initialState">
            <Col componentClass={ControlLabel} sm={2}>
              Initial state
          </Col>
            <Col sm={10}>
              <Select
                options={states.map(state2rs)}
                multi={false}
                onChange={this.handleInitialStateChange}
                value={schema.initialState && state2rs(schema.initialState)}
                placeholder="FSM initial state"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="finalStates">
            <Col componentClass={ControlLabel} sm={2}>
              Final states
          </Col>
            <Col sm={10}>
              <Select
                options={states.map(state2rs)}
                multi={true}
                onChange={this.handleFinalStatesChange}
                value={schema.finalStates.map(state2rs)}
                placeholder="FSM final states"
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
