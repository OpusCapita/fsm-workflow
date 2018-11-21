import assert from 'assert';
import Machine from '../Machine';

// maybe it worth to write integration test
describe('machine: availableTransitions', function() {
  it('arguments are correctly pased to machineDefinition.getAvailableStates', function() {
    // create object
    const object = {
      status: 'none'
    };

    // context
    const context = {
      sendEmail: () => {}
    };

    const createMachine = ({ context = {} }) => {
      return new Machine(
        {
          machineDefinition: {
            schema: {},
            findAvailableTransitions: (passsedArgument) => {
              assert(passsedArgument)
              assert.equal(passsedArgument.object, object);
              assert.equal(passsedArgument.context, context);
            },
            objectConfiguration: {
              stateFieldName: 'status'
            }
          },
          context: context
        }
      );
    }

    const machine = createMachine({ context });

    return machine.availableTransitions({ object });
  });
});
