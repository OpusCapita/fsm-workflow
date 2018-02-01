import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import {
  Button,
  Modal,
  Table,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
import withConfirmDialog from '../ConfirmDialog';
import CodeEditor from '../CodeEditor';

@withConfirmDialog
export default class TransitionActionEditor extends PureComponent {
  static propTypes = {

  }

  state = {
    name: '',
    arguments: [],
    ...(this.props.action || {})
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

  render() {
    const { actions, exampleObject } = this.props;

    const { name, arguments: actionArgs } = this.state;

    console.log(this.props)

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
                    value={JSON.stringify(exampleObject, null, 2)}
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
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            onClick={this.handleSave}
          >
            Ok
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
