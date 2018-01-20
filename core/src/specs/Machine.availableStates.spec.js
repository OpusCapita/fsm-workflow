import assert from 'assert';
import Machine from '../Machine';

describe('machine: availableStates', function() {
  it('arguments are correctly pased to machineDefinition.findAvailableTransitions', function() {
    let getAvailableStatesIsCalled = false;

    const createMachine = () => {
      return new Machine(
        {
          machineDefinition: {
            getAvailableStates: () => {
              getAvailableStatesIsCalled = true;
            }
          }
        }
      );
    }

    createMachine().availableStates();

    assert.equal(getAvailableStatesIsCalled, true);
  });
});
