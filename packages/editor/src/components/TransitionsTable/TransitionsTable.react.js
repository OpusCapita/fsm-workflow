import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { isDef, getLabel } from '../utils';
import Guards from '../Guards/GuardsTable.react';
import Automatic from '../Guards/AutomaticTable.react';
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
    onEditTransition: PropTypes.func.isRequired,
    onDeleteTransition: PropTypes.func.isRequired,
    onSaveGuards: PropTypes.func.isRequired,
    onSaveAutomatic: PropTypes.func.isRequired,
    onSaveActions: PropTypes.func.isRequired,
    componentsRegistry: PropTypes.objectOf(PropTypes.func)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    showModal: false,
    modalType: null,
    currentTransition: null
  }

  handleDelete = index => this._triggerDialog({
    confirmHandler: _ => this.props.onDeleteTransition(index),
    message: this.context.i18n.getMessage('fsmWorkflowEditor.ui.transitions.deleteDialog.message')
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

  handleSaveAutomatic = index => automatic => {
    this.handleCloseModal();
    this.props.onSaveAutomatic(index)(automatic);
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
    const { i18n } = this.context;
    const { transitions = [], states = [], actions, conditions } = this.props;
    const { showModal, currentTransition, modalType } = this.state;
    const getStateLabel = getLabel(i18n)('states');

    const rows = transitions.map(({ from, to, event }, index) => (
      <tr key={index}>
        <td>
          {event}
        </td>
        <td>
          {
            getStateLabel(from) || (
              <span style={{ color: 'red' }}>
                {i18n.getMessage('fsmWorkflowEditor.ui.transitions.fromRequired')}
              </span>
            )
          }
        </td>
        <td>
          {
            getStateLabel(to) || (
              <span style={{ color: 'red' }}>
                {i18n.getMessage('fsmWorkflowEditor.ui.transitions.toRequired')}
              </span>
            )
          }
        </td>
        <td className='text-right'>
          <ButtonGroup bsSize="sm">
            <Button onClick={this.handleModal(index)('edit')}>
              <Glyphicon glyph='edit'/>
              {'\u2000'}
              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.edit.label')}
            </Button>
            <Button
              onClick={this.handleModal(index)('guards')}
              disabled={!(from && to && event)}
            >
              {i18n.getMessage('fsmWorkflowEditor.ui.guards.label')}
            </Button>
            <Button
              onClick={this.handleModal(index)('automatic')}
              disabled={!(from && to && event)}
            >
              {i18n.getMessage('fsmWorkflowEditor.ui.automatic.label')}
            </Button>
            <Button
              onClick={this.handleModal(index)('actions')}
              disabled={!(from && to && event)}
            >
              {i18n.getMessage('fsmWorkflowEditor.ui.actions.label')}
            </Button>
            <Button onClick={this.handleDelete(index)}>
              <Glyphicon glyph='trash'/>
              {'\u2000'}
              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.delete.label')}
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
              title={i18n.getMessage('fsmWorkflowEditor.ui.guards.title', {
                event: transition.event, // TODO i18n event name too?
                from: getStateLabel(transition.from),
                to: getStateLabel(transition.to)
              })}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveGuards(currentTransition)}
            />
          );
          break;
        case 'automatic':
          modal = (
            <Automatic
              guards={transition.automatic}
              conditions={conditions}
              title={i18n.getMessage('fsmWorkflowEditor.ui.automatic.title', {
                event: transition.event, // TODO i18n event name too?
                from: getStateLabel(transition.from),
                to: getStateLabel(transition.to)
              })}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveAutomatic(currentTransition)}
            />
          );
          break;
        case 'actions':
          modal = (
            <Actions
              transition={transition}
              title={i18n.getMessage('fsmWorkflowEditor.ui.actions.title', {
                event: transition.event, // TODO i18n event name too?
                from: getStateLabel(transition.from),
                to: getStateLabel(transition.to)
              })}
              actions={actions}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveActions(currentTransition)}
              componentsRegistry={this.props.componentsRegistry}
            />
          );
          break;
        default:
          modal = (
            <TransitionEditor
              transition={transition}
              states={states}
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
              <th>{i18n.getMessage('fsmWorkflowEditor.ui.transitions.event.label')}</th>
              <th>{i18n.getMessage('fsmWorkflowEditor.ui.transitions.from.label')}</th>
              <th>{i18n.getMessage('fsmWorkflowEditor.ui.transitions.to.label')}</th>
              <th className="text-right">
                <Button
                  bsSize='sm'
                  onClick={this.handleModal()('edit')}
                >
                  {i18n.getMessage('fsmWorkflowEditor.ui.buttons.add.label')}
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
