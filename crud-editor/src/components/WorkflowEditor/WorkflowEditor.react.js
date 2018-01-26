import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import TopForm from '../TopForm.react';
import StatesEditor from '../StatesEditor';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import { getExistingStates, uidFor } from '../utils';
import './styles.less';
import statesPropTypes from '../StatesEditor/statesPropTypes';

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
            body: PropTypes.string
          }))
        })
      }),
      states: statesPropTypes
    })
  }

  static defaultProps = {
    onSave: _ => {}
  }

  constructor(...args) {
    super(...args);

    this.state = {
      ...this.stateFromProps(this.props),
      showModal: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.setState(this.stateFromProps(nextProps))
    }
  }

  stateFromProps = props => ({
    schema: (props.workflow || {}).schema || {},
    states: ((props.workflow || {}).states || []).map(({ id, ...rest }) => ({
      id: id || uidFor('state'),
      ...rest
    }))
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

  handleSaveTransitionGuards = index => guards => this.handleEditTransition({
    field: 'guards',
    value: guards,
    index
  })

  handleSave = _ => {
    const { schema } = this.state;

    return this.props.onSave(schema)
  }

  handleToggleModal = show => _ => this.setState({
    showModal: show
  })

  render() {
    const { schema, states, showModal } = this.state;

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
              <Tab eventKey={1} title={(<h4>Transitions</h4>)}>
                <TransitionsTable
                  transitions={schema.transitions}
                  states={states.map(({ name }) => name)}
                  exampleObject={this.props.exampleObject}
                  showModal={showModal}
                  onCreate={this.handleCreateTransition}
                  onEditTransition={this.handleEditTransition}
                  onDeleteTransition={this.handleDeleteTransition}
                  onSaveGuards={this.handleSaveTransitionGuards}
                  onCloseModal={this.handleToggleModal(false)}
                  onShowModal={this.handleToggleModal(true)}
                />
              </Tab>
              <Tab eventKey={2} title={(<h4>States</h4>)}>
                <StatesEditor
                  states={states}
                />
              </Tab>
            </Tabs>

            <EditorOutput schema={schema}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
