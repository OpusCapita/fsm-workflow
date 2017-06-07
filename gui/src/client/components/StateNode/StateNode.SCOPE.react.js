/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';

@showroomScopeDecorator
export default
class StateNodeScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 20,
      y: 20
    };
  }

  handleDrag(e, draggableData) {
    this.setState({
      x: this.state.x + draggableData.deltaX,
      y: this.state.y + draggableData.deltaY
    });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

StateNodeScope.contextTypes = {
  i18n: PropTypes.object
};
StateNodeScope.childContextTypes = {
  i18n: PropTypes.object
};
