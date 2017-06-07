/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class TransitionInspectorScope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

TransitionInspectorScope.contextTypes = {
  i18n: PropTypes.object
};
TransitionInspectorScope.childContextTypes = {
  i18n: PropTypes.object
};
