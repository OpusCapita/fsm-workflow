import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import withConfirmDialog from '../ConfirmDialog';
import { getLabel } from '../utils';

@withConfirmDialog
export default class TransitionEditor extends PureComponent {
  static propTypes = {
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    index: PropTypes.number,
    states: PropTypes.arrayOf(PropTypes.string)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    event: '',
    from: '',
    to: '',
    ...(this.props.transition || {}),
    isCreating: !this.props.transition
  }

  handleChangeField = field => ({ target: { value } }) => this.setState({
    [field]: value
  })

  handleSave = _ => {
    const { event, from, to } = this.state;

    const { index } = this.props;

    const result = {
      event,
      from,
      to,
      index
    }

    this.props.onSave(result)
  }

  hasUnsavedChanges = _ => {
    const { transition } = this.props;

    const initialTransition = pick(transition, ['event', 'from', 'to']);

    const { event, from, to } = this.state;

    return transition ?
      !isEqual(initialTransition, { event, from, to }) :
      event || from || to
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  render() {
    const { i18n } = this.context;
    const { states } = this.props;
    const { from, to, event, isCreating } = this.state;
    const getStateLabel = getLabel(i18n)('states');

    return (
      <Modal
        show={true}
        onHide={this.handleClose}
        dialogClassName="oc-fsm-crud-editor--modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {
              isCreating ?
                i18n.getMessage('fsmWorkflowEditor.ui.transitions.editor.title.add') :
                i18n.getMessage('fsmWorkflowEditor.ui.transitions.editor.title.edit')
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId='transitionEvent'>
            <ControlLabel>{i18n.getMessage('fsmWorkflowEditor.ui.transitions.event.label')}</ControlLabel>
            <FormControl
              placeholder={i18n.getMessage('fsmWorkflowEditor.ui.transitions.event.placeholder')}
              type='text'
              value={event}
              onChange={this.handleChangeField('event')}
            />
          </FormGroup>
          <FormGroup controlId="transitionFrom">
            <ControlLabel>{i18n.getMessage('fsmWorkflowEditor.ui.transitions.from.label')}</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder={i18n.getMessage('fsmWorkflowEditor.ui.transitions.from.placeholder')}
              value={from}
              onChange={this.handleChangeField('from')}
            >
              {
                (from ? [] : ['']).concat(states).map((state, i) => (
                  <option value={state} key={`${state}-${i}`}>{getStateLabel(state)}</option>
                ))
              }
            </FormControl>
          </FormGroup>
          <FormGroup controlId="transitionTo">
            <ControlLabel>{i18n.getMessage('fsmWorkflowEditor.ui.transitions.to.label')}</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder={i18n.getMessage('fsmWorkflowEditor.ui.transitions.to.placeholder')}
              value={to}
              onChange={this.handleChangeField('to')}
            >
              {
                (to ? [] : ['']).concat(states).map((state, i) => (
                  <option value={state} key={`${state}-${i}`}>{getStateLabel(state)}</option>
                ))
              }
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            onClick={this.handleSave}
            disabled={!(from && to && event)}
          >
            {i18n.getMessage('fsmWorkflowEditor.ui.buttons.ok.label')}
          </Button>
          <Button onClick={this.handleClose}>{i18n.getMessage('fsmWorkflowEditor.ui.buttons.close.label')}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
