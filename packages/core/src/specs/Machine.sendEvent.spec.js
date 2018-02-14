import assert from 'assert';
import bluebird from 'bluebird';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

let createMachine = ({ actions = {}, history, objectAlias } = {}) => {
  return new Machine(
    {
      machineDefinition: new MachineDefinition({
        schema: {
          initialState: 'started',
          objectConfiguration: objectAlias && { alias: objectAlias },
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
      }),
      history
    }
  );
}

describe('machine: sendEvent', function() {
  it('sends "move" event that moves object to the next state correctly', function() {
    const machine = createMachine();
    const object = { status: 'started' };

    return machine.sendEvent({
      object,
      event: 'move'
    }).then(({ object }) => {
      assert.equal(object.status, 'first-stop');
    });
  });

  it('sends "step-back" event that does not exist', function() {
    const machine = createMachine();
    const object = { status: 'first-stop' };

    return machine.sendEvent({
      object,
      event: 'step-back'
    }).then(() => {
      assert.fail(null, null, "event/transition 'step-back' is not available from state 'first-stop'");
    }).catch(({ object, from, event, message }) => {
      // object status is not changed
      assert.equal(object.status, 'first-stop');
      assert.equal(from, 'first-stop');
      assert.equal(event, 'step-back');
      assert(message);
    });
  });

  // eslint-disable-next-line max-len
  it('sends "move (action is not defined)" that requires action execution, but action is not defined/implemented', () => {
    const machine = createMachine();
    const object = { status: 'first-stop' };

    return machine.sendEvent({
      object,
      event: "move (action is not defined)"
    }).then(() => {
      // eslint-disable-next-line max-len
      assert.fail(null, null, "event/transition 'move (action is not defined)' should fail as sepcified action(s) is not defined");
    }).catch(({ object, from, event, message }) => {
      // console.log(message);
      assert(message);
    });
  });

  it('sends "move (action is defined)" that requires predefined action execution', () => {
    const sendEmailResult = {};
    const actions = {
      'sendEmail': ({ first, second, object, from, to, event }) => {
        return sendEmailResult;
      }
    };
    const machine = createMachine({ actions });
    const object = { status: 'first-stop' };

    return machine.sendEvent({
      object,
      event: "move (action is defined)"
    }).then(({ object, actionExecutionResutls }) => {
      assert.equal(object.status, 'second-stop');
      assert(actionExecutionResutls);
      assert.equal(actionExecutionResutls.length, 1);
      assert.equal(actionExecutionResutls[0]['name'], 'sendEmail');
      assert.equal(actionExecutionResutls[0]['result'], sendEmailResult);
    });
  });

  it('action has access to configured object alias', function() {
    const objectAlias = "car";
    const actions = {
      'sendEmail': (params) => {
        return { [objectAlias]: params[objectAlias] };
      }
    };
    const machine = createMachine({ actions, objectAlias });
    const object = { status: 'first-stop' };
    const expectedSendEventResults = { "car": object };

    return machine.sendEvent({
      object,
      event: "move (action is defined)"
    }).then(({ object, actionExecutionResutls }) => {
      assert(actionExecutionResutls);
      assert.equal(actionExecutionResutls.length, 1);
      assert.equal(actionExecutionResutls[0]['name'], 'sendEmail');
      assert.deepEqual(actionExecutionResutls[0]['result'], expectedSendEventResults);
    });
  });

  it('creates correct history record', function() {
    let historyRecordUnderTest = null;
    const history = {
      add(passedData) {
        historyRecordUnderTest = passedData;
        return bluebird.Promise.resolve(historyRecordUnderTest);
      }
    };
    const machine = createMachine({ history });
    const from = 'started';
    const object = {
      status: from,
      businessObjId: 'tesla',
      businessObjType: 'car',
    };
    const user = 'johnny';
    const description = 'getoff!';
    const event = 'move'
    return machine.sendEvent({ object, event, user, description }).then(({ object }) => {
      assert.deepEqual(historyRecordUnderTest, {
        from: from,
        to: object.status,
        event: event,
        businessObjId: object.businessObjId,
        businessObjType: object.businessObjType,
        workflowName: machine.machineDefinition.schema.name,
        user,
        description
      });
    });
  });
});
