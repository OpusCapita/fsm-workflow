import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import WorkflowGraph from './WorkflowGraph';
import CodeEditor from './CodeEditor';

export default function EditorOutput({ schema, getStateLabel }) {
  const jsonSchema = JSON.stringify(schema, null, 2);

  return (
    <div>
      <h2>Schema</h2>
      <Tabs
        animation={false}
        id="fsm-workflow-editor-output"
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab eventKey={1} title="Graph">
          <div className="oc-fsm-crud-editor--workflow-editor__tab">
            <WorkflowGraph schema={schema} getStateLabel={getStateLabel}/>
          </div>
        </Tab>
        <Tab eventKey={2} title="JSON">
          <div className="oc-fsm-crud-editor--workflow-editor__tab">
            <CodeEditor
              value={jsonSchema}
              options={{
                theme: "eclipse",
                lineWrapping: true,
                lineNumbers: true,
                readOnly: "nocursor",
                mode: {
                  name: 'javascript',
                  json: true
                }
              }}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

EditorOutput.propTypes = {
  schema: PropTypes.object.isRequired,
  getStateLabel: PropTypes.func.isRequired
}
