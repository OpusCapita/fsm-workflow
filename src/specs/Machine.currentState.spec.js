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

describe('machine: currentState', function() {
  it('has returns correct value', function() {
    const state = 'new';
    const object = {
      [MachineDefinition.getDefaultObjectStateFieldName()]: state
    };
    assert.equal(createMachine().currentState({object}), state);
  });

});
