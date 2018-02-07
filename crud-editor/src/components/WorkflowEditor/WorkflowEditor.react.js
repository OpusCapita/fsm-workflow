import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import extend from 'lodash/extend';
import find from 'lodash/find';
import startCase from 'lodash/startCase';
import TopForm from '../TopForm.react';
import StatesTable from '../StatesTable';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import { MachineDefinition } from '@opuscapita/fsm-workflow-core';
import { isDef } from '../utils';
import './styles.less';
import statePropTypes from '../StatesTable/statePropTypes';
import guardPropTypes from '../Guards/guardPropTypes';
import actionPropTypes from '../Actions/actionPropTypes';
import {
  DELETE_STATE_TRANSITIONS,
  SWAP_STATE_IN_TRANSITIONS
} from '../StatesTable/StatesTable.react';

export default class WorkflowEditor extends Component {
  static propTypes = {
    onSave: PropTypes.func,
    title: PropTypes.string,
    objectInfo: PropTypes.shape({
      example: PropTypes.object.isRequired,
      schema: PropTypes.object
    }).isRequired,
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
          guards: PropTypes.arrayOf(guardPropTypes),
          actions: PropTypes.arrayOf(actionPropTypes)
        }),
        states: PropTypes.arrayOf(statePropTypes)
      }),
      actions: PropTypes.shape({
        paramsSchema: PropTypes.object
      })
    })
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  static defaultProps = {
    title: '',
    workflow: {},
    onSave: _ => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      machine: new MachineDefinition(props.workflow),
      selectedStates: [],
      selectedTransitions: [],
      activeTabKey: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.workflow, this.props.workflow)) {
      this.setState({
        machine: new MachineDefinition(nextProps.workflow)
      });
    }
  }

  // proxy to this.setState; can be used for debugging purposes, e.g. as a logger or onChange handler
  setNewState = setFunc => this.setState(setFunc);

  handleSelectStates = (selectedStates) => {
    this.setState({
      selectedStates,
      selectedTransitions: [],
      activeTabKey: 0
    });
  }

  handleSelectTransitions = (selectedTransitions) => {
    this.setState({
      selectedStates: [],
      selectedTransitions,
      activeTabKey: 1
    });
  }

  handleNameChange = ({ target: { value: name } }) => this.setNewState(prevState => {
    let machine = extend({}, prevState.machine);
    machine.schema.name = name;

    return ({ machine });
  });

  handleInitialStateChange = initialState => this.setNewState(prevState => {
    let machine = extend({}, prevState.machine);
    machine.schema.initialState = initialState;

    return ({ machine });
  });

  handleFinalStatesChange = finalStates => this.setNewState(prevState => {
    let machine = extend({}, prevState.machine);
    machine.schema.finalStates = finalStates;

    return ({ machine });
  });

  handleEditTransition = ({ index, ...rest }) => this.setNewState(prevState => {
    let machine = extend({}, prevState.machine);
    let schema = machine.schema;

    let transitions = isDef(index) ?
      schema.transitions.map((t, i) => i === index ? { ...t, ...rest } : t) :
      schema.transitions.concat({ ...rest });

    schema.transitions = transitions;
    machine.schema = schema;

    return ({ machine });
  });

  handleDeleteTransition = index => {
    let machine = extend({}, this.state.machine);

    let transitions = [
      ...machine.schema.transitions.slice(0, index),
      ...machine.schema.transitions.slice(index + 1)
    ];

    machine.schema.transitions = transitions;

    this.setNewState(prevState => ({ machine }));
  }

  handleSaveTransitionGuards = index => guards => this.handleEditTransition({ index, guards })

  handleSaveTransitionActions = index => actions => this.handleEditTransition({ index, actions })

  createJsonOutput = _ => {
    const { schema } = this.state.machine;

    const transitions = schema.transitions.map(({ guards, actions, ...rest }) => ({
      ...rest,
      ...(guards && guards.length > 0 && { guards }),
      ...(actions && actions.length > 0 && { actions })
    }));

    return {
      schema: {
        ...schema,
        transitions
      }
    };
  }

  handleSave = _ => this.props.onSave(this.createJsonOutput())

  handleDeleteState = ({ name: stateName, sideEffect = {} }) => {
    const { name: sideEffectName, alternative } = sideEffect;

    let machine = extend({}, this.state.machine);
    let schema = machine.schema;

    let states = schema.states.filter(({ name }) => name !== stateName);
    schema.states = states;

    let initialState = schema.initialState === stateName ? '' : schema.initialState;
    schema.initialState = initialState;

    let finalStates = schema.finalStates.filter(state => state !== stateName);
    schema.finalStates = finalStates;

    let transitions;
    if (!sideEffectName) {
      transitions = schema.transitions;
    } else if (sideEffectName === DELETE_STATE_TRANSITIONS) {
      transitions = schema.transitions.filter(({ from, to }) => !(from === stateName || to === stateName));
    } else if (sideEffectName === SWAP_STATE_IN_TRANSITIONS) {
      transitions = schema.transitions.map(({ from, to, ...rest }) => ({
        ...rest,
        from: from === stateName ? alternative : from,
        to: to === stateName ? alternative : to
      }));
    }

    schema.transitions = transitions;

    return this.setNewState(prevState => ({ machine }));
  }

  handleEditState = ({
    initialName,
    name,
    description,
    isInitial,
    isFinal
  }) => this.setNewState(prevState => {
    let machine = extend({}, this.state.machine);
    let schema = machine.schema;


    if (initialName) { // edited previously existed state
      let states = schema.states.map(state => state.name === initialName ? { name, description } : state);
      schema.states = states;


      let initialState;
      if (isInitial) {
        initialState = name;
      } else if (schema.initialState === initialName) {
        initialState = '';
      } else {
        initialState = schema.initialState;
      }
      schema.initialState = initialState;


      let finalStates;
      if (schema.finalStates.indexOf(initialName) > -1 && isFinal === false) {
        finalStates = schema.finalStates.filter(state => state !== initialName);
      } else if (schema.finalStates.indexOf(initialName) > -1 && isFinal) {
        finalStates = schema.finalStates.map(state => state === initialName ? name : state);
      } else if (isFinal) {
        finalStates = schema.finalStates.concat([name]);
      } else {
        finalStates = schema.finalStates;
      }
      schema.finalStates = finalStates;


      let transitions = schema.transitions.map(({ from, to, ...other }) => ({
        ...other,
        from: from === initialName ? name : from,
        to: to === initialName ? name : to
      }));
      schema.transitions = transitions;
    } else { // add new state
      let states = schema.states.concat([{ name, description }]);
      schema.states = states;

      if (isInitial) {
        schema.initialState = name;
      }

      if (isFinal) {
        let finalStates = prevState.schema.finalStates.concat(name);
        schema.finalStates = finalStates;
      }
    }

    return ({ machine });
  });

  getStateLabel = name => (({ name, description } = {}) => description || startCase(name || ''))(
    find(this.state.machine.schema.states, ({ name: stateName }) => name === stateName)
  )

  render() {
    let { title } = this.props;
    let { selectedStates, selectedTransitions, activeTabKey, machine } = this.state;

    let { schema, actions } = machine;

    let headerElement = (
      <div className="oc-fsm-crud-editor--workflow-editor__page-header">
        <h2 className="oc-fsm-crud-editor--workflow-editor__page-header-text">
          Workflow Editor <small>{title}</small>
        </h2>
        <Button
          bsStyle="primary"
          disabled={!schema.name ||
                    schema.transitions.some(({ from, to, event }) => !(from && to && event))
          }
          onClick={this.handleSave}
        >
          Save
        </Button>
      </div>
    );


    let topFormElement = (
      <div className="oc-fsm-crud-editor--workflow-editor__top-form">
        <TopForm
          name={schema.name}
          onNameChange={this.handleNameChange}
        />
      </div>
    );

    let tabsElement = (
      <Tabs
        activeKey={activeTabKey}
        onSelect={(key) => this.setState({ activeTabKey: key })}
        animation={false}
        id="fsm-workflow-editor-elements"
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab eventKey={0} title="States">
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
            selectedStates={selectedStates}
            onDelete={this.handleDeleteState}
            onEdit={this.handleEditState}
            onSelect={(state) => this.handleSelectStates([state])}
          />
        </Tab>
        <Tab eventKey={1} title="Transitions">
          <TransitionsTable
            transitions={schema.transitions}
            selectedTransitions={selectedTransitions}
            states={schema.states.map(({ name }) => name)}
            actions={actions}
            getStateLabel={this.getStateLabel}
            exampleObject={this.props.objectInfo.example}
            onEditTransition={this.handleEditTransition}
            onDeleteTransition={this.handleDeleteTransition}
            onSaveGuards={this.handleSaveTransitionGuards}
            onSaveActions={this.handleSaveTransitionActions}
            onSelect={(transition) => this.handleSelectTransitions([transition])}
          />
        </Tab>
      </Tabs>
    );

    return (
      <Grid fluid={true}>
        <Row>
          <Col lg={12}>

            {headerElement}

            <Row>
              <Col lg={6} md={12}>
                {topFormElement}
                {tabsElement}
              </Col>

              <Col lg={6} md={12}>
                <EditorOutput
                  schema={schema}
                  selectedStates={selectedStates}
                  selectedTransitions={selectedTransitions}
                  getStateLabel={this.getStateLabel}
                  createJsonOutput={this.createJsonOutput}
                  onStatesSelect={this.handleSelectStates}
                  onTransitionsSelect={this.handleSelectTransitions}
                />
              </Col>
            </Row>

          </Col>
        </Row>
      </Grid>
    )
  }
}
