/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class BezierTransitionScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bezier: [100,25 , 10,90 , 110,100 , 150,195]
    };
  }

  handleBezierChange(bezier) {
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

BezierTransitionScope.contextTypes = {
  i18n: PropTypes.object
};
BezierTransitionScope.childContextTypes = {
  i18n: PropTypes.object
};
