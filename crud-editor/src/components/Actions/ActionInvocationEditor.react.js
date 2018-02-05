import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import {
  Button,
  Modal,
  Table,
  FormControl,
  FormGroup,
  ControlLabel,
  Glyphicon,
  Checkbox
} from 'react-bootstrap';
import withConfirmDialog from '../ConfirmDialog';
import CodeEditor from '../CodeEditor';
import { invokeAction, getActionArgType } from './utils';
import { isDef } from '../utils';
import components from './components';

const getComponentByType = type => components[type] || components.string;

@withConfirmDialog
export default class TransitionActionEditor extends PureComponent {
  static propTypes = {
    action: PropTypes.object,
    actions: PropTypes.shape({
      paramsSchema: PropTypes.object
    }),
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
    exampleObject: PropTypes.object,
    onSave: PropTypes.func.isRequired
  }

  state = {
    name: '',
    params: [],
    ...(this.props.action || {}),
    isCreating: !this.props.action,
    exampleObject: JSON.stringify(this.props.exampleObject, null, 2),
    invocationResults: null,
    autoplay: false
  }

  getActionArgType = param => getActionArgType({
    actions: this.props.actions,
    action: this.state.name,
    param
  })

  hasUnsavedChanges = _ => {
    const { name: pName = '', params: pArgs = [] } = this.props.action || {};

    const { name: sName, params: sArgs } = this.state;

    const result = !isEqual({ name: pName, params: pArgs }, { name: sName, params: sArgs });

    return result
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  handleSelectFunction = ({ target: { value } }) => this.setState(prevState => ({
    name: value,
    params: value ?
      value === (this.props.action || {}).name ?
        ((this.props.action || {}).params || []) :
        Object.keys(
          (this.props.actions[value].paramsSchema || {}).properties || {}
        ).map(name => ({ name })) :
      []
  }), this.state.autoplay && this.handleInvoke)

  handleChangeArg = param => ({ target: { value } }) => this.setState(prevState => ({
    params: (
      // either change existing param or add a new one
      params => find(params, ({ name }) => name === param) ? params : params.concat({ name: param })
    )(prevState.params).map(
      ({ name, ...rest }) => ({
        name,
        ...rest,
        ...(param === name && {
          value: this.getActionArgType(param) === 'boolean' ? // toggle boolean values
            !(find(prevState.params, ({ name: n }) => n === name) || {}).value :
            value
        })
      })
    )
  }), this.state.autoplay && this.handleInvoke)

  handleSave = _ => this.props.onSave({
    name: this.state.name,
    params: this.state.params
  })

  handleChangeObject = value => {
    try {
      JSON.parse(value);

      this.setState(prevState => ({
        exampleObject: value,
        exampleObjectError: null
      }), this.state.autoplay && this.handleInvoke)
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
      params
    } = this.state;

    if (!name) {
      return;
    }

    const {
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
      invocationResults: invokeAction(name, params, commonArgs)
    })
  }

  handleToggleAutoplay = _ => this.setState(prevState => ({
    autoplay: !prevState.autoplay
  }), _ => {
    const { autoplay } = this.state;
    if (autoplay) {
      this.handleInvoke()
    }
  })

  render() {
    const { actions } = this.props;

    const {
      name: actionName,
      params,
      exampleObject,
      exampleObjectError,
      invocationResults,
      autoplay
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
                <th>Parameters</th>
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
                      value={actionName || ''}
                      onChange={this.handleSelectFunction}
                    >
                      <option value="">Select</option>
                      {
                        Object.keys(actions).map((name, i) => (
                          <option key={`${i}-${name}`} value={name}>{name}</option>
                        ))
                      }
                    </FormControl>
                  </FormGroup>
                  <div className="oc-fsm-crud-editor--modal-heading">
                    <div className="output-heading">
                      <b>Results</b>
                      <div className='right-block'>
                        <Glyphicon
                          glyph='play'
                          style={{
                            ...(actionName && autoplay ? { color: '#ddd' } : { cursor: 'pointer' })
                          }}
                          {...(actionName && !autoplay && { onClick: this.handleInvoke }) }
                        />
                        <Checkbox
                          onChange={this.handleToggleAutoplay}
                          checked={!!autoplay}
                        >
                          Autoplay
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                  <CodeEditor
                    className="output-code"
                    value={isDef(invocationResults) ? String(invocationResults).trim() : ''}
                    options={{
                      theme: "eclipse",
                      lineWrapping: true,
                      readOnly: 'nocursor'
                    }}
                  />
                  <p>Not sure this is needed.</p>
                </td>
                <td>
                  {
                    actions[actionName] &&
                    Object.keys(actions[actionName].paramsSchema.properties).map((name, i) => (
                      <FormGroup
                        key={`${i}-${name}`}
                        controlId="formControlsSelect"
                      >
                        <ControlLabel>{name}</ControlLabel>
                        {
                          (
                            Component => (
                              <Component
                                value={(find(params, ({ name: paramName }) => paramName === name) || {}).value}
                                placeholder="Enter value"
                                onChange={this.handleChangeArg(name)}
                              />
                            )
                          )(getComponentByType(getActionArgType({ actions, action: actionName, param: name })))
                        }
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
                  <p>Not sure this is needed.</p>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle='primary'
            onClick={this.handleSave}
            disabled={!actionName}
          >
            Ok
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
