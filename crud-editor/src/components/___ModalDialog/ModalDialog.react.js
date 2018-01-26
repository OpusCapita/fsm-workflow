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
  ok: {
    disabled: disableOk,
    onClick: handleOk
  },
  close: {
    onClick: handleClose
  }
}) {
  return (
    <Modal
      show={true}
      onHide={handleClose}
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
          disabled={disableOk}
          onClick={handleOk}
        >
          Ok
        </Button>
        <Button onClick={handleClose}>Close</Button>
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
