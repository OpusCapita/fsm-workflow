import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import TopForm from '../TopForm.react';
import StatesTable from '../StatesTable';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import { isDef } from '../utils';
import './styles.less';
import statePropTypes from '../StatesTable/statePropTypes';
import {
  DELETE_STATE_TRANSITIONS,
  SWAP_STATE_IN_TRANSITIONS
} from '../StatesTable/StatesTable.react';

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
          event: PropTypes.string,
          guards: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
          }))
        }),
        states: PropTypes.arrayOf(statePropTypes)
      }),
      guards: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
      }))
    })
  }

  static defaultProps = {
    onSave: _ => {}
  }

  constructor(...args) {
    super(...args);

    this.state = {
      ...this.stateFromProps(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.setState(this.stateFromProps(nextProps))
    }
  }

  stateFromProps = props => {
    const schema = (props.workflow || {}).schema || {};

    const transitions = (schema.transitions || []);

    const guardDefinitions = (this.props.workflow || {}).guards || [];

    return ({
      schema: {
        ...schema,
        transitions: transitions.map(({ guards, ...rest }) => ({
          ...rest,
          ...(guards && {
            guards: guards.map(({ name }) => ({
              name,
              body: find(guardDefinitions, ({ name: guardName }) => name === guardName).body
            }))
          })
        }))
      }
    })
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

  handleEditTransition = ({ index, ...rest }) => this.setNewState(prevState => ({
    schema: {
      ...prevState.schema,
      transitions: [
        ...(
          isDef(index) ?
            prevState.schema.transitions.map((t, i) => i === index ? { ...t, ...rest } : t) :
            prevState.schema.transitions.concat({ ...rest })
        )
      ]
    }
  }))

  handleDeleteTransition = index => {
    const { transitions } = this.state.schema;

    this.setNewState(prevState => ({
      schema: {
        ...prevState.schema,
        transitions: [
          ...transitions.slice(0, index),
          ...transitions.slice(index + 1)
        ]
      }
    }))
  }

  handleSaveTransitionGuards = index => guards => this.handleEditTransition({ index, guards })

  createJsonOutput = _ => {
    const { schema } = this.state;

    const guards = schema.transitions.reduce((acc, { guards }) => acc.concat(guards || []), []);

    const transitions = schema.transitions.map(({ guards, ...rest }) => ({
      ...rest,
      ...(guards && guards.length > 0 && {
        guards: guards.map(({ name }) => ({ name }))
      })
    }))

    return {
      schema: {
        ...schema,
        transitions
      },
      guards
    }
  }

  handleSave = _ => this.props.onSave(this.createJsonOutput())

  handleDeleteState = ({ name: stateName, sideEffect }) => {
    const { name: sideEffectName, alternative } = sideEffect;

    return this.setNewState(prevState => ({
      schema: {
        ...prevState.schema,
        states: prevState.schema.states.filter(({ name }) => name !== stateName),
        ...(sideEffectName && {
          transitions: sideEffectName === DELETE_STATE_TRANSITIONS ?
            prevState.schema.transitions.filter(({ from, to }) => !(from === stateName || to === stateName)) :
            sideEffectName === SWAP_STATE_IN_TRANSITIONS ?
              prevState.schema.transitions.map(({ from, to, ...rest }) => ({
                ...rest,
                from: from === stateName ? alternative : from,
                to: to === stateName ? alternative : to
              })) :
              prevState.schema.transitions
        }),
        initialState: prevState.schema.initialState === stateName ? '' : prevState.schema.initialState,
        finalStates: prevState.schema.finalStates.filter(state => state !== stateName)
      }
    }))
  }

  handleEditState = ({
    initialName,
    name,
    description,
    isInitial,
    isFinal
  }) => this.setNewState(prevState => initialName ?
    // edited previously existed state
    ({
      schema: {
        ...prevState.schema,
        states: prevState.schema.states.map(state => state.name === initialName ? { name, description } : state),
        initialState: (initialState => isInitial ?
          name :
          initialState === initialName ?
            '' :
            initialState
        )(prevState.schema.initialState),
        finalStates: (fs => fs.indexOf(initialName) > -1 && isFinal === false ?
          fs.filter(state => state !== initialName) :
          fs.indexOf(initialName) > -1 && isFinal ? // should rename
            fs.map(state => state === initialName ? name : state) :
            isFinal ?
              fs.concat(name) : // state was not already final -> should add state to finalStates
              fs // nothing to do
        )(prevState.schema.finalStates),
        transitions: prevState.schema.transitions.map(({ from, to, ...other }) => ({
          ...other,
          from: from === initialName ? name : from,
          to: to === initialName ? name : to
        }))
      }
    }) :
    // add new state
    ({
      schema: {
        ...prevState.schema,
        states: prevState.schema.states.concat({ name, description }),
        ...(isInitial && { initialState: name }),
        ...(isFinal && {
          finalStates: prevState.schema.finalStates.concat(name)
        })
      }
    })
  )

  getStateLabel = name => (({ name, description } = {}) => description || name)(
    find(this.state.schema.states, ({ name: stateName }) => name === stateName)
  )

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
              name={schema.name}
              onNameChange={this.handleNameChange}
            />

            <Tabs
              animation={false}
              id="fsm-workflow-editor-elements"
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Tab eventKey={1} title={(<h4>States</h4>)}>
                <StatesTable
                  states={schema.states}
                  statesInTransitions={
                    schema.transitions.reduce(
                      (involvedStates, transition) => ['from', 'to'].reduce(
                        (acc, key) => involvedStates.indexOf(transition[key]) === -1 ?
                          acc.concat(transition[key]) :
                          acc
                        , involvedStates
                      ), []
                    )
                  }
                  initialState={schema.initialState}
                  finalStates={schema.finalStates}
                  onDelete={this.handleDeleteState}
                  onEdit={this.handleEditState}
                />
              </Tab>
              <Tab eventKey={2} title={(<h4>Transitions</h4>)}>
                <TransitionsTable
                  transitions={schema.transitions}
                  states={schema.states.map(({ name }) => name)}
                  getStateLabel={this.getStateLabel}
                  exampleObject={this.props.exampleObject}
                  onEditTransition={this.handleEditTransition}
                  onDeleteTransition={this.handleDeleteTransition}
                  onSaveGuards={this.handleSaveTransitionGuards}
                />
              </Tab>
            </Tabs>

            <EditorOutput
              schema={schema}
              getStateLabel={this.getStateLabel}
              createJsonOutput={this.createJsonOutput}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}
