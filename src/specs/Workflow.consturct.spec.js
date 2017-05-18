import assert from 'assert';
import Workflow from '../workflow';
import WorkflowDefinition from '../WorkflowDefinition';

const createWorkflowCorrectly = ({promise} = {}) => {
  return new Workflow(
    {
      workflowDefinitionProvider: {
        definitions: {
          'testworkflow': new WorkflowDefinition()
        }
      },
      name: 'testworkflow',
      promise: promise
    }
  );
}

describe('constructing worklow', function() {
  it('should throw Error as workflowDefinitionProvider is not defined', function() {
    assert.throws(() => {new Workflow()}, Error);
  });

  it('should throw Error as workflow name is not defined', function() {
    assert.throws(() => {new Workflow({workflowDefinitionProvider: {}});}, Error);
  });

  it('should throw Error as workflow definition is not found', function() {
    assert.throws(() => {
      new Workflow(
        {
          workflowDefinitionProvider: {
            definitions: {
            }
          },
          name: 'testworkflow'
        },
        Error
      );
    });
  });

  it('should not throw Error as Worklfow should be correctly created', function() {
    assert.doesNotThrow(createWorkflowCorrectly);
  });

  it('check default workflow promise', function() {
    const w = createWorkflowCorrectly();
    assert.equal(w.promise, Workflow.defaultPromise());
  });

  it('check passed workflow promise', function() {
    const promise = 'MegaPromise';
    const w = createWorkflowCorrectly({promise});
    assert.equal(w.promise, promise);
  });
});
