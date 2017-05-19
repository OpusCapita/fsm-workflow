import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

const createMachine = () => {
  return new Machine(
    {
      machineDefinition: new MachineDefinition(),
    }
  );
}

describe('current object state within the machine', function() {
  it('has corect value', function() {
    const state = 'new';
    const object = {
      [MachineDefinition.getDefaultObjectStateFieldName()]: state
    };
    assert.equal(createMachine().currentState({object}), state);
  });

});
