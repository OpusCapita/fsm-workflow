import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import TopForm from '../TopForm.react';
import StatesTable from '../StatesTable';
import TransitionsTable from '../TransitionsTable';
import EditorOutput from '../EditorOutput.react';
import { isDef } from '../utils';
import './styles.less';
import statePropTypes from '../StatesTable/statePropTypes';

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
      states: PropTypes.arrayOf(statePropTypes)
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
    const { schema, states } = this.state;

    return this.props.onSave({ schema, states })
  }

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

  handleEditState = ({ initialName, ...rest }) => this.setNewState(prevState => initialName ?
    // user edited previously existed state
    ({
      states: prevState.states.map(state => state.name === initialName ? rest : state),
      schema: {
        ...prevState.schema,
        initialState: prevState.schema.initialState === initialName ? rest.name : prevState.schema.initialState,
        finalStates: prevState.schema.finalStates.map(state => state === initialName ? rest.name : state),
        transitions: prevState.schema.transitions.map(({ from, to, ...other }) => ({
          ...other,
          from: from === initialName ? rest.name : from,
          to: to === initialName ? rest.name : to
        }))
      }
    }) :
    // add new state
    ({
      states: prevState.states.concat(rest)
    })
  )

  render() {
    const { schema, states } = this.state;

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
                  onEdit={this.handleEditState}
                />
              </Tab>
              <Tab eventKey={2} title={(<h4>Transitions</h4>)}>
                <TransitionsTable
                  transitions={schema.transitions}
                  states={states.map(({ name }) => name)}
                  exampleObject={this.props.exampleObject}
                  onEditTransition={this.handleEditTransition}
                  onDeleteTransition={this.handleDeleteTransition}
                  onSaveGuards={this.handleSaveTransitionGuards}
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
