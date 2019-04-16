import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import withConfirmDialog from '../ConfirmDialog';
import { stateReleaseGuardsPropTypes } from './statePropTypes';
import { isDef, getLabel } from '../utils';
import Guards from '../Guards/GuardsTable.react';
import Select from '../Select';
import { releaseGuardsPropTypes } from '../schemaConfigPropTypes';

const releaseGuardNotEmpty = guard => {
  const { to, guards } = guard;
  return !!(to || (guards || []).length)
}

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
    config: releaseGuardsPropTypes,
    availableNames: PropTypes.arrayOf(PropTypes.string),
    from: PropTypes.string.isRequired
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

  isMode = mode => {
    const { toState } = this.props.config || {};
    if (mode === 'multiple') {
      return toState ? toState === mode : true; // if no toState specified then default is 'multiple'
    }
    return toState === mode
  }

  isMultiple = _ => this.isMode('multiple');

  onDelete = index => this.setState(prevState => ({
    releaseGuards: prevState.releaseGuards.filter((_, i) => i !== index)
  }))

  hasUnsavedChanges = _ => {
    const { releaseGuards: stateReleaseGuards } = this.state;
    const { releaseGuards } = this.props;
    if (!releaseGuards && (!stateReleaseGuards.length || !stateReleaseGuards.some(releaseGuardNotEmpty))) {
      return false
    }
    return !isEqual(stateReleaseGuards, releaseGuards);
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  });

  handleDelete = index => this._triggerDialog({
    // delete without a dialog if guards are empty and/or 'to' is empty
    showDialog: _ => releaseGuardNotEmpty(this.state.releaseGuards[index]),
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
        const { guards: _, ...rest } = el; // eslint-disable-line no-unused-vars
        return {
          ...rest,
          ...(guards.length ? { guards } : {})
        }
      })
    }));
  }

  handleChangeToState = index => value => this.setState(prevState => {
    return {
      releaseGuards: prevState.releaseGuards.map((el, i) => {
        if (index !== i) {
          return el;
        }
        const { to, ...rest } = el; // eslint-disable-line no-unused-vars
        if (Array.isArray(value)) {
          if (!value.length) {
            return rest
          }
          return {
            // if array holds a single element - save this string value instead of an array
            to: value.length === 1 ? value[0] : value,
            ...rest
          }
        }
        return value ? { to: value, ...rest } : rest
      })
    }
  });

  /**
   * Convert value to React-Select's value:
   * - from 'myvalue' make { value: 'myvalue', label: 'mylabel' }
   * - from ['a', 'b'] make [{ value: 'a', label: 'a-i18n-label' }, { value: 'b', label: 'b-i18n-label' }]
   */
  value2rs = value => {
    if (!value) {
      return null
    }

    const { i18n } = this.context;

    const result = this.isMultiple() ?
      // cast a string into a single-element array
      (typeof value === 'string' ? [value] : value).map(name => ({
        value: name,
        label: getLabel(i18n)('states')(name)
      })) :
      {
        value,
        label: getLabel(i18n)('states')(value)
      }

    return result;
  }

  /**
   * Convert React-Select's value { value: 'myvalue', label: 'mylabel' } to value itself: 'myvalue'
   */
  rs2value = rsValue => {
    if (Array.isArray(rsValue)) {
      return rsValue.map(({ value }) => value)
    }
    if (rsValue) {
      return rsValue.value
    }
    return rsValue
  }

  handleAdd = _ => this.setState(prevState => ({
    releaseGuards: [...prevState.releaseGuards, {}]
  }));

  render() {
    const { i18n } = this.context;
    const { title, conditions, availableNames, from } = this.props;
    const { releaseGuards, showModal, currentIndex, modalType } = this.state;

    let modal;

    if (showModal) {
      let releaseGuard;

      if (isDef(currentIndex)) {
        releaseGuard = releaseGuards[currentIndex];
      }

      switch (modalType) {
        case 'guards':
          modal = (
            <Guards
              guards={(releaseGuard || {}).guards}
              conditions={conditions}
              title={i18n.getMessage('fsmWorkflowEditor.ui.guards.label')}
              onClose={this.handleCloseModal}
              onSave={this.handleSaveGuards(currentIndex)}
            />
          );
          break;
        default:
          modal = null;
      }
    }

    const releaseStateOptions = (availableNames || []).filter(name => name !== from).map(name => ({
      value: name,
      label: getLabel(i18n)('states')(name)
    }));

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
                  <th>{i18n.getMessage('fsmWorkflowEditor.ui.states.releaseGuards.table.to.label')}</th>
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
                  releaseGuards.length > 0 ?
                    releaseGuards.map(({ to }, index) => (
                      <tr key={`${JSON.stringify(to)}-${index}`}>
                        <td style={{ paddingTop: '15px' }}>
                          <Select
                            multi={this.isMode('multiple')}
                            removeSelected={true}
                            value={this.value2rs(to)}
                            options={releaseStateOptions}
                            onChange={value => this.handleChangeToState(index)(this.rs2value(value))}
                            placeholder='Any state' // TODO i18n
                          />
                        </td>
                        <td className='text-right'>
                          <ButtonGroup bsStyle='sm'>
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
                          onClick={this.handleAdd}
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
