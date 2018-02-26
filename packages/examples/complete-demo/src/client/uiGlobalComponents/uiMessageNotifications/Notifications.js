import React from 'react';
import ReactDOM from 'react-dom';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './styles.css';

const isDef = /* istanbul ignore next */ param => param !== undefined && param !== null;

const types = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
}

const defaultTimeout = 3000;

/* istanbul ignore next */
class Notifications {
  constructor() {
    this.renderContainer()
  }

  renderContainer = _ => {
    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    ReactDOM.render(<NotificationContainer/>, this.container)
  }

  destroy = _ => {
    if (ReactDOM.findDOMNode(this.container)) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
  }

  create = ({ id, type, timeOut = defaultTimeout, message }) => NotificationManager.create({
    id: isDef(id) ? id : type,
    type,
    timeOut,
    message
  })

  remove = ({ id }) => NotificationManager.remove({ id })

  success = args => this.create({ ...args, type: types.SUCCESS })

  info = args => this.create({ ...args, type: types.INFO })

  warning = args => this.create({ ...args, type: types.WARNING })

  error = args => this.create({ ...args, type: types.ERROR })
}

export default new Notifications();
