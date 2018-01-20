import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import initialSchema from './initialSchema';
import TopForm from './TopForm.react';
import TransitionsTable from './TransitionsTable.react';
import { getExistingStates } from './utils';

export default class SchemaEditor extends PureComponent {
  state = {
    schema: initialSchema
  }

  handleNameChange = ({ target: { value: name } }) => this.setState(prevState => ({
    schema: {
      ...prevState.schema,
      name
    }
  }))

  handleInitialStateChange = initialState => this.setState(prevState => ({
    schema: {
      ...prevState.schema,
      initialState
    }
  }))

  handleFinalStatesChange = finalStates => this.setState(prevState => ({
    schema: {
      ...prevState.schema,
      finalStates
    }
  }))

  handleCreate = _ => this.setState(prevState => ({
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

    this.setState(prevState => ({
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

    this.setState(prevState => ({
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
