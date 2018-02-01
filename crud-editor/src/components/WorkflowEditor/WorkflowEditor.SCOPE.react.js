import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
class WorkflowEditorScope extends Component {
  sendMailFunctionBody = `console.log('Hellooooooo')`

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
