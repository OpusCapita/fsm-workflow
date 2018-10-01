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

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);

    const { i18n } = this.context;

    this.defaultState = {
      title: i18n.getMessage('fsmWorkflowEditor.ui.common.confirmation.title'),
      message: i18n.getMessage('fsmWorkflowEditor.ui.common.confirmation.message'),
      BodyComponent: null
    }

    this.state = {
      show: false,
      confirmHandler: null,
      ...this.defaultState
    }
  }

  componentDidMount = _ => {
    this._mountNode = document.createElement('div'); // eslint-disable-line no-undef
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
    const { i18n } = this.context;
    const { textConfirm, textCancel } = this.props;
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
              {textConfirm || i18n.getMessage('fsmWorkflowEditor.ui.buttons.ok.label')}
            </Button>
            <Button
              onClick={this.handleClose}
            >
              {textCancel || i18n.getMessage('fsmWorkflowEditor.ui.buttons.cancel.label')}
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
  }) => event => {
    if (event.persist) {
      event.persist()
    }
    return showDialog() ?
      this.setState(_ => ({
        ...this.defaultState, // reset state to prevent previous call interfere the current one
        show: true,
        confirmHandler: _ => confirmHandler(event),
        ...(title && { title }),
        ...(message && { message }),
        ...(BodyComponent && { BodyComponent }),
      })) :
      confirmHandler(event);
  }

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
