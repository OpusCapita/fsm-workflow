import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find'; // IE11 lacks Array.prototype.find
import TopForm from '../TopForm.react';
import TransitionsTable from '../TransitionsTable';
import WorkflowGraph from '../WorkflowGraph';
import { getExistingStates } from '../utils';
import './styles.less';

export default class WorkflowEditor extends PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
    title: PropTypes.string,
    exampleObject: PropTypes.object,
    workflow: PropTypes.shape({
      schema: PropTypes.object,
      guards: PropTypes.arrayOf(PropTypes.object)
    })
  }

  static defaultProps = {
    onSave: _ => {}
  }

  constructor(...args) {
    super(...args);

    this.state = this.stateFromProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.setState(this.stateFromProps(nextProps))
    }
  }

  stateFromProps = props => ({
    schema: (props.workflow || {}).schema || {},
    guards: (props.workflow || {}).guards || []
  })

  // proxy to this.setState; can be used for debugging purposes, e.g. as a logger or onChange handler
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
    const adjustedFinalStates = finalStates.filter(fs => states.indexOf(fs) > -1);

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
          (
            ({ guards: _, ...rest }) => ({
              ...rest,
              ...(guards.length > 0 && { guards: guards.map(({ name }) => ({ name })) })
            })
          )(transition) :
          transition
      )
    },
    guards: prevState.guards.
      // delete unused (not present in transitions except current one, nor in new guards)
      filter(
        ({ name }) => prevState.schema.transitions.
          reduce((names, t, i) => i === index ? names : names.concat((t.guards || []).map(({ name }) => name)), []).
          concat(guards.map(({ name }) => name)).
          indexOf(name) > -1
      ).
      // modify intersections
      map(guard => find(guards, ({ name }) => name === guard.name) || guard).
      // add newly created guards
      concat(guards.filter(({ name }) => !find(prevState.guards, ({ name: guardName }) => guardName === name)))
  }))

  handleSave = _ => this.props.onSave(this.state)

  render() {
    const { schema, guards } = this.state;

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
              transitions={schema.transitions.map(t => ({
                ...t,
                guards: (t.guards || []).map(({ name }) => find(guards, ({ name: guardName }) => guardName === name))
              }))}
              onCreate={this.handleCreateTransition}
              onEditTransition={this.handleEditTransition}
              onDeleteTransition={this.handleDeleteTransition}
              onSaveGuards={this.handleSaveTransitionGuards}
              exampleObject={this.props.exampleObject}
            />

<<<<<<< HEAD
            <Tabs
              activeKey={this.state.key}
              onSelect={this.handleSelect}
              animation={false}
              id="fsm-workflow-editor"
            >
              <Tab eventKey={1} title="Graph">
                <div style={{ height: '480px', overflow: 'auto', border: '1px solid #ddd', borderTop: 'none' }}>
                  <WorkflowGraph schema={schema} />
                </div>
              </Tab>
              <Tab eventKey={2} title="Schema">
                <div style={{ height: '480px', overflow: 'auto', border: '1px solid #ddd', borderTop: 'none' }}>
                  <pre style={{ border: 'none' }}>{JSON.stringify(schema, null, 1)}</pre>
                </div>
              </Tab>
            </Tabs>
=======
            <h2>Updated schema</h2>
            <pre>{JSON.stringify(this.state.schema, null, 1)}</pre>
>>>>>>> issue-23/workflow-editor
          </Col>
        </Row>
      </Grid>
    )
  }
}
