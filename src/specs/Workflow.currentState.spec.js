import assert from 'assert';
import Workflow from '../Workflow';
import WorkflowDefinition from '../WorkflowDefinition';

const createWorkflow = () => {
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

describe('current object state within the workflow', function() {
  it('has corect value', function() {
    const state = 'new';
    const object = {
      [WorkflowDefinition.getDefaultObjectStateFieldName()]: state
    };
    assert.equal(createWorkflow().currentState({object}), state);
  });

});
