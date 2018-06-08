import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import statePropTypes from './statePropTypes';
import withConfirmDialog from '../ConfirmDialog';
import ErrorLabel from '../ErrorLabel.react';

@withConfirmDialog
export default class StateEditor extends PureComponent {
  static propTypes = {
    fsmState: statePropTypes,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    existingStates: PropTypes.arrayOf(PropTypes.string).isRequired,
    stateConfig: PropTypes.shape({
      availableNames: PropTypes.arrayOf(PropTypes.string)
    })
  }

  state = {
    name: '',
    description: '',
    ...this.props.fsmState,
    initialName: (this.props.fsmState || {}).name
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
    const { fsmState } = this.props;

    const { name, description, isInitial, isFinal } = this.state;

    return fsmState ?
      !isEqual(fsmState, { name, description, isInitial, isFinal }) : // compare initial and current states
      name || description || isInitial || isFinal // look for any input for newely created object
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  render() {
    const { existingStates, stateConfig } = this.props;

    const {
      name,
      description,
      isInitial = false,
      isFinal = false,
      initialName
    } = this.state;

    const duplicateName = !!find(
      existingStates,
      existingName => existingName === name && initialName !== existingName
    );

    const { availableNames } = (stateConfig || {});

    let nameInput = (
      <FormControl
        placeholder='Enter state name'
        type='text'
        value={name}
        onChange={this.handleChangeField('name')}
      />
    );

    if (availableNames) {
      if (availableNames.every(name => existingStates.indexOf(name) > -1) && !name) {
        nameInput = (
          <div>No available names left.</div>
        )
      } else {
        nameInput = (
          <FormControl
            componentClass='select'
            placeholder=''
            value={name}
            onChange={this.handleChangeField('name')}
          >
            {
              !name && (<option value='' ></option>)
            }
            {
              availableNames.
                filter(availableName => availableName === name || existingStates.indexOf(availableName) === -1).
                map((name, i) => (
                  <option value={name} key={i}>{name}</option>
                ))
            }
          </FormControl>
        )
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
            {
              this.props.fsmState ?
                `Edit state '${this.props.fsmState.name}'` :
                `Add new state`
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId='stateName' style={{ marginBottom: 0 }}>
            <ControlLabel>Name</ControlLabel>
            {
              nameInput
            }
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
