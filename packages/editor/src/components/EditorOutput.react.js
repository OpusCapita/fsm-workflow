import React from 'react';
import PropTypes from 'prop-types';
import WorkflowGraph from './WorkflowGraph';

export default function EditorOutput({ schema, getStateLabel }, { i18n }) {
  return (
    <div>
      <h2>{i18n.getMessage('fsmWorkflowEditor.preview.title')}</h2>
      <p>{i18n.getMessage('fsmWorkflowEditor.preview.description')}</p>
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

EditorOutput.contextTypes = {
  i18n: PropTypes.object.isRequired
}
