import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  ControlLabel,
  Checkbox
} from 'react-bootstrap';
import statePropTypes from './statePropTypes';

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

  render() {
    const { onClose, existingStates } = this.props;

    const {
      name,
      description,
      isInitial = false,
      isFinal = false,
      initialName
    } = this.state;

    return (
      <Modal
        show={true}
        onHide={onClose}
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
          <FormGroup controlId='stateName'>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              placeholder='Enter state name'
              type='text'
              value={name}
              onChange={this.handleChangeField('name')}
            />
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
            disabled={
              !name ||
              !!find(existingStates, existingName => existingName === name && initialName !== existingName)
            }
          >
            Ok
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
