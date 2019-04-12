import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import withConfirmDialog from '../../ConfirmDialog';
import { stateReleaseGuardsPropTypes } from '../statePropTypes';
import { isDef, getLabel } from '../../utils';
import Guards from '../../Guards/GuardsTable.react';

@withConfirmDialog
export default class ReleaseTable extends PureComponent {
  static propTypes = {
    releaseGuards: stateReleaseGuardsPropTypes,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    conditions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    config: PropTypes.shape({
      toState: PropTypes.oneOf(['none', 'single', 'multiple'])
    })
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    releaseGuards: this.props.releaseGuards || [],
    showModal: false,
    currentIndex: null,
    modalType: null
  }

  onDelete = index => this.setState(prevState => ({
    releaseGuards: prevState.releaseGuards.filter((_, i) => i !== index)
  }))

  hasUnsavedChanges = _ => {
    const { releaseGuards: stateReleaseGuards } = this.state;
    const { releaseGuards } = this.props;
    return !isEqual(stateReleaseGuards, releaseGuards)
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  handleDelete = index => this._triggerDialog({
    confirmHandler: _ => this.onDelete(index),
    message: this.context.i18n.getMessage('fsmWorkflowEditor.ui.guards.deleteDialog.message')
  })

  handleSave = _ => this.props.onSave(this.state.releaseGuards)

  handleModal = index => type => _ => this.setState({
    showModal: true,
    modalType: type,
    currentIndex: index
  })

  handleCloseModal = _ => this.setState({
    showModal: false,
    currentIndex: null,
    modalType: null
  })

  handleSaveGuards = index => guards => {
    this.handleCloseModal();
    this.setState(prevState => ({
      releaseGuards: (prevState.releaseGuards || []).map((el, i) => {
        if (i !== index) {
          return el
        }
        return {
          ...el,
          guards
        }
      })
    }));
  }

  render() {
    const { i18n } = this.context;
    const { title, conditions } = this.props;
    const { releaseGuards, showModal, currentIndex, modalType } = this.state;

    let modal;

    if (showModal) {
      let releaseGuard;

      if (isDef(currentIndex)) {
        releaseGuard = releaseGuards[currentIndex];
      }

      // TODO add release guards editor modal

      switch (modalType) {
        case 'guards':
          modal = (
            <Guards
              guards={(releaseGuard || {}).guards}
              conditions={conditions}
              title={i18n.getMessage('i18n TODO')}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveGuards(currentIndex)}
            />
          );
          break;
        default:
          modal = null;
      }
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
            <Table>
              <thead>
                <tr>
                  <th>{i18n.getMessage('fsmWorkflowEditor.ui.states.releaseGuards.to')}</th>
                  <th className='text-right'>
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
                {
                  releaseGuards.length > 0 ?
                    releaseGuards.map(({ to }, index) => (
                      <tr key={`${JSON.stringify(to)}-${index}`}>
                        <td style={{ paddingTop: '15px' }}>
                          {
                            to ?
                              Array.isArray(to) && to.length > 0 ?
                                JSON.stringify(to.map(getLabel(i18n)('states'))) :
                                getLabel(i18n)('states')(to) :
                              null
                          }
                        </td>
                        <td className='text-right'>
                          <ButtonGroup bsStyle='sm'>
                            <Button onClick={this.handleModal(index)('edit')}>
                              <Glyphicon glyph='edit' />
                              {'\u2000'}
                              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.edit.label')}
                            </Button>
                            <Button onClick={this.handleModal(index)('guards')}>
                              {i18n.getMessage('fsmWorkflowEditor.ui.guards.label')}
                            </Button>
                            <Button onClick={this.handleDelete(index)}>
                              <Glyphicon glyph='trash' />
                              {'\u2000'}
                              {i18n.getMessage('fsmWorkflowEditor.ui.buttons.delete.label')}
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )) :
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center' }}>
                        <a
                          onClick={this.handleModal()('edit')}
                          style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          {i18n.getMessage('fsmWorkflowEditor.ui.guards.addNewCallout')}
                        </a>
                      </td>
                    </tr>
                }
              </tbody>
            </Table>

            {modal}
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
