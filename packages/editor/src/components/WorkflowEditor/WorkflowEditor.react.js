import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import startCase from 'lodash/startCase';
import Ajv from 'ajv';
import TopForm from '../TopForm.react';
import StatesTable from '../StatesTable';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import { isDef } from '../utils';
import './styles.less';
import statePropTypes from '../StatesTable/statePropTypes';
import guardPropTypes from '../Guards/guardPropTypes';
import actionPropTypes from '../Actions/actionPropTypes';
// TODO maybe move the following flags somewhere or get rid of them completely
import {
  DELETE_STATE_TRANSITIONS,
  SWAP_STATE_IN_TRANSITIONS
} from '../StatesTable/StatesTable.react';

export default class WorkflowEditor extends PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
    title: PropTypes.string,
    workflow: PropTypes.shape({
      schema: PropTypes.shape({
        name: PropTypes.string,
        initialState: PropTypes.string,
        finalStates: PropTypes.arrayOf(PropTypes.string),
        transitions: PropTypes.arrayOf(PropTypes.shape({
          from: PropTypes.string,
          to: PropTypes.string,
          event: PropTypes.string,
          guards: PropTypes.arrayOf(guardPropTypes),
          actions: PropTypes.arrayOf(actionPropTypes)
        })),
        states: PropTypes.arrayOf(statePropTypes),
        objectConfig: PropTypes.shape({
          objectAlias: PropTypes.string,
          objectStateFieldName: PropTypes.string,
          example: PropTypes.object.isRequired,
          schema: PropTypes.object
        }).isRequired,
      }).isRequired,
      actions: PropTypes.objectOf(PropTypes.shape({
        paramsSchema: PropTypes.object
      })),
      conditions: PropTypes.objectOf(PropTypes.shape({
        paramsSchema: PropTypes.object
      }))
    }).isRequired,
    actionsComponentRegistry: PropTypes.objectOf(PropTypes.func)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  static defaultProps = {
    onSave: _ => {}
  }

  constructor(...args) {
    super(...args);

    this.state = {
      ...this.stateFromProps(this.props)
    }

    // validate input schemas and objects
    const ajv = new Ajv();

    // validate example object
    const { objectConfig } = this.props.workflow.schema;

    const valid = ajv.
      addSchema(objectConfig.schema, 'objectSchema').
      validate('objectSchema', objectConfig.example);

    if (!valid) {
      const title = `objectInfo: Example object is not valid according to its schema!\n`;
      const message = ajv.errorsText();
      console.error(`${title}${message}`)
    }

    //
    // validate action invocations
    //
    const invocations = this.props.workflow.schema.transitions.reduce(
      (invs, { actions, from, to, event }) => invs.concat(
        (actions || []).map(({ params = [], ...rest }) => ({
          ...rest,
          transition: { from, to, event },
          params: params.reduce((obj, { name, value }) => ({
            ...obj,
            [name]: value
          }), {})
        }))
      ), []
    )

    invocations.forEach(({ name, params, transition: { from, to, event } }) => {
      const valid = ajv.
        addSchema(this.props.workflow.actions[name].paramsSchema, name).
        validate(name, params);

      if (!valid) {
        const title = `Not valid action invocation in transition from "${from}" to "${to}" on "${event}"!\n`;
        const message = ajv.errorsText();
        console.error(`${title}${message}`)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.setState(this.stateFromProps(nextProps))
    }
  }

  stateFromProps = props => {
    const schema = (props.workflow || {}).schema || {};
    return ({ schema })
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

  handleSaveTransitionActions = index => actions => this.handleEditTransition({ index, actions })

  createJsonOutput = _ => {
    const { schema } = this.state;

    const transitions = schema.transitions.map(({ guards, actions, ...rest }) => ({
      ...rest,
      ...(guards && guards.length > 0 && { guards }),
      ...(actions && actions.length > 0 && { actions })
    }))

    return {
      schema: {
        ...schema,
        transitions
      }
    }
  }

  handleSave = _ => this.props.onSave(this.createJsonOutput())

  handleDeleteState = ({ name: stateName, sideEffect = {} }) => {
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

  getStateLabel = name => (({ name, description } = {}) => description || startCase(name || ''))(
    find(this.state.schema.states, ({ name: stateName }) => name === stateName)
  )

  render() {
    const { schema } = this.state;
    const { title, workflow: { actions, conditions } } = this.props;

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
                  actions={actions}
                  conditions={conditions}
                  getStateLabel={this.getStateLabel}
                  onEditTransition={this.handleEditTransition}
                  onDeleteTransition={this.handleDeleteTransition}
                  onSaveGuards={this.handleSaveTransitionGuards}
                  onSaveActions={this.handleSaveTransitionActions}
                  actionsComponentRegistry={this.props.actionsComponentRegistry}
                  objectConfig={schema.objectConfig}
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
