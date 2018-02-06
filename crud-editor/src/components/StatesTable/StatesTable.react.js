import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import {
  Table,
  ButtonGroup,
  Button,
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
    statesInTransitions: PropTypes.arrayOf(PropTypes.string)
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

    return this._triggerDialog({
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
        <Table condensed={true} className="oc-fsm-crud-editor--table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th style={{ width: '60px' }} className='text-center'>Initial</th>
              <th style={{ width: '60px' }} className='text-center'>Final</th>
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
                  <td className='text-center'>
                    {
                      isInitial && (<Glyphicon glyph='ok'/>)
                    }
                  </td>
                  <td className='text-center'>
                    {
                      isFinal && (<Glyphicon glyph='ok'/>)
                    }
                  </td>
                  <td className='text-right'>
                    <div className="btn-group btn-group-sm">
                      <Button
                        title="Edit"
                        onClick={this.handleEdit(name)}
                      >
                        <Glyphicon glyph='edit'/>
                        {'\u2000'}
                        Edit
                      </Button>
                      <Button
                        title="Delete"
                        onClick={this.handleDelete(name)}
                      >
                        <Glyphicon glyph='trash'/>
                      </Button>
                    </div>
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
