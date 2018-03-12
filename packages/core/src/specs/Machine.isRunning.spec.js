import assert from 'assert';
import Machine from '../Machine';

describe('machine: isRunning', function() {
  it('returns correct values', function() {
    const machine = new Machine(
      {
        machineDefinition: {
          getAvailableStates: () => ['started', 'finished'],
          schema: {
            finalStates: ['finished']
          },
          objectConfiguration: {
            stateFieldName: 'status'
          }
        }
      }
    );

    // object in undeclared state
    let object = { status: 'none' };
    assert.equal(machine.isRunning({ object }), false);

    // object in non final state
    object = { status: 'started' };
    assert.equal(machine.isRunning({ object }), true);

    // object in final state
    object = { status: 'finished' };
    assert.equal(machine.isRunning({ object }), false);
  });
});
