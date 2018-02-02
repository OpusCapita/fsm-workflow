import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel,
  Checkbox
} from 'react-bootstrap';
import statePropTypes from './statePropTypes';
import withConfirmDialog from '../ConfirmDialog';
import ErrorLabel from '../ErrorLabel.react';

@withConfirmDialog
export default class StatesEditor extends PureComponent {
  static propTypes = {
    state: statePropTypes,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    existingStates: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  state = {
    name: '',
    description: '',
    ...this.props.state,
    initialName: (this.props.state || {}).name
  }

  handleChangeField = field => ({ target: { value } }) => this.setState({
    [field]: value
  })

  handleToggleField = field => _ => this.setState(prevState => ({
    [field]: !prevState[field]
  }))

  handleSave = _ => {
    const { name, description, isInitial, isFinal, initialName } = this.state;
    this.props.onSave({ name, description, isInitial, isFinal, initialName })
  }

  hasUnsavedChanges = _ => {
    const { state: propState } = this.props;

    const { name, description, isInitial, isFinal } = this.state;

    return propState ?
      !isEqual(propState, { name, description, isInitial, isFinal }) : // compare initial and current states
      name || description || isInitial || isFinal // look for any input for newely created object
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  render() {
    const { existingStates } = this.props;

    const {
      name,
      description,
      isInitial = false,
      isFinal = false,
      initialName
    } = this.state;

    const duplicateName = !!find(existingStates, existingName => existingName === name && initialName !== existingName);

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
              this.props.state ?
                `Edit state '${this.props.state.name}'` :
                `Add new state`
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId='stateName' style={{ marginBottom: 0 }}>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              placeholder='Enter state name'
              type='text'
              value={name}
              onChange={this.handleChangeField('name')}
            />
            <ErrorLabel {...(duplicateName && { error: `This state already exists` })}/>
          </FormGroup>
          <FormGroup controlId="stateDescription">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              placeholder="Enter state description"
              type='text'
              value={description}
              onChange={this.handleChangeField('description')}
            />
          </FormGroup>
          <Checkbox
            checked={isInitial}
            onChange={this.handleToggleField('isInitial')}
          >
            Initial
          </Checkbox>
          <Checkbox
            checked={isFinal}
            onChange={this.handleToggleField('isFinal')}
          >
            Final
          </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            onClick={this.handleSave}
            disabled={!name || duplicateName}
          >
            Ok
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
