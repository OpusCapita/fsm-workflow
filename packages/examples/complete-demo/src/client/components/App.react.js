import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { I18nManager } from '@opuscapita/i18n';
import { uiMessageNotifications } from '../uiGlobalComponents';
import Menu from './Menu.react';
import HomePage from './HomePage.react';
import Editor from './Editor.react';
import WorkflowHistory from './History.react';
import { notificationSuccess, notificationError } from '../constants';
import { baseUrl } from '../utils';
import './styles.css';

export default class App extends PureComponent {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired,
    uiMessageNotifications: PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);
    this.i18n = new I18nManager();
  }

  getChildContext() {
    return {
      i18n: this.i18n,
      uiMessageNotifications
    }
  }

  componentWillUnmount() {
    uiMessageNotifications.remove({ id: notificationSuccess })
    uiMessageNotifications.remove({ id: notificationError })
  }

  render() {
    const MyMenu = withRouter(Menu);

    return (
      <Router basename={baseUrl}>
        <div>
          <MyMenu/>
          <Route exact={true} path='/' component={HomePage}/>
          <Route exact={true} path='/editor' component={Editor}/>
          <Route path='/invoice/:objectId' component={WorkflowHistory}/>
        </div>
      </Router>
    )
  }
}
