import assert from 'assert';
import Workflow from '../Workflow';
import WorkflowDefinition from '../WorkflowDefinition';

const createWorkflow = ({initialState} = {}) => {
  return new Workflow(
    {
      workflowDefinitionProvider: {
        definitions: {
          'testworkflow': new WorkflowDefinition()
        }
      },
      name: 'testworkflow'
    }
  );
}

describe('start workflow', function() {
  it('sets correctly new state', function() {
    const state = 'new';
    const object = {
      [WorkflowDefinition.getDefaultObjectStateFieldName()]: state
    };
    assert.equal(createWorkflow().currentState({object}), state);
  });

});
