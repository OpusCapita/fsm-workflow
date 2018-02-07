import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Glyphicon
} from 'react-bootstrap';
import { isDef } from '../utils';
import Guards from '../Guards';
import Actions from '../Actions';
import TransitionEditor from './TransitionEditor.react';
import withConfirmDialog from '../ConfirmDialog';
import guardPropTypes from '../Guards/guardPropTypes';
import actionPropTypes from '../Actions/actionPropTypes';

@withConfirmDialog
export default class TransitionsTable extends PureComponent {
  static propTypes = {
    transitions: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
      guards: PropTypes.arrayOf(guardPropTypes),
      actions: PropTypes.arrayOf(actionPropTypes)
    })),
    states: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.shape({
      paramsSchema: PropTypes.object
    }),
    getStateLabel: PropTypes.func.isRequired,
    onEditTransition: PropTypes.func.isRequired,
    onDeleteTransition: PropTypes.func.isRequired,
    onSaveGuards: PropTypes.func.isRequired,
    onSaveActions: PropTypes.func.isRequired,
    exampleObject: PropTypes.object
  }

  state = {
    showModal: false,
    modalType: null,
    currentTransition: null
  }

  handleDelete = index => this._triggerDialog({
    confirmHandler: _ => this.props.onDeleteTransition(index),
    message: `Do you really want to delete this transition?`
  })

  handleModal = index => type => _ => this.setState({
    showModal: true,
    modalType: type,
    currentTransition: index
  })

  handleCloseModal = _ => this.setState({
    showModal: false,
    modalType: null,
    currentTransition: null
  })

  handleSaveGuards = index => guards => {
    this.handleCloseModal();
    this.props.onSaveGuards(index)(guards);
  }

  handleSaveActions = index => actions => {
    this.handleCloseModal();
    this.props.onSaveActions(index)(actions);
  }

  handleSaveTransition = (...args) => {
    this.handleCloseModal();
    this.props.onEditTransition(...args)
  }

  render() {
    const { transitions, states, getStateLabel, actions } = this.props;

    const rows = transitions.map(({ from, to, event }, index) => (
      <tr key={index}>
        <td>
          {event}
        </td>
        <td>
          {
            getStateLabel(from) || (<span style={{ color: 'red' }}>Specify 'from' state</span>)
          }
        </td>
        <td>
          {
            getStateLabel(to) || (<span style={{ color: 'red' }}>Specify 'to' state</span>)
          }
        </td>
        <td className="text-right">
          <div className="btn-group btn-group-sm">
            <Button title="Edit" onClick={this.handleModal(index)('edit')}>
              <Glyphicon glyph='edit'/>
              {'\u2000'}
              Edit
            </Button>
            <Button
              title="Guard"
              onClick={this.handleModal(index)('guard')}
              disabled={!(from && to && event)}
            >
              Guard
            </Button>
            <Button
              title="Actions"
              onClick={this.handleModal(index)('action')}
              disabled={!(from && to && event)}
            >
              Actions
            </Button>
            <Button title="Delete" onClick={this.handleDelete(index)}>
              <Glyphicon glyph='trash'/>
            </Button>
          </div>
        </td>
      </tr>
    ))

    const { showModal, currentTransition, modalType } = this.state;

    let modal;

    if (showModal) {
      let transition;

      if (isDef(currentTransition)) {
        transition = transitions[currentTransition];
      }

      switch (modalType) {
        case 'guard':
          modal = (
            <Guards
              guards={transition.guards}
              title={`Guards for transition on "${
                transition.event
              }" from "${
                getStateLabel(transition.from)
              }" to "${
                getStateLabel(transition.to)
              }"`}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveGuards(currentTransition)}
              exampleObject={this.props.exampleObject}
            />
          );
          break;
        case 'action':
          modal = (
            <Actions
              transition={transition}
              title={`Actions for transition on "${
                transition.event
              }" from "${
                getStateLabel(transition.from)
              }" to "${
                getStateLabel(transition.to)
              }"`}
              actions={actions}
              getStateLabel={getStateLabel}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveActions(currentTransition)}
              exampleObject={this.props.exampleObject}
            />
          );
          break;
        default:
          modal = (
            <TransitionEditor
              transition={transition}
              states={states}
              getStateLabel={getStateLabel}
              onSave={this.handleSaveTransition}
              onClose={this.handleCloseModal}
              index={currentTransition}
            />
          )
      }
    }

    return (
      <div>
        <Table
          condensed={true}
          hover={true}
          className="oc-fsm-crud-editor--table"
        >
          <thead>
            <tr>
              <th>Event</th>
              <th>From</th>
              <th>To</th>
              <th className="text-right">
                <Button
                  bsSize='sm'
                  onClick={this.handleModal()('edit')}
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>

        {modal}
      </div>
    )
  }
}
