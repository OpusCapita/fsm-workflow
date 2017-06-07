/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';
import BezierTransition from '../BezierTransition';

const viewportChildren = [
  (
    <BezierTransition
      key="Transition_0"
      input="Transition_0"
      isHighlighted={true}
      isSnap={false}
      bezier={[100,25 , 10,90 , 110,100 , 150,195]}
      isShowBezierHelpers={true}
      arrowPosition={2}
      onBezierChange={() => {}}
    />
  )
];

@showroomScopeDecorator
export default
class ViewportScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewportChildren,
      scale: 1,
      panOffsetX: 0,
      panOffsetY: 0
    };
  }

  handleWheel(e) {
    let scale = this.state.scale - e.deltaY / 500;

    if(scale < 0) {
      scale = 0.1;
    }

    this.setState({ scale });
  }

  handlePan(e, draggableData) {
    let panOffsetX = this.state.panOffsetX + draggableData.deltaX / this.state.scale;
    let panOffsetY = this.state.panOffsetY + draggableData.deltaY / this.state.scale;
    this.setState({ panOffsetX, panOffsetY });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

ViewportScope.contextTypes = {
  i18n: PropTypes.object
};
ViewportScope.childContextTypes = {
  i18n: PropTypes.object
};
