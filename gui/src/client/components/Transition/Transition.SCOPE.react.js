/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class TransitionScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: {},
      to: {}
    };
  }

  handleBezierChange(bezier) {
    console.log(bezier);
    this.setState({ bezier });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

TransitionScope.contextTypes = {
  i18n: PropTypes.object
};
TransitionScope.childContextTypes = {
  i18n: PropTypes.object
};
