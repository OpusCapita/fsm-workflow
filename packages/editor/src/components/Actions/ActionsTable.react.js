import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import withConfirmDialog from '../ConfirmDialog';
import './ActionsTable.less';
import ActionInvocationEditor from './ActionInvocationEditor.react';
import { isDef, formatArg, getLabel } from '../utils';
import { getParamSchema } from './utils';
import actionPropTypes from './actionPropTypes';

@withConfirmDialog
export default class ActionsTable extends PureComponent {
  static propTypes = {
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
      actions: PropTypes.arrayOf(actionPropTypes)
    }),
    actions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    componentsRegistry: PropTypes.objectOf(PropTypes.func)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    transitionActions: this.props.transition.actions || [],
    showEditor: false,
    currentActionIndex: null
  }

  onDelete = index => this.setState(prevState => ({
    transitionActions: prevState.transitionActions.filter((_, i) => i !== index)
  }))

  hasUnsavedChanges = _ => {
    const { transitionActions } = this.state;

    const { transition: { actions = [] } } = this.props;

    return !isEqual(transitionActions, actions)
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  handleDelete = index => this._triggerDialog({
    confirmHandler: _ => this.onDelete(index),
    message: this.context.i18n.getMessage('fsmWorkflowEditor.ui.actions.deleteDialog.message')
  })

  handleSave = _ => this.props.onSave(this.state.transitionActions)

  handleOpenEditor = index => _ => this.setState({
    showEditor: true,
    currentActionIndex: index
  })

  handleCloseEditor = _ => this.setState({
    showEditor: false,
    currentActionIndex: null
  })

  handleSaveAction = index => action => this.setState(prevState => ({
    transitionActions: isDef(index) ?
      prevState.transitionActions.map((ta, i) => i === index ? action : ta) :
      prevState.transitionActions.concat(action)
  }), this.handleCloseEditor)


  render() {
    const { i18n } = this.context;
    const { title, actions, transition, componentsRegistry } = this.props;
    const { transitionActions, showEditor, currentActionIndex } = this.state;

    let editorModal;

    if (showEditor) {
      let action;

      if (isDef(currentActionIndex)) {
        action = transitionActions[currentActionIndex]
      }

      editorModal = (
        <ActionInvocationEditor
          action={action}
          actions={actions}
          transition={transition}
          componentsRegistry={componentsRegistry}
          onClose={this.handleCloseEditor}
          onSave={this.handleSaveAction(currentActionIndex)}
        />
      )
    }

    return (
      <Modal
        show={true}
        onHide={this.handleClose}
        dialogClassName="oc-fsm-crud-editor--modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="oc-fsm-crud-editor--states-editor">
            <Table className="oc-fsm-crud-editor--table-actions">
              <thead>
                <tr>
                  <th>{i18n.getMessage('fsmWorkflowEditor.ui.actions.name.label')}</th>
                  <th>{i18n.getMessage('fsmWorkflowEditor.ui.actions.parameters.label')}</th>
                  <th className='text-right'>
                    <Button
                      bsSize='sm'
                      onClick={this.handleOpenEditor()}
                    >
                      {i18n.getMessage('fsmWorkflowEditor.ui.buttons.add.label')}
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  transitionActions.length > 0 ?
                    transitionActions.map(({ name: actionName, params = [] }, index) => (
                      <tr key={`${actionName}-${index}`}>
                        <td style={{ paddingTop: '15px' }}>
                          {getLabel(i18n)('actions')(actionName)}
                        </td>
                        <td>
                          { params.length > 0 &&
                            <table className="oc-fsm-crud-editor--table-actions-parameters">
                              <tbody>
                                {
                                  params.map(({ name, value, expression }, i) => {
                                    return (
                                      <tr key={`${i}-${name}`}>
                                        <td>{getLabel(i18n)(`actions.${actionName}.params`)(name)}</td>
                                        <td className="parameter-value">
                                          {
                                            formatArg({
                                              i18n,
                                              schema: getParamSchema({
                                                actions,
                                                action: actionName,
                                                param: name
                                              }),
                                              value,
                                              expression
                                            })
                                          }
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                          }
                        </td>
                        <td className='text-right'>
                          <ButtonGroup bsStyle='sm'>
                            <Button
                              onClick={this.handleOpenEditor(index)}
                            >
                              <Glyphicon glyph='edit' />
                              {'\u2000'}
                              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.edit.label')}
                            </Button>
                            <Button
                              onClick={this.handleDelete(index)}
                            >
                              <Glyphicon glyph='trash' />
                              {'\u2000'}
                              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.delete.label')}
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )) :
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center' }}>
                        {i18n.getMessage('fsmWorkflowEditor.ui.actions.emptyList')}
                        {`\u00A0`}
                        <a
                          onClick={this.handleOpenEditor()}
                          style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          {i18n.getMessage('fsmWorkflowEditor.ui.actions.addNewCallout')}
                        </a>
                      </td>
                    </tr>
                }
              </tbody>
            </Table>

            {editorModal}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={this.handleSave}
          >
            {i18n.getMessage('fsmWorkflowEditor.ui.buttons.ok.label')}
          </Button>
          <Button onClick={this.handleClose}>
            {i18n.getMessage('fsmWorkflowEditor.ui.buttons.close.label')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
