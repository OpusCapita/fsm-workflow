import React from 'react';
import PropTypes from 'prop-types';
import WorkflowGraph from './WorkflowGraph';

export default function EditorOutput({ schema, getStateLabel, createJsonOutput }) {
  return (
    <div>
      <h2>Schema</h2>
      <p>This is a temporary solution for FSM visualization.</p>
      <div className="oc-fsm-crud-editor--workflow-editor__tab">
        <WorkflowGraph schema={schema} getStateLabel={getStateLabel}/>
      </div>
    </div>
  )
}

EditorOutput.propTypes = {
  schema: PropTypes.object.isRequired,
  getStateLabel: PropTypes.func.isRequired,
  createJsonOutput: PropTypes.func.isRequired
}
