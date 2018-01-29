import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default WrappedComponent => class ConfirmDialog extends PureComponent {
  static propTypes = {
    textCancel: PropTypes.string,
    textConfirm: PropTypes.string,
  }

  static defaultProps = {
    showDialog: _ => true,
    textCancel: 'Cancel',
    textConfirm: 'Ok'
  }

  state = {
    show: false,
    confirmHandler: null,
    title: 'Confirmation',
    message: 'You have made changes. Closing this editor will lose these changes.'
  }

  componentDidMount = _ => {
    this._mountNode = document.createElement('div');
    this.renderDialog();
  };

  componentDidUpdate = _ => {
    if (this._mountNode) {
      this.renderDialog();
    }
  };

  componentWillUnmount = _ => {
    ReactDOM.unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
  };

  handleClose = _ => this.setState({
    show: false,
    confirmHandler: null
  })

  handleConfirm = event => {
    this.state.confirmHandler(event)
    this.handleClose();
  }

  createDialog = _ => {
    const {
      textConfirm,
      textCancel
    } = this.props;

    const { show, title, message } = this.state;

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <div className="text-right">
            <Button
              onClick={this.handleConfirm}
              bsStyle="primary"
            >
              {textConfirm}
            </Button>
            <Button
              onClick={this.handleClose}
            >
              {textCancel}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }

  handleInjectedFunc = ({ showDialog, confirmHandler, title, message }) => event => showDialog() ?
    this.setState({
      show: true,
      confirmHandler: _ => confirmHandler(event),
      ...(title && { title }),
      ...(message && { message }),
    }) :
    confirmHandler(event)

  renderDialog = _ => {
    ReactDOM.render(this.createDialog(), this._mountNode);
  }

  render() {
    const { children, ...props } = this.props;

    const newProps = {
      ...props,
      triggerDialog: this.handleInjectedFunc
    }

    return (
      <WrappedComponent {...newProps}>
        {children}
      </WrappedComponent>
    )
  }
}
