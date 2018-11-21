import React, { Component } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import FormControl from 'react-bootstrap/lib/FormControl';
// import Glyphicon from 'react-bootstrap/lib/Glyphicon';
// import Checkbox from 'react-bootstrap/lib/Checkbox';
import withConfirmDialog from '../ConfirmDialog';
// import CodeEditor from '../CodeEditor';
import { invokeAction, getParamSchema } from './utils';
import { isDef, omitIfEmpty, getLabel } from '../utils';
import './ActionInvocationEditor.less';
import ParamsEditor from '../ParamsEditor';

@withConfirmDialog
export default class ActionInvocationEditor extends Component {
  static propTypes = {
    action: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    componentsRegistry: PropTypes.objectOf(PropTypes.func)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    objectConfiguration: PropTypes.object.isRequired
  }

  state = {
    name: '',
    params: [],
    ...(this.props.action || {}),
    exampleObject: JSON.stringify(this.context.objectConfiguration.example, null, 2),
    invocationResults: null,
    autoplay: false,
    showExampleObject: false
  }

  hasUnsavedChanges = _ => {
    const { name: pName = '', params: pArgs = [] } = this.props.action || {};
    const { name: sName, params: sArgs } = this.state;
    const result = !isEqual(
      {
        name: pName,
        params: pArgs.map(omitIfEmpty('expression'))
      },
      {
        name: sName,
        params: sArgs.map(omitIfEmpty('expression')).filter(({ value }) => isDef(value))
      }
    );
    return result
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose
  })

  handleSelect = ({ target: { value } }) => this._triggerDialog({
    showDialog: _ => {
      const { name: pName, params: propParams } = this.props.action || {};
      const { name: sName, params: stateParams } = this.state;

      return pName === sName ?
        !isEqual(propParams, stateParams) ||
        stateParams.some(
          ({ name, value }) => !find(propParams, ({ name: paramName }) => name === paramName) && isDef(value)
        ) :
        stateParams.some(({ value }) => isDef(value))
    },
    confirmHandler: _ => this.setState(prevState => ({
      name: value,
      params: value ?
        value === (this.props.action || {}).name ?
          ((this.props.action || {}).params || []) :
          Object.keys(
            (this.props.actions[value].paramsSchema || {}).properties || {}
          ).map(name => ({ name })) :
        []
    }), this.state.autoplay && this.handleInvoke)
  })(value)

  handleChangeParam = param => ({ value, expression }) => this.setState(prevState => ({
    params: (
      // either change existing param or add a new one
      params => find(params, ({ name }) => name === param) ? params : params.concat({ name: param })
    )(prevState.params).map(
      ({ name, ...rest }) => ({
        name,
        ...rest,
        ...(param === name && {
          value: (this.getParamSchema(param) || {}).type === 'boolean' && !expression ? // toggle boolean values
            !(find(prevState.params, ({ name: n }) => n === name) || {}).value :
            value,
          expression
        })
      })
    )
  }), this.state.autoplay && this.handleInvoke)

  handleSave = _ => this.props.onSave({
    name: this.state.name,
    params: this.state.params.filter(({ value }) => Array.isArray(value) ? value.length : isDef(value))
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
    const { exampleObject, name, params } = this.state;

    if (!name) {
      return;
    }

    const {
      transition: { from, to, event }
    } = this.props;

    const commonArgs = { object: JSON.parse(exampleObject), from, to, event };
    this.setState({ invocationResults: invokeAction(name, params, commonArgs) });
  }

  handleToggleAutoplay = _ => this.setState(prevState => ({
    autoplay: !prevState.autoplay
  }), _ => {
    const { autoplay } = this.state;
    if (autoplay) {
      this.handleInvoke()
    }
  })

  getParam = name => find(this.state.params, ({ name: paramName }) => paramName === name) || {}

  getParamSchema = param => getParamSchema({
    actions: this.props.actions,
    action: this.state.name,
    param
  })

  handleObjectVisibility = _ => this.setState(prevState => ({
    showExampleObject: !prevState.showExampleObject
  }))

  render() {
    const { i18n } = this.context;
    const { actions, componentsRegistry } = this.props;

    const {
      name: actionName,
      // exampleObject,
      // exampleObjectError,
      // invocationResults,
      // autoplay,
      // showExampleObject
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
            {i18n.getMessage('fsmWorkflowEditor.ui.actions.editor.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: 0 }}>
          <Table className="oc-fsm-crud-editor--table-actions">
            <thead>
              <tr>
                <th>
                  <div className="oc-fsm-crud-editor--modal-heading">
                    <div className="output-heading">
                      <b>{i18n.getMessage('fsmWorkflowEditor.ui.actions.editor.chooseAction')}</b>
                      <div className='right-block'>
                        <FormControl
                          componentClass="select"
                          value={actionName || ''}
                          onChange={this.handleSelect}
                        >
                          <option value=""></option>
                          {
                            Object.keys(actions).map((name, i) => (
                              <option key={`${i}-${name}`} value={name}>
                                {getLabel(i18n)('actions')(name)}
                              </option>
                            ))
                          }
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </th>
                {/* <th style={{ width: '30%' }}>
                  <div className="oc-fsm-crud-editor--modal-heading">
                    <div className="output-heading">
                      <b>Results</b>
                      <div className='right-block'>
                        <div>
                          <Glyphicon
                            glyph='play'
                            style={{
                              ...(actionName && autoplay ? { color: '#ddd' } : { cursor: 'pointer' })
                            }}
                            {...(actionName && !autoplay && { onClick: this.handleInvoke }) }
                          />
                        </div>
                        <Checkbox
                          onChange={this.handleToggleAutoplay}
                          checked={!!autoplay}
                        >
                          Autoplay
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {
                    actions[actionName] &&
                    (
                      <ParamsEditor
                        paramsSchema={actions[actionName].paramsSchema}
                        params={
                          Object.keys(actions[actionName].paramsSchema.properties).reduce(
                            (acc, cur) => ({ ...acc, [cur]: this.getParam(cur) }), {}
                          )
                        }
                        onChangeParam={this.handleChangeParam}
                        componentsRegistry={componentsRegistry}
                        getLabel={getLabel(i18n)(`actions.${actionName}.params`)}
                      />
                    )
                  }
                </td>
                {/* <td>
                  <CodeEditor
                    className="oc-fsm-crud-editor--modal-actions-results"
                    value={isDef(invocationResults) ? String(invocationResults).trim() : ''}
                    options={{
                      theme: "eclipse",
                      lineWrapping: true,
                      readOnly: 'nocursor'
                    }}
                  />
                  <div style={{ margin: '10px 0' }}>
                    Note: instead of a real action DEMO action is invoked.{`\u00A0`}
                    It just prints all passed parameters.
                  </div>
                  <div>
                    <h4
                      style={{ cursor: 'pointer' }}
                      onClick={this.handleObjectVisibility}
                    >
                      Example object{`\u2000`}
                      <i className={`fa fa-angle-${showExampleObject ? 'up' : 'down'}`}></i>
                    </h4>
                  </div>
                  <div
                    className={`oc-fsm-crud-editor--modal-actions-object${showExampleObject ? ' visible-object' : ''}`}
                  >
                    {
                      showExampleObject &&
                      <CodeEditor
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
                    }
                  </div>
                  <span style={{ color: 'red' }}>{exampleObjectError}{`\u00A0`}</span>
                </td> */}
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
