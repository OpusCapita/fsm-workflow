import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Table,
  ButtonGroup,
  Glyphicon
} from 'react-bootstrap';
import withConfirmDialog from '../ConfirmDialog';
import './ActionsTable.less';
import ActionInvocationEditor from './ActionInvocationEditor.react';
import { isDef } from '../utils';

@withConfirmDialog
export default class ActionsTable extends PureComponent {
  static propTypes = {
    transition: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      event: PropTypes.string,
      actions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        arguments: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          value: PropTypes.any
        }))
      }))
    }),
    actions: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    exampleObject: PropTypes.object,
    triggerDialog: PropTypes.func.isRequired // injected by withConfirmDialog
  }

  state = {
    transitionActions: this.props.transition.actions || [],
    showEditor: false,
    currentActionIndex: null
  }

  onDelete = index => this.setState(prevState => ({
    transitionActions: prevState.transitionActions.filter((_, i) => i !== index)
  }))

  handleClose = this.props.triggerDialog({
    showDialog: _ => false,
    confirmHandler: this.props.onClose
  })

  handleDelete = index => this.props.triggerDialog({
    confirmHandler: _ => this.onDelete(index),
    message: `Do you really want to remove this action?`
  })

  handleSave = _ => this.props.onSave(this.state.transitionActions)

  handleOpenEditor = index => _ => this.setState({
    showEditor: true,
    currentActionIndex: index
  })

  handleCloseEditor = _ => this.setState({
    showEditor: false,
    currentActionIndex: null
  })

  handleSaveAction = index => action => this.setState(prevState => ({
    transitionActions: isDef(index) ?
      prevState.transitionActions.map((ta, i) => i === index ? action : ta) :
      prevState.transitionActions.concat(action)
  }), this.handleCloseEditor)


  render() {
    const { title, actions } = this.props;

    const { transitionActions, showEditor, currentActionIndex } = this.state;

    let editorModal;

    if (showEditor) {
      let action;

      if (isDef(currentActionIndex)) {
        action = transitionActions[currentActionIndex]
      }

      editorModal = (
        <ActionInvocationEditor
          action={action}
          actions={actions}
          onClose={this.handleCloseEditor}
          exampleObject={this.props.exampleObject}
          transition={this.props.transition}
          onSave={this.handleSaveAction(currentActionIndex)}
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
            {
              transitionActions.length > 0 ?
                (
                  <Table className="oc-fsm-crud-editor--table-actions">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Arguments</th>
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
                        transitionActions.map(({ name, arguments: actionArgs = [] }, index) => (
                          <tr key={`${name}-${index}`}>
                            <td>{name}</td>
                            <td>
                              {
                                actionArgs.map(({ name, value }, i) => (
                                  <p key={`${i}-${name}`}><b>{name}:</b> {value}</p>
                                ))
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
                        ))
                      }
                    </tbody>
                  </Table>
                ) :
                (
                  <h4 style={{ textAlign: 'center' }}>
                    No actions specified for this transition. Go ahead and{`\u00A0`}
                    <a
                      onClick={this.handleOpenEditor()}
                      style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      add one
                    </a>!
                  </h4>
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
