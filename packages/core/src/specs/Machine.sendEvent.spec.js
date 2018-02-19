import assert from 'assert';

const { Promise } = global;
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

const convertObjectToReference = (object) => {
  return {
    businessObjId: 'tesla',
    businessObjType: 'car'
  }
};

let createMachine = ({ actions = {}, history, objectAlias } = {}) => {
  const objectConfiguration = {};
  if (objectAlias) {
    objectConfiguration['alias'] = objectAlias;
  }

  return new Machine(
    {
      machineDefinition: new MachineDefinition({
        schema: {
          initialState: 'started',
          objectConfiguration,
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
                  params: [
                    {
                      name: 'first',
                      value: 1
                    },
                    {
                      name: 'second',
                      value: '2'
                    }
                  ]
                }
              ]
            },
            {
              from: "first-stop",
              event: "doAsync",
              to: "second-stop",
              actions: [
                {
                  name: "doAsync0",
                  params: [
                    {
                      name: 'one',
                      value: 1
                    },
                    {
                      name: 'two',
                      value: 2
                    }
                  ]
                },
                {
                  name: "doAsync1",
                  params: [
                    {
                      name: 'three',
                      value: 3
                    },
                    {
                      name: 'four',
                      value: 4
                    }
                  ]
                }
              ]
            }
          ]
        },
        actions: actions || {}
      }),
      history,
      convertObjectToReference
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
    const sendEmailResult = 'awesomeEmail';
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
    }).then(({ object, actionExecutionResults }) => {
      assert.equal(object.status, 'second-stop');
      assert(actionExecutionResults);
      assert.equal(actionExecutionResults.length, 1);
      assert.equal(actionExecutionResults[0]['name'], 'sendEmail');
      assert.equal(actionExecutionResults[0]['result'], sendEmailResult);
    });
  });

  it('sends event that assumes ordered chain of async actions', () => {
    const actions = {
      'doAsync0': ({ one, two, object, from, to, event }) => {
        return new Promise((resolve, reject) => {
          return setTimeout(() => resolve(one + two, 50))
        });
      },
      'doAsync1': ({ three, four, object, from, to, event, actionExecutionResults }) => {
        if (actionExecutionResults.length === 0) {
          throw new Error("Invalid execution order");
        }
        return new Promise((resolve, reject) => {
          return setTimeout(() => resolve(three + four + actionExecutionResults[0].result, 10))
        });
      },
    };

    const machine = createMachine({ actions });
    const object = { status: 'first-stop' };

    return machine.sendEvent({
      object,
      event: "doAsync"
    }).then(({ object, actionExecutionResults }) => {
      assert.equal(object.status, 'second-stop');
      const [doAsync0Result, doAsync1Result] = actionExecutionResults;
      assert(doAsync0Result);
      assert(doAsync1Result);
      assert.equal(doAsync0Result.name, 'doAsync0');
      assert.equal(doAsync0Result.result, 3);

      assert.equal(doAsync1Result.name, 'doAsync1');
      assert.equal(doAsync1Result.result, 10);
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
    }).then(({ object, actionExecutionResults }) => {
      assert(actionExecutionResults);
      assert.equal(actionExecutionResults.length, 1);
      assert.equal(actionExecutionResults[0]['name'], 'sendEmail');
      assert.deepEqual(actionExecutionResults[0]['result'], expectedSendEventResults);
    });
  });

  it('creates correct history record', function() {
    let historyRecordUnderTest = null;
    const history = {
      add(passedData) {
        historyRecordUnderTest = passedData;
        return Promise.resolve(historyRecordUnderTest);
      }
    };
    const machine = createMachine({ history });
    const from = 'started';
    const object = {
      status: from
    };
    const user = 'johnny';
    const description = 'getoff!';
    const event = 'move'
    return machine.sendEvent({ object, event, user, description }).then(({ object }) => {
      assert.deepEqual(historyRecordUnderTest, {
        from: from,
        to: object.status,
        event: event,
        ...convertObjectToReference(object),
        workflowName: machine.machineDefinition.schema.name,
        user,
        description
      });
    });
  });
});
