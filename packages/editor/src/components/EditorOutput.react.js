import React from 'react';
import PropTypes from 'prop-types';
import WorkflowGraph from './WorkflowGraph';

export default function EditorOutput({ schema }, { i18n }) {
  return (
    <div>
      <h2>{i18n.getMessage('fsmWorkflowEditor.ui.preview.title')}</h2>
      <p>{i18n.getMessage('fsmWorkflowEditor.ui.preview.description')}</p>
      <div className="oc-fsm-crud-editor--workflow-editor__tab">
        <WorkflowGraph schema={schema}/>
      </div>
    </div>
  )
}

EditorOutput.propTypes = {
  schema: PropTypes.object.isRequired,
  createJsonOutput: PropTypes.func.isRequired
}

EditorOutput.contextTypes = {
  i18n: PropTypes.object.isRequired
}
