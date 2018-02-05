import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
class WorkflowEditorScope extends Component {
  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  constructor(...args) {
    super(...args);

    this.i18n = new I18nManager();
  }

  getChildContext() {
    return { i18n: this.i18n }
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
