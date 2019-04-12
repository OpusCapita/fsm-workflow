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
import withConfirmDialog from '../ConfirmDialog';
import Label from '../Label.react';
import ErrorLabel from '../ErrorLabel.react';
import { getLabel } from '../utils';

@withConfirmDialog
export default class ReleaseEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    from: PropTypes.string.isRequired, // source state
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    usedNames: PropTypes.arrayOf(PropTypes.string),
    availableNames: PropTypes.arrayOf(PropTypes.string)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  static defaultProps = {
    usedNames: []
  }

  state = {
    to: this.props.value
  }

  handleSave = _ => {
    const { to } = this.state;
    this.props.onSave(to)
  }

  hasUnsavedChanges = _ => {
    const { value } = this.props;
    const { to } = this.state;

    return value ?
      value !== to : // compare initial and current states
      to // look for any input for newely created object
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  });

  getLabelHint = name => {
    const { i18n } = this.context;
    const label = getLabel(i18n)('states')(name);
    return name === label ? null : i18n.getMessage('fsmWorkflowEditor.ui.states.labelHint', { label })
  }

  render() {
    const { i18n } = this.context;
    const { usedNames, availableNames } = this.props;

    const { to } = this.state;

    const getStateLabel = getLabel(i18n)('states');

    let input = (
      <FormControl
        placeholder={i18n.getMessage('fsmWorkflowEditor.ui.states.name.placeholder')}
        type='text'
        value={to}
        onChange={({ target: { value } }) => this.setState({ to: value })}
      />
    );

    if (availableNames) {
      if (availableNames.every(name => usedNames.indexOf(name) > -1) && !name) {
        input = (
          <div>{i18n.getMessage('fsmWorkflowEditor.ui.states.noAvailableNamesLeft')}</div>
        )
      } else {
        input = (
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
                filter(availableName => availableName === name || usedNames.indexOf(availableName) === -1).
                sort().
                map((name, i) => (<option value={name} key={i}>{getStateLabel(name)}</option>))
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
              this.props.value ?
                i18n.getMessage('fsmWorkflowEditor.ui.states.editor.title.edit', {
                  stateName: getStateLabel(this.props.value.name)
                }) :
                i18n.getMessage('fsmWorkflowEditor.ui.states.editor.title.add')
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId='stateName' style={{ marginBottom: 0 }}>
            <ControlLabel>{i18n.getMessage('fsmWorkflowEditor.ui.states.name.label')}</ControlLabel>
            {
              nameInput
            }
            {
              duplicateName ?
                (
                  <ErrorLabel error={i18n.getMessage('fsmWorkflowEditor.ui.states.stateAlreadyExists')}/>
                ) :
                (
                  <Label
                    {...(!availableNames && { message: this.getLabelHint(name) })}
                    style={{ border: 'transparent' }}
                  />
                )
            }
          </FormGroup>
          <FormGroup controlId="stateDescription">
            <ControlLabel>{i18n.getMessage('fsmWorkflowEditor.ui.states.description.label')}</ControlLabel>
            <FormControl
              placeholder={i18n.getMessage('fsmWorkflowEditor.ui.states.description.placeholder')}
              type='text'
              value={description}
              onChange={this.handleChangeField('description')}
            />
          </FormGroup>
          <Checkbox
            checked={isInitial}
            onChange={this.handleToggleField('isInitial')}
          >
            {i18n.getMessage('fsmWorkflowEditor.ui.states.initial.label')}
          </Checkbox>
          <Checkbox
            checked={isFinal}
            onChange={this.handleToggleField('isFinal')}
          >
            {i18n.getMessage('fsmWorkflowEditor.ui.states.final.label')}
          </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            onClick={this.handleSave}
            disabled={!name || duplicateName}
          >
            {i18n.getMessage('fsmWorkflowEditor.ui.buttons.ok.label')}
          </Button>
          <Button onClick={this.handleClose}>
            {i18n.getMessage('fsmWorkflowEditor.ui.buttons.cancel.label')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
