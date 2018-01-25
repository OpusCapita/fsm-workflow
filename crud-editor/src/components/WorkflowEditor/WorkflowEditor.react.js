import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find'; // IE11 lacks Array.prototype.find
import TopForm from '../TopForm.react';
import TransitionsTable from '../TransitionsTable';
import WorkflowGraph from '../WorkflowGraph';
import { getExistingStates } from '../utils';
import CodeEditor from '../CodeEditor';
import './styles.less';

export default class WorkflowEditor extends PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
    title: PropTypes.string,
    exampleObject: PropTypes.object,
    workflow: PropTypes.shape({
      schema: PropTypes.shape({
        name: PropTypes.string,
        initialState: PropTypes.string,
        finalStates: PropTypes.arrayOf(PropTypes.string),
        objectStateFieldName: PropTypes.string,
        transition: PropTypes.shape({
          from: PropTypes.string,
          to: PropTypes.string,
          event: PropTypes.string
        })
      }),
      transitionGuards: PropTypes.arrayOf(PropTypes.shape({
        transition: PropTypes.shape({
          from: PropTypes.string,
          to: PropTypes.string,
          event: PropTypes.string
        }),
        guards: PropTypes.arrayOf(PropTypes.shape({
          body: PropTypes.string
        }))
      }))
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

  stateFromProps = props => {
    const schema = (props.workflow || {}).schema || {};

    const transitionGuards = (props.workflow || {}).transitionGuards || [];

    const transitions = (schema.transitions || []).map(schemaTransition => ({
      ...schemaTransition,
      guards: (find(transitionGuards, ({ transition }) => isEqual(transition, schemaTransition)) || {}).guards || []
    }))

    const newState = {
      schema: {
        ...schema,
        transitions
      }
    }

    return newState
  }

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

  handleSaveTransitionGuards = index => guards => this.handleEditTransition({
    field: 'guards',
    value: guards,
    index
  })

  handleSave = _ => {
    const { schema } = this.state;

    const result = {
      schema: {
        ...schema,
        transitions: schema.transitions.map(({ from, to, event }) => ({ from, to, event }))
      },
      transitionGuards: schema.transitions.map(({ from, to, event, guards }) => ({
        transition: { from, to, event },
        guards
      }))
    }

    return this.props.onSave(result)
  }

  render() {
    const { schema } = this.state;

    const { title } = this.props;
    const jsonSchema = JSON.stringify({
      ...schema,
      transitions: schema.transitions.map(({ from, to, event }) => ({ from, to, event }))
    }, null, 2);

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

            <Tabs
              animation={false}
              id="fsm-workflow-editor"
              mountOnEnter={true}
            >
              <Tab eventKey={1} title="Schema">
                <div style={{ height: '480px', overflow: 'auto', border: '1px solid #ddd', borderTop: 'none' }}>
                  <CodeEditor
                    value={jsonSchema}
                    options={{
                      theme: "eclipse",
                      lineWrapping: true,
                      lineNumbers: true,
                      readOnly: true,
                      mode: {
                        name: 'javascript',
                        json: true
                      }
                    }}
                  />
                </div>
              </Tab>
              <Tab eventKey={2} title="Graph">
                <div style={{ height: '480px', overflow: 'auto', border: '1px solid #ddd', borderTop: 'none' }}>
                  <WorkflowGraph schema={schema} />
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Grid>
    )
  }
}
