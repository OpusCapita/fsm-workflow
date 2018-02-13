import React from 'react';
import PropTypes from 'prop-types';
// import { Tabs, Tab } from 'react-bootstrap';
import WorkflowGraph from './WorkflowGraph';
// import CodeEditor from './CodeEditor';

export default function EditorOutput({
  availableTransitions,
  schema,
  getStateLabel,
  createJsonOutput,
  selectedStates,
  selectedTransitions,
  onStatesSelect,
  onTransitionsSelect
}) {
  // const jsonSchema = JSON.stringify(createJsonOutput(), null, 2);

  return (
    <div>
      <div className="oc-fsm-crud-editor--workflow-editor__tab">
        <WorkflowGraph
          availableTransitions={availableTransitions}
          schema={schema}
          selectedStates={selectedStates}
          selectedTransitions={selectedTransitions}
          getStateLabel={getStateLabel}
          onStatesSelect={onStatesSelect}
          onTransitionsSelect={onTransitionsSelect}
        />
      </div>
      {/* <Tabs
        animation={false}
        id="fsm-workflow-editor-output"
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab eventKey={1} title={(<h4>Graph</h4>)}>
          <div className="oc-fsm-crud-editor--workflow-editor__tab">
            <WorkflowGraph schema={schema} getStateLabel={getStateLabel}/>
          </div>
        </Tab>
        <Tab eventKey={2} title={(<h4>JSON</h4>)}>
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
      </Tabs> */}
    </div>
  );
}

EditorOutput.propTypes = {
  availableTransitions: PropTypes.arrayOf(PropTypes.object),
  schema: PropTypes.object.isRequired,
  selectedStates: PropTypes.arrayOf(PropTypes.string),
  selectedTransitions: PropTypes.arrayOf(PropTypes.object),
  getStateLabel: PropTypes.func.isRequired,
  createJsonOutput: PropTypes.func.isRequired,
  onStatesSelect: PropTypes.func,
  onTransitionsSelect: PropTypes.func
};

EditorOutput.defaultProps = {
  availableTransitions: [],
  selectedStates: [],
  selectedTransitions: [],
  onStatesSelect: () => {},
  onTransitionsSelect: () => {}
};
