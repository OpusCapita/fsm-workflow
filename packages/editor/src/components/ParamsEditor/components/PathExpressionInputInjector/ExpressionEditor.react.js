import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ObjectInspector from '../../../ObjectInspector.react';
import { formatLabel } from '../../../utils';

export default class ExpressionEditor extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  static contextTypes = {
    objectConfiguration: PropTypes.object.isRequired
  }

  handleClick = ({ path }) => this.props.onSelect(
    path.split('.').slice(1).map(s => `[${JSON.stringify(s)}]`).join('')
  )

  render() {
    const {
      objectConfiguration: {
        alias = 'object',
        example
      }
    } = this.context;

    return (
      <Modal
        show={true}
        onHide={this.props.onClose}
        dialogClassName="oc-fsm-crud-editor--modal"
        backdrop='static'
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            Choose property of {alias}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ObjectInspector
            name={formatLabel(alias)}
            object={example}
            onClickPropName={this.handleClick}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
