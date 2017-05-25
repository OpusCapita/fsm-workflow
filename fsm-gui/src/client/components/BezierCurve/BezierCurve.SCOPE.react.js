/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class BezierCurveScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bezier: [100,25 , 10,90 , 110,100 , 150,195]
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

BezierCurveScope.contextTypes = {
  i18n: PropTypes.object
};
BezierCurveScope.childContextTypes = {
  i18n: PropTypes.object
};
