import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import {
  Button,
  Modal,
  Table,
  FormControl,
  FormGroup,
  ControlLabel,
  Glyphicon
} from 'react-bootstrap';
import withConfirmDialog from '../ConfirmDialog';
import CodeEditor from '../CodeEditor';
import { invokeAction } from './utils';

@withConfirmDialog
export default class TransitionActionEditor extends PureComponent {
  static propTypes = {
    action: PropTypes.object,
    actions: PropTypes.arrayOf(PropTypes.object),
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
    }),
    triggerDialog: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    exampleObject: PropTypes.object,
    onSave: PropTypes.func.isRequired
  }

  state = {
    name: '',
    arguments: [],
    ...(this.props.action || {}),
    isCreating: !this.props.action,
    exampleObject: JSON.stringify(this.props.exampleObject, null, 2),
    invocationResults: null
  }

  handleClose = this.props.triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  handleSelectFunction = ({ target: { value } }) => this.setState(prevState => ({
    name: value,
    arguments: value ?
      value === (this.props.action || {}).name ?
        ((this.props.action || {}).arguments || []) :
        Object.keys(
          (find(this.props.actions, ({ name }) => name === value).argumentsSchema || {}).properties || {}
        ).map(name => ({ name })) :
      []
  }))

  handleChangeArg = argName => ({ target: { value } }) => this.setState(prevState => ({
    arguments: prevState.arguments.map(
      ({ name, ...rest }) => ({
        name,
        ...rest,
        ...(argName === name && { value })
      })
    )
  }))

  handleSave = _ => this.props.onSave({
    name: this.state.name,
    arguments: this.state.arguments
  })

  handleChangeObject = value => {
    try {
      JSON.parse(value);

      this.setState(prevState => ({
        exampleObject: value,
        exampleObjectError: null
      }))
    } catch (err) {
      this.setState({
        exampleObject: value,
        exampleObjectError: err.message
      })
    }
  }

  handleInvoke = _ => {
    const {
      exampleObject,
      name,
      arguments: actionArgs
    } = this.state;

    const {
      actions,
      transition: {
        from,
        to,
        event
      }
    } = this.props;

    const commonArgs = {
      object: JSON.parse(exampleObject),
      from,
      to,
      event
    }

    this.setState({
      invocationResults: invokeAction(actions, name, actionArgs, commonArgs)
    })
  }

  render() {
    const { actions } = this.props;

    const {
      name,
      arguments: actionArgs,
      exampleObject,
      exampleObjectError,
      invocationResults
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
            Action invocation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="oc-fsm-crud-editor--table-actions">
            <thead>
              <tr>
                <th>Current action</th>
                <th style={{ width: '30px' }}></th>
                <th>Arguments</th>
                <th>Example Object</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Choose function</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value={name || ''}
                      onChange={this.handleSelectFunction}
                    >
                      <option value="">Select</option>
                      {
                        (actions || []).map(({ name }, i) => (
                          <option key={`${i}-${name}`} value={name}>{name}</option>
                        ))
                      }
                    </FormControl>
                  </FormGroup>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Results</div>
                  <CodeEditor
                    className="output-code"
                    value={String(invocationResults).trim()}
                    options={{
                      theme: "eclipse",
                      lineWrapping: true,
                      readOnly: 'nocursor'
                    }}
                  />
                </td>
                <td>
                  <Glyphicon
                    glyph='play'
                    style={{ position: 'relative', top: '32px', cursor: 'pointer' }}
                    onClick={this.handleInvoke}
                    disabled={!this.state.name}
                  />
                </td>
                <td>
                  {
                    actionArgs.map(({ name, value }, i) => (
                      <FormGroup
                        key={`${i}-${name}`}
                        controlId="formControlsSelect"
                      >
                        <ControlLabel>{name}</ControlLabel>
                        <FormControl
                          value={value || ''}
                          placeholder="Enter value"
                          onChange={this.handleChangeArg(name)}
                        />
                      </FormGroup>
                    ))
                  }
                </td>
                <td>
                  <CodeEditor
                    className="example-object"
                    value={exampleObject}
                    options={{
                      mode: {
                        name: 'javascript',
                        json: true
                      },
                      theme: "eclipse",
                      lineNumbers: true,
                      lineWrapping: true
                    }}
                    onChange={this.handleChangeObject}
                  />
                  <span style={{ color: 'red' }}>{exampleObjectError}{`\u00A0`}</span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            onClick={this.handleSave}
            disabled={!this.state.name}
          >
            Ok
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
