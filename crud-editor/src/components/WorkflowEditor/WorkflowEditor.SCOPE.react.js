import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
class WorkflowEditorScope extends Component {
  sendMailFunctionBody = `return \`
Successfully sent a message\n
from "\${fromAddress}"\n
with body:\n
"\${greeting}, you have a new invoice #\${object.invoiceNo}\u00A0
from customer \${object.customerId} to supplier \${object.supplierId}\u00A0
with gross amount of \${object.grossAmount} \${object.currencyId}."\``

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
