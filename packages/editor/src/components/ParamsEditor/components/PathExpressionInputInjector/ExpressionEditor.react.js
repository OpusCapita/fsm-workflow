import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ObjectInspector from '../../../ObjectInspector.react';
import { unifyPath } from '../../../utils';

export default class ExpressionEditor extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    currentPath: PropTypes.string
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    objectConfiguration: PropTypes.object.isRequired
  }

  handleClick = ({ path }) => {
    const { objectConfiguration: { alias = 'object' } } = this.context;
    this.props.onSelect(`${alias}${unifyPath(path)}`)
  }

  render() {
    const {
      objectConfiguration: {
        alias = 'object',
        example
      },
      i18n
    } = this.context;

    const { currentPath } = this.props;

    return (
      <Modal
        show={true}
        onHide={this.props.onClose}
        dialogClassName="oc-fsm-crud-editor--modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {i18n.getMessage('fsmWorkflowEditor.ui.paramsEditor.selectProperty', { businessObject: alias })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ObjectInspector
            name={alias}
            object={example}
            onClickPropName={this.handleClick}
            showValues={false}
            currentPath={currentPath}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onClose}>
            {i18n.getMessage('fsmWorkflowEditor.ui.buttons.close.label')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
