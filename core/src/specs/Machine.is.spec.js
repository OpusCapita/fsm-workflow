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

describe('machine: is', function() {
  it('returns correct value', function() {
    const state = 'new';
    const object = {
      [MachineDefinition.getDefaultObjectStateFieldName()]: state
    };
    assert.equal(createMachine().is({ object, state }), true);
    assert.equal(createMachine().is({ object, state: 'incorrect' }), false);
  });
});
