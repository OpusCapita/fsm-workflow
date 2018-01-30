import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import {
  Table,
  ButtonGroup,
  Button,
  Label,
  Glyphicon
} from 'react-bootstrap';
import statePropTypes from './statePropTypes';
import StatesEditor from './StatesEditor.react';
import { isDef } from '../utils';
import withConfirmDialog from '../ConfirmDialog';
import DeleteStateDialogBody from './DeleteStateDialogBody.react';

export const DELETE_STATE_TRANSITIONS = 'deleteStateTransitions';
export const SWAP_STATE_IN_TRANSITIONS = 'swapStateInTransitions';

@withConfirmDialog
export default class StatesTable extends PureComponent {
  static propTypes = {
    states: PropTypes.arrayOf(statePropTypes),
    initialState: PropTypes.string.isRequired,
    finalStates: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    statesInTransitions: PropTypes.arrayOf(PropTypes.string),
    triggerDialog: PropTypes.func.isRequired // injected by withConfirmDialog
  }

  constructor(...args) {
    super(...args);

    this.state = {
      states: this.statesFromProps(this.props),
      currentState: null,
      showModal: false
    }
  }

  componentWillReceiveProps = props => this.setState({ states: this.statesFromProps(props) })

  statesFromProps = ({ states, initialState, finalStates }) => states.map(state => ({
    ...state,
    isInitial: state.name === initialState,
    isFinal: finalStates.indexOf(state.name) > -1
  }))

  _deleteStateSideEffect = {
    name: DELETE_STATE_TRANSITIONS
  }

  handleDelete = name => {
    const { statesInTransitions } = this.props;

    const { states } = this.state;

    return this.props.triggerDialog({
      confirmHandler: _ => this.props.onDelete({
        name,
        ...(statesInTransitions.indexOf(name) > -1 && { sideEffect: this._deleteStateSideEffect })
      }),
      ...(
        statesInTransitions.indexOf(name) > -1 ? {
          BodyComponent: _ => (
            <DeleteStateDialogBody
              states={states}
              stateName={name}
              onSelect={
                ({ index, alternative }) => {
                  this._deleteStateSideEffect = {
                    name: index === 0 ? DELETE_STATE_TRANSITIONS : SWAP_STATE_IN_TRANSITIONS,
                    alternative
                  }
                }
              }
            />
          )
        } : {
          message: `Do you really want to delete this state?`
        }
      )
    })
  }

  handleEdit = name => _ => this.setState({
    currentState: name,
    showModal: true
  })

  handleAdd = this.handleEdit()

  handleClose = _ => this.setState({
    currentState: null,
    showModal: false
  })

  handleSave = (...args) => {
    this.handleClose();
    this.props.onEdit(...args);
  }

  render() {
    const { states, currentState, showModal } = this.state;

    let modal;

    if (showModal) {
      let state;

      if (isDef(currentState)) {
        state = find(states, ({ name }) => name === currentState)
      }

      modal = (
        <StatesEditor
          state={state}
          existingStates={states.map(({ name }) => name)}
          onClose={this.handleClose}
          onSave={this.handleSave}
        />
      )
    }

    return (
      <div className="oc-fsm-crud-editor--states-editor">
        <Table className="oc-fsm-crud-editor--table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Notes</th>
              <th className='text-right'>
                <Button
                  bsSize='sm'
                  onClick={this.handleAdd}
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              states.map(({ name, description, isInitial, isFinal }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>
                    {
                      isInitial && (<Label bsStyle="primary" style={{ marginLeft: '5px' }}>Initial</Label>)
                    }
                    {
                      isFinal && (<Label bsStyle="success" style={{ marginLeft: '5px' }}>Final</Label>)
                    }
                  </td>
                  <td className='text-right'>
                    <ButtonGroup bsStyle='sm'>
                      <Button
                        onClick={this.handleEdit(name)}
                      >
                        <Glyphicon glyph='edit'/>
                        {'\u2000'}
                        Edit
                      </Button>
                      <Button
                        onClick={this.handleDelete(name)}
                      >
                        <Glyphicon glyph='trash'/>
                        {'\u2000'}
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>

        {modal}
      </div>
    )
  }
}
