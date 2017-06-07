/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class TransitionLineScope extends Component {
  constructor(props) {
    super(props);
    this.state = { coords: [40,20 , 60,20 , 60,220 , 80,220] };
  }

  onCoordsChange(coords) {
    this.setState({ coords });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

TransitionLineScope.contextTypes = {
  i18n: PropTypes.object
};
TransitionLineScope.childContextTypes = {
  i18n: PropTypes.object
};
