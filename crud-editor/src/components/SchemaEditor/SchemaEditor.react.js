import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import initialSchema from './initialSchema';
import TopForm from './TopForm.react';
import TransitionsTable from './TransitionsTable.react';
import { getExistingStates } from './utils';

export default class SchemaEditor extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: _ => {}
  }

  state = {
    schema: initialSchema
  }

  emitIfValid = schema => {
    const isValid = schema.name &&
      !schema.transitions.some(({ from, to, event }) => !(from && to && event));

    if (isValid) {
      this.props.onChange(schema);
    }
  }

  setNewState = setFunc => this.setState(setFunc, _ => this.emitIfValid(this.state.schema))

  handleNameChange = ({ target: { value: name } }) => this.setNewState(prevState => ({
    schema: {
      ...prevState.schema,
      name
    }
  }))

  handleInitialStateChange = initialState => this.setNewState(prevState => ({
    schema: {
      ...prevState.schema,
      initialState
    }
  }))

  handleFinalStatesChange = finalStates => this.setNewState(prevState => ({
    schema: {
      ...prevState.schema,
      finalStates
    }
  }))

  handleCreate = _ => this.setNewState(prevState => ({
    schema: {
      ...prevState.schema,
      transitions: [
        ...prevState.schema.transitions,
        {
          event: null,
          from: null,
          to: null
        }
      ]
    }
  }))

  handleEditTransition = ({ field, value, index }) => {
    const { finalStates, transitions } = this.state.schema;

    const newTransitions = transitions.map(
      (t, i) => i === index ?
        { ...t, [field]: value } :
        t
    );

    const { resetInitialState, adjustedFinalStates } = this.adjustAvailableStates(newTransitions);

    this.setNewState(prevState => ({
      schema: {
        ...prevState.schema,
        transitions: newTransitions,
        ...(resetInitialState && { initialState: null }),
        ...(adjustedFinalStates.length < finalStates.length && { finalStates: adjustedFinalStates })
      }
    }))
  }

  handleDeleteTransition = index => {
    const { finalStates, transitions } = this.state.schema;

    const newTransitions = [
      ...transitions.slice(0, index),
      ...transitions.slice(index + 1)
    ];

    const { resetInitialState, adjustedFinalStates } = this.adjustAvailableStates(newTransitions);

    this.setNewState(prevState => ({
      schema: {
        ...prevState.schema,
        transitions: newTransitions,
        ...(resetInitialState && { initialState: null }),
        ...(adjustedFinalStates.length < finalStates.length && { finalStates: adjustedFinalStates })
      }
    }))
  }

  adjustAvailableStates = newTransitions => {
    const { initialState, finalStates } = this.state.schema;

    const states = getExistingStates(newTransitions);

    const resetInitialState = states.indexOf(initialState) === -1;
    const adjustedFinalStates = finalStates.filter(fs => states.indexOf(fs) > -1)

    return {
      resetInitialState,
      adjustedFinalStates
    }
  }

  render() {
    const { schema } = this.state;

    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2} sm={12}>
            <TopForm
              schema={schema}
              onNameChange={this.handleNameChange}
              onInitialStateChange={this.handleInitialStateChange}
              onFinalStatesChange={this.handleFinalStatesChange}
            />

            <TransitionsTable
              transitions={schema.transitions}
              onCreate={this.handleCreate}
              onEditTransition={this.handleEditTransition}
              onDeleteTransition={this.handleDeleteTransition}
            />

            <h2>Updated schema</h2>
            <pre>{JSON.stringify(schema, null, 1)}</pre>
          </Col>
        </Row>
      </Grid>
    )
  }
}
