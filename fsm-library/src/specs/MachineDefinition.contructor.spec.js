import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: constructor', function() {
  it('uses correct default object state field name if not specified', function() {
    assert.equal(new MachineDefinition().schema.objectStateFieldName,
      MachineDefinition.getDefaultObjectStateFieldName());
  });
});
