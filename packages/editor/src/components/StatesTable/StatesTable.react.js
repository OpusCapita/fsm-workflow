import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Table from 'react-bootstrap/lib/Table';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Guards from '../Guards/GuardsTable.react';
import statePropTypes from './statePropTypes';
import StateEditor from './StateEditor.react';
import { isDef, getLabel } from '../utils';
import withConfirmDialog from '../ConfirmDialog';
import DeleteStateDialogBody from './DeleteStateDialogBody.react';
import { stateConfigPropTypes } from '../schemaConfigPropTypes';
import ReleaseTable from './ReleaseTable.react';

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
    stateConfig: stateConfigPropTypes,
    conditions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    onSaveReleaseGuards: PropTypes.func.isRequired
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
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
    const { i18n } = this.context;
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
              i18n={i18n}
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
          message: i18n.getMessage('fsmWorkflowEditor.ui.states.deleteDialog.simpleMessage')
        }
      )
    })
  }

  handleModal = name => type => _ => this.setState({
    showModal: true,
    modalType: type,
    currentState: name
  })

  handleAdd = this.handleModal()('edit');

  handleCloseModal = _ => this.setState({
    currentState: null,
    showModal: false,
    modalType: null
  })

  handleSave = (...args) => {
    this.handleCloseModal();
    this.props.onEdit(...args);
  }

  handleSaveSimpleReleaseGuards = currentState => guards => {
    this.handleCloseModal();
    this.props.onSaveReleaseGuards(currentState)([{ guards }]);
  }

  handleSaveReleaseGuards = currentState => releaseGuards => {
    this.handleCloseModal();
    this.props.onSaveReleaseGuards(currentState)(releaseGuards);
  }

  render() {
    const { i18n } = this.context;
    const { stateConfig, conditions, statesInTransitions } = this.props;
    const { states, currentState, showModal, modalType } = this.state;

    const simpleReleaseGuards = ((stateConfig || {}).releaseGuards || {}).toState === 'all';

    let modal;

    if (showModal) {
      let currentStateObject;

      if (isDef(currentState)) {
        currentStateObject = find(states, ({ name }) => name === currentState)
      }

      switch (modalType) {
        case 'guards':
          modal = simpleReleaseGuards ?
            (
              <Guards
                guards={
                  ((currentStateObject || {}).release || []).
                    reduce((acc, { to, guards }) => to === undefined ? [...acc, ...guards] : acc, [])
                }
                conditions={conditions}
                title={i18n.getMessage('fsmWorkflowEditor.ui.guards.label')}
                onClose={this.handleCloseModal}
                onSave={this.handleSaveSimpleReleaseGuards(currentState)}
              />
            ) :
            (
              <ReleaseTable
                releaseGuards={(currentStateObject || {}).release}
                title={i18n.getMessage('fsmWorkflowEditor.ui.states.releaseGuards.table.title', {
                  stateName: currentState
                })}
                onClose={this.handleCloseModal}
                onSave={this.handleSaveReleaseGuards(currentState)}
                config={(stateConfig || {}).releaseGuards || {}}
                conditions={conditions}
                availableNames={(stateConfig || {}).availableNames || statesInTransitions}
                from={currentState}
              />
            );
          break;
        default:
          modal = (
            <StateEditor
              value={currentStateObject}
              onClose={this.handleCloseModal}
              onSave={this.handleSave}
              usedNames={states.map(({ name }) => name)}
              availableNames={(stateConfig || {}).availableNames}
            />
          )
      }
    }

    return (
      <div className="oc-fsm-crud-editor--states-editor">
        <Table className="oc-fsm-crud-editor--table">
          <thead>
            <tr>
              <th>{i18n.getMessage('fsmWorkflowEditor.ui.states.name.label')}</th>
              <th>{i18n.getMessage('fsmWorkflowEditor.ui.states.description.label')}</th>
              <th style={{ width: '60px' }} className='text-center'>
                {i18n.getMessage('fsmWorkflowEditor.ui.states.initial.label')}
              </th>
              <th style={{ width: '60px' }} className='text-center'>
                {i18n.getMessage('fsmWorkflowEditor.ui.states.final.label')}
              </th>
              <th className='text-right'>
                <Button
                  bsSize='sm'
                  onClick={this.handleAdd}
                >
                  {i18n.getMessage('fsmWorkflowEditor.ui.buttons.add.label')}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              states.map(({ name, description, isInitial, isFinal }) => (
                <tr key={name}>
                  <td>{getLabel(i18n)('states')(name)}</td>
                  <td>{description}</td>
                  <td className='text-center'>
                    {
                      isInitial && (<i className='fa fa-check'></i>)
                    }
                  </td>
                  <td className='text-center'>
                    {
                      isFinal && (<i className='fa fa-check'></i>)
                    }
                  </td>
                  <td className='text-right'>
                    <ButtonGroup bsStyle='sm'>
                      <Button onClick={this.handleModal(name)('edit')}>
                        <Glyphicon glyph='edit'/>
                        {'\u2000'}
                        {i18n.getMessage('fsmWorkflowEditor.ui.buttons.edit.label')}
                      </Button>
                      <Button onClick={this.handleModal(name)('guards')}>
                        {i18n.getMessage('fsmWorkflowEditor.ui.guards.label')}
                      </Button>
                      <Button onClick={this.handleDelete(name)}>
                        <Glyphicon glyph='trash'/>
                        {'\u2000'}
                        {i18n.getMessage('fsmWorkflowEditor.ui.buttons.delete.label')}
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
