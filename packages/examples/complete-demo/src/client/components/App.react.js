import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18nManager } from '@opuscapita/i18n';
import { Menu } from '@opuscapita/react-navigation';
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
          appName="Workflow Demo Application"
          className="oc-menu--opuscapita-dark-theme"
          logoSrc='https://develop.businessnetwork.opuscapita.com/invoice/static/img/oc-logo-white.svg'
          logoHref="http://opuscapita.com"
          labelText="powered by "
          labelLinkText="OpusCapita"
          showSearch={false}
          activeItem={currentPage}
          navigationItems={[
            { children: 'Business Objects', onClick: this.handleNavigate(0) },
            { children: 'Worflow Editor', onClick: this.handleNavigate(1) },
            { children: 'Github', href: 'https://github.com/OpusCapita/fsm-workflow', target: '_blank' }
          ]}
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
