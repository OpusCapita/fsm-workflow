import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

let createMachine = ({actions = {}} = {}) => {
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
              event: "move (action is not defined)",
              to: "second-stop",
              actions: [
                {
                  name: 'nonExistingAction'
                }
              ]
            },
            {
              from: "first-stop",
              event: "move (action is defined)",
              to: "second-stop",
              actions: [
                {
                  name: 'sendEmail',
                  arguments: {
                    first: 1,
                    second: '2'
                  }
                }
              ]
            }
          ]
        },
        actions: actions || {}
      })
    }
  );
}

describe('machine: sendEvent', function() {
  it('sends "move" event that moves object to the next state correctly', function() {
    const machine = createMachine();
    const object = {status: 'started'};

    return machine.sendEvent({
      object,
      event: 'move'
    }).then(({object}) => {
      assert.equal(object.status, 'first-stop');
    });
  });

  it('sends "step-back" event that does not exist', function() {
    const machine = createMachine();
    const object = {status: 'first-stop'};

    return machine.sendEvent({
      object,
      event: 'step-back'
    }).then(() => {
      assert.fail(null, null, "event/transition 'step-back' is not available from state 'first-stop'");
    }).catch(({object, from, event, message}) => {
      // object status is not changed
      assert.equal(object.status, 'first-stop');
      assert.equal(from, 'first-stop');
      assert.equal(event, 'step-back');
      assert(message);
    });
  });

  it ('sends "move (action is not defined)" that requires action execution, but action is not defined/implemented', () => {
    const machine = createMachine();
    const object = {status: 'first-stop'};

    return machine.sendEvent({
      object,
      event: "move (action is not defined)"
    }).then(() => {
      assert.fail(null, null, "event/transition 'move (action is not defined)' should fail as sepcified action(s) is not defined");
    }).catch(({object, from, event, message}) => {
      // console.log(message);
      assert(message);
    });

  });

  it ('sends "move (action is defined)" that requires predefined action execution', () => {
    const sendEmailResult = {};
    const actions = {
      'sendEmail': ({first, second, object, from, to, event}) => {
        return sendEmailResult;
      }
    };
    const machine = createMachine({actions});
    const object = {status: 'first-stop'};

    return machine.sendEvent({
      object,
      event: "move (action is defined)"
    }).then(({object, actionExecutionResutls}) => {
      assert.equal(object.status, 'second-stop');
      assert(actionExecutionResutls);
      assert.equal(actionExecutionResutls.length, 1);
      assert.equal(actionExecutionResutls[0]['name'], 'sendEmail');
      assert.equal(actionExecutionResutls[0]['result'], sendEmailResult);
    });
  });
});
