import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import withConfirmDialog from '../ConfirmDialog';
import { isDef, formatArg, formatLabel } from '../utils';
import { removeEmptyParams } from './utils';
import guardPropTypes from './guardPropTypes';
import GuardEditor from './GuardEditor.react';
import './Guards.less';

@withConfirmDialog
export default class AutomaticTable extends PureComponent {
  static propTypes = {
    guards: PropTypes.oneOfType([
      PropTypes.arrayOf(guardPropTypes),
      PropTypes.bool
    ]),
    conditions: PropTypes.objectOf(PropTypes.shape({
      paramsSchema: PropTypes.object
    })),
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    componentsRegistry: PropTypes.objectOf(PropTypes.func)
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    guards: this.props.guards || [],
    showEditor: false,
    currentGuardIndex: null
  }

  onDelete = index => this.setState(prevState => ({
    guards: prevState.guards.filter((_, i) => i !== index)
  }))

  hasUnsavedChanges = _ => {
    const { guards: stateGuards } = this.state;
    const { guards: propsGuards } = this.props;
    if (!isDef(propsGuards) && stateGuards.length === 0) {
      return false
    }
    if (
      // Next line checks for primitive/reference types. Reference types return true, primitives return false.
      ((Object(stateGuards) === stateGuards) !== (Object(propsGuards) === propsGuards)) ||
      (!isDef(propsGuards) && stateGuards === true)
    ) {
      return true
    }
    return !isEqual(stateGuards, propsGuards)
  }

  handleClose = this._triggerDialog({
    showDialog: this.hasUnsavedChanges,
    confirmHandler: this.props.onClose,
    title: 'Confirmation',
    message: 'You have made changes. Closing this editor will lose these changes.'
  })

  handleDelete = index => this._triggerDialog({
    confirmHandler: _ => this.onDelete(index),
    message: `Do you really want to remove this guard?`
  })

  handleToggle = this._triggerDialog({
    showDialog: _ => {
      const { guards: stateGuards } = this.state;
      const { guards: propsGuards } = this.props;
      if (
        stateGuards === true ||
        (!isDef(propsGuards) && stateGuards.length === 0) ||
        isEqual(stateGuards, propsGuards)
      ) {
        return false
      }
      return true
    },
    confirmHandler: _ => this.setState(
      prevState => prevState.guards !== true ?
        { guards: true } :
        { guards: Array.isArray(this.props.guards) ? this.props.guards : [] }
    ),
    title: 'Confirmation',
    message: 'You have made changes. Checking this will lose these changes.'
  });

  handleSave = _ => this.props.onSave(this.state.guards)

  handleOpenEditor = index => _ => this.setState({
    showEditor: true,
    currentGuardIndex: index
  })

  handleCloseEditor = _ => this.setState({
    showEditor: false,
    currentGuardIndex: null
  })

  handleSaveGuard = index => guard => this.setState(prevState => {
    const guardIsDefined = ('expression' in guard && !!guard.expression) ||
      Object.keys(guard).filter(k => k !== 'expression').length > 0;
    const cleanGuard = removeEmptyParams(guard);
    let newGuards;
    if (isDef(index)) {
      newGuards = guardIsDefined ?
        prevState.guards.map((g, i) => i === index ? cleanGuard : g) :
        prevState.guards.filter((_, i) => i !== index)
    } else {
      newGuards = guardIsDefined && prevState.guards.concat(cleanGuard)
    }
    return newGuards ? { guards: newGuards } : {}
  }, this.handleCloseEditor);

  render() {
    const { i18n } = this.context;
    const { title, conditions, componentsRegistry } = this.props;
    const { guards, showEditor, currentGuardIndex } = this.state;

    let editorModal;

    if (showEditor) {
      let guard;

      if (isDef(currentGuardIndex)) {
        guard = guards[currentGuardIndex]
      }

      editorModal = (
        <GuardEditor
          guard={guard}
          conditions={conditions}
          componentsRegistry={componentsRegistry}
          onClose={this.handleCloseEditor}
          onSave={this.handleSaveGuard(currentGuardIndex)}
        />
      )
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
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="oc-fsm-crud-editor--states-editor">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="always-automatic"
                checked={guards === true}
                onChange={this.handleToggle}
              />
              <label className="form-check-label" htmlFor="always-automatic">{`\u2000`}Always automatic</label>
            </div>
            {
              guards !== true && (
                <Table className="oc-fsm-crud-editor--table-actions">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Parameters</th>
                      <th style={{ width: '60px' }}>Negate</th>
                      <th className='text-right'>
                        <Button
                          bsSize='sm'
                          onClick={this.handleOpenEditor()}
                        >
                          Add
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      guards.length > 0 ?
                        guards.map(({ name: guardName, params, expression, negate }, index) => (
                          <tr key={`${guardName}-${index}`}>
                            <td style={{ paddingTop: '15px' }}>
                              {
                                guardName ?
                                  formatLabel(guardName) :
                                  'JavaScript Expression'
                              }
                            </td>
                            <td>
                              {
                                (Array.isArray(params) && params.length > 0) ?
                                  (
                                    <table className="oc-fsm-crud-editor--table-actions-parameters">
                                      <tbody>
                                        {
                                          params.map(({ name, value, expression }, i) => {
                                            return (
                                              <tr key={`${i}-${name}`}>
                                                <td>{formatLabel(name)}</td>
                                                <td className="parameter-value">
                                                  {
                                                    formatArg({
                                                      i18n,
                                                      schema: conditions[guardName].paramsSchema.properties[name],
                                                      value,
                                                      expression
                                                    })
                                                  }
                                                </td>
                                              </tr>
                                            )
                                          })
                                        }
                                      </tbody>
                                    </table>
                                  ) :
                                  expression ?
                                    (
                                      <pre>{expression}</pre>
                                    ) :
                                    null
                              }
                            </td>
                            <td className='text-center'>
                              {
                                negate && (<i className='fa fa-check'></i>)
                              }
                            </td>
                            <td className='text-right'>
                              <ButtonGroup bsStyle='sm'>
                                <Button
                                  onClick={this.handleOpenEditor(index)}
                                >
                                  <Glyphicon glyph='edit' />
                                  {'\u2000'}
                                  Edit
                                </Button>
                                <Button
                                  onClick={this.handleDelete(index)}
                                >
                                  <Glyphicon glyph='trash' />
                                  {'\u2000'}
                                  Delete
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
                        )) :
                        <tr>
                          <td colSpan={3} style={{ textAlign: 'center' }}>
                            No automatic guards specified for this transition. Go ahead and{`\u00A0`}
                            <a
                              onClick={this.handleOpenEditor()}
                              style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              add new
                            </a>!
                          </td>
                        </tr>
                    }
                  </tbody>
                </Table>
              )
            }
            {editorModal}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
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
