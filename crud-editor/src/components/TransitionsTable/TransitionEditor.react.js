import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
import withConfirmDialog from '../ConfirmDialog';

@withConfirmDialog
export default class Guards extends PureComponent {
  static propTypes = {
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    index: PropTypes.number,
    states: PropTypes.arrayOf(PropTypes.string),
    getStateLabel: PropTypes.func.isRequired,
    triggerDialog: PropTypes.func.isRequired // injected by withConfirmDialog
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

  handleClose = this.props.triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  render() {
    const { states, getStateLabel } = this.props;

    const {
      from,
      to,
      event,
      isCreating
    } = this.state;

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
                `Add new transition` :
                `Edit transition`
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId='transitionEvent'>
            <ControlLabel>Event</ControlLabel>
            <FormControl
              placeholder='Enter event name'
              type='text'
              value={event}
              onChange={this.handleChangeField('event')}
            />
          </FormGroup>
          <FormGroup controlId="transitionFrom">
            <ControlLabel>From</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select 'from' state"
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
            <ControlLabel>To</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select 'to' state"
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
            Ok
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
