import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
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
    actions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    conditions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    getStateLabel: PropTypes.func.isRequired,
    onEditTransition: PropTypes.func.isRequired,
    onDeleteTransition: PropTypes.func.isRequired,
    onSaveGuards: PropTypes.func.isRequired,
    onSaveActions: PropTypes.func.isRequired,
    objectConfig: PropTypes.object.isRequired,
    actionsComponentRegistry: PropTypes.objectOf(PropTypes.func)
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
    const { transitions, states, getStateLabel, actions, objectConfig, conditions } = this.props;
    const { showModal, currentTransition, modalType } = this.state;

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
        <td className='text-right'>
          <ButtonGroup bsSize="sm">
            <Button onClick={this.handleModal(index)('edit')}>
              <Glyphicon glyph='edit'/>
              {'\u2000'}
              Edit
            </Button>
            <Button
              onClick={this.handleModal(index)('guards')}
              disabled={!(from && to && event)}
            >
              Guards
            </Button>
            <Button
              onClick={this.handleModal(index)('actions')}
              disabled={!(from && to && event)}
            >
              Actions
            </Button>
            <Button onClick={this.handleDelete(index)}>
              <Glyphicon glyph='trash'/>
              {'\u2000'}
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ))

    let modal;

    if (showModal) {
      let transition;

      if (isDef(currentTransition)) {
        transition = transitions[currentTransition];
      }

      switch (modalType) {
        case 'guards':
          modal = (
            <Guards
              guards={transition.guards}
              conditions={conditions}
              title={`Guards for transition on "${
                transition.event
              }" from "${
                getStateLabel(transition.from)
              }" to "${
                getStateLabel(transition.to)
              }"`}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveGuards(currentTransition)}
              objectConfig={objectConfig}
            />
          );
          break;
        case 'actions':
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
              objectConfig={objectConfig}
              componentsRegistry={this.props.actionsComponentRegistry}
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
        <Table className="oc-fsm-crud-editor--table">
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
