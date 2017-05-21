import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

const createMachine = ({} = {}) => {
  return new Machine (
    {
      machineDefinition: new MachineDefinition({
        schema: {
          initialState: 'started',
          transitions: [
            {
              from: "started",
              event: "move",
              to: "first-stop"
            },
            {
              from: "first-stop",
              event: "move",
              to: "second-stop"
            }
          ]
        }
      })
    }
  );
}

describe('machine: simple transition: sendEvent', function() {
  it('send "move" event', function() {
    const machine = createMachine();
    // assume that machine was already started
    const object = {
      status: 'started'
    };

    // return machine.sendEvent({
    //   object,
    //   event: 'move'
    // }).then((objectInFirstStopState) => {
    //   assert(objectInFirstStopState.status, 'first-stop');
    //   machine.sendEvent({
    //     object:objectInFirstStopState,
    //     event: 'step-back'
    //   }).then(() => {
    //     assert.fail(null, null, "event/transition 'step-back' is not available from state 'first-stop'");
    //   }).catch(({object, from, event, message}) => {
    //     // object status is not changed
    //     assert(object.status, 'first-stop');
    //     assert(from, 'first-stop');
    //     assert(event, 'step-back');
    //     assert(message);
    //   });
    // });
  });
});
