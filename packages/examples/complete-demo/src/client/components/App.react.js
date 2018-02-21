import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nManager } from '@opuscapita/i18n';
import Menu from './Menu.react';
import HomePage from './HomePage.react';
import Editor from './Editor.react';

export default class App extends PureComponent {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);

    this.state = {
      currentPage: 0
    }

    this.i18n = new I18nManager();
  }

  getChildContext() {
    return {
      i18n: this.i18n
    }
  }

  handleNavigate = page => _ => this.setState({ currentPage: page })

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        <Menu
          currentPage={currentPage}
          onNavigate={this.handleNavigate}
        />
        {
          currentPage === 0 ?
            <HomePage /> :
            currentPage === 1 ?
              <Editor /> :
              null
        }
      </div>
    )
  }
}
