import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import TopForm from '../TopForm.react';
import StatesTable from '../StatesTable';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import { getExistingStates, isDef } from '../utils';
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
    states: (props.workflow || {}).states || []
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

  handleSave = _ => {
    const { schema } = this.state;

    return this.props.onSave(schema)
  }

  handleToggleModal = show => _ => this.setState({
    showModal: show
  })

  handleDeleteState = stateName => this.setNewState(prevState => ({
    states: prevState.states.filter(({ name }) => name !== stateName),
    schema: {
      ...prevState.schema,
      transitions: prevState.schema.transitions.map(({ from, to, ...rest }) => ({
        ...rest,
        from: from === stateName ? '' : from,
        to: to === stateName ? '' : to
      })),
      initialState: prevState.schema.initialState === stateName ? '' : prevState.schema.initialState,
      finalStates: prevState.schema.finalStates.filter(state => state !== stateName)
    }
  }))

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
              <Tab eventKey={1} title={(<h4>States</h4>)}>
                <StatesTable
                  states={states}
                  onDelete={this.handleDeleteState}
                />
              </Tab>
              <Tab eventKey={2} title={(<h4>Transitions</h4>)}>
                <TransitionsTable
                  transitions={schema.transitions}
                  states={states.map(({ name }) => name)}
                  exampleObject={this.props.exampleObject}
                  showModal={showModal}
                  onEditTransition={this.handleEditTransition}
                  onDeleteTransition={this.handleDeleteTransition}
                  onSaveGuards={this.handleSaveTransitionGuards}
                  onCloseModal={this.handleToggleModal(false)}
                  onShowModal={this.handleToggleModal(true)}
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
