/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class SelectableTableScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
  }

  handleChange(itemKey) {
    this.setState({ selectedItem: itemKey });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

SelectableTableScope.contextTypes = {
  i18n: PropTypes.object
};
SelectableTableScope.childContextTypes = {
  i18n: PropTypes.object
};
