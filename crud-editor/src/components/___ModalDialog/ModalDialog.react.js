import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button
} from 'react-bootstrap';
import './ModalDialog.less';

export default function ModalDialog({
  body,
  title,
  ok,
  close
}) {
  return (
    <Modal
      show={true}
      onHide={close.onClick}
      dialogClassName="oc-fsm-crud-editor--modal"
      backdrop='static'
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle='primary'
          disabled={ok.disabled}
          onClick={ok.onClick}
        >
          Ok
        </Button>
        <Button onClick={close.onClick}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.any,
  ok: PropTypes.shape({
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  }),
  close: PropTypes.shape({
    onClick: PropTypes.func
  })
}
