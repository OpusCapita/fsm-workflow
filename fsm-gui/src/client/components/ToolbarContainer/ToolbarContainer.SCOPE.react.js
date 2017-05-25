/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';
import { Provider } from 'react-redux';

@showroomScopeDecorator
export default
class ToolbarContainerScope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={window.__FSM_REDUX_STORE__} key="provider">
        <div>
          {this._renderChildren()}
        </div>
      </Provider>
    );
  }
}

ToolbarContainerScope.contextTypes = {
  i18n: PropTypes.object
};
ToolbarContainerScope.childContextTypes = {
  i18n: PropTypes.object
};
