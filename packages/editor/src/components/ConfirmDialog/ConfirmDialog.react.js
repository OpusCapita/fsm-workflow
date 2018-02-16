import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

const returnTrue = _ => true;

// Higher order component ConfirmDialog injects `_triggerDialog` method into a wrapped component
export default WrappedComponent => class ConfirmDialog extends PureComponent {
  static propTypes = {
    textCancel: PropTypes.string,
    textConfirm: PropTypes.string,
  }

  static defaultProps = {
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
    if (this._mountNode) {
      ReactDOM.unmountComponentAtNode(this._mountNode);
    }
    this._mountNode = null;
  };

  handleClose = _ => this.setState({
    show: false,
    confirmHandler: null
  })

  handleConfirm = _ => {
    this.state.confirmHandler()
    this.handleClose();
  }

  createDialog = _ => {
    const {
      textConfirm,
      textCancel
    } = this.props;

    const { show, title, message, BodyComponent } = this.state;

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            BodyComponent ?
              <BodyComponent/> :
              message
          }
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

  triggerDialog = ({
    showDialog = returnTrue,
    confirmHandler,
    title,
    message,
    BodyComponent
  }) => event => showDialog() ?
    this.setState(_ => ({
      show: true,
      confirmHandler: _ => confirmHandler(event),
      ...(title && { title }),
      ...(message && { message }),
      ...(BodyComponent && { BodyComponent }),
    })) :
    confirmHandler(event);

  renderDialog = _ => {
    ReactDOM.render(this.createDialog(), this._mountNode);
  }

  render() {
    const { children, ...props } = this.props;

    WrappedComponent.prototype._triggerDialog = this.triggerDialog; // eslint-disable-line no-param-reassign

    return (
      <WrappedComponent {...props}>
        {children}
      </WrappedComponent>
    )
  }
}
