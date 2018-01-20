import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
class SchemaEditorScope extends Component {
  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
