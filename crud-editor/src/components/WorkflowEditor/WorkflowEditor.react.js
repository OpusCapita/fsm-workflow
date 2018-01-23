import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import initialSchema from './initialSchema';
import TopForm from '../TopForm.react';
import TransitionsTable from '../TransitionsTable';
import { getExistingStates } from '../utils';
import './styles.less';

export default class WorkflowEditor extends PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
    title: PropTypes.string,
    exampleObject: PropTypes.object
  }

  static defaultProps = {
    onSave: _ => {}
  }

  state = {
    schema: initialSchema,
    conditions: {}
  }

  setNewState = setFunc => this.setState(setFunc)

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

  handleCreateTransition = _ => this.setNewState(prevState => ({
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

  handleCreateCondition = _ => this.setNewState(prevState => ({
    conditions: {
      ...prevState.conditions,

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

  handleSaveTransitionGuards = index => guards => this.setNewState(prevState => ({
    schema: {
      ...prevState.schema,
      transitions: prevState.schema.transitions.map(
        (transition, i) => i === index ?
          { ...transition, guards } :
          transition
      )
    }
  }))

  handleSave = _ => this.props.onSave(this.state.schema)

  render() {
    const { schema } = this.state;

    const { title } = this.props;

    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <h1>
              Workflow Editor{title && `:\u00A0${title}`}
              <Button
                bsStyle="primary"
                style={{ float: 'right', marginTop: '16px' }}
                disabled={!schema.name ||
                  schema.transitions.some(({ from, to, event }) => !(from && to && event))
                }
                onClick={this.handleSave}
              >
                Save
              </Button>
            </h1>
            <TopForm
              schema={schema}
              onNameChange={this.handleNameChange}
              onInitialStateChange={this.handleInitialStateChange}
              onFinalStatesChange={this.handleFinalStatesChange}
            />

            <TransitionsTable
              transitions={schema.transitions}
              onCreate={this.handleCreateTransition}
              onEditTransition={this.handleEditTransition}
              onDeleteTransition={this.handleDeleteTransition}
              onSaveGuards={this.handleSaveTransitionGuards}
              exampleObject={this.props.exampleObject}
            />

            <h2>Updated schema</h2>
            <pre>{JSON.stringify(schema, null, 1)}</pre>
          </Col>
        </Row>
      </Grid>
    )
  }
}
