import assert from 'assert';
import Machine from '../Machine';

// maybe it worth to write integration test
describe('machine: availableAutomaticTransitions', function() {
  it('arguments are correctly pased to machineDefinition.findAvailableTransitions', function() {
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
            schema: {
              objectConfig: {
                objectStateFieldName: 'status'
              }
            },
            findAvailableTransitions: (passedArgument) => {
              assert(passedArgument)
              assert.equal(passedArgument.object, object);
              assert.equal(passedArgument.context, context);
              assert.equal(passedArgument.isAutomatic, true);
            }
          },
          context: context
        }
      );
    }

    const machine = createMachine({ context });

    return machine.availableAutomaticTransitions({ object });
  });
});
