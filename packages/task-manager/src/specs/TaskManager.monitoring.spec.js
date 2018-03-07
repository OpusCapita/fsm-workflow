import assert from 'assert';
import { Machine, MachineDefinition } from '@opuscapita/fsm-workflow-core';
import TaskManager from '../TaskManager';

describe('Task manager:monitoring', function() {
  const machine = new Machine({
    machineDefinition: new MachineDefinition({
      objectConfiguration: {
        "stateFieldName": "status"
      },
      schema: {
        "name": "test",
        "initialState": "init",
        "finalStates": [
          "finished"
        ],
        "transitions": [
          {
            "from": "init",
            "event": "autoFinish",
            "to": "finished",
            "automatic": true
          }
        ]
      }
    }),
    convertObjectToReference: (o) => {
      return {
        // ...we don't need it here
      }
    }
  });

  let object = {};

  beforeEach(() => {
    object[MachineDefinition.getDefaultObjectStateFieldName()] = '';
  });

  const search = ({ searchParams }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => (resolve([object])), 100);
    })
  };

  const update = (newValue) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        object = { ...newValue };
        resolve();
      }, 100);
    })
  };


  it('automatic execution & monitoring test', (done) => {
    const tm = new TaskManager({ machine, search, update });
    tm.run();

    setTimeout(() => {
      assert.equal(machine.isInFinalState({ object }), true);
      tm.stop();
      done();
    }, 1500);
  });


  it('task list obtaining', (done) => {
    const tm = new TaskManager({ machine, search, update });
    tm.list({ searchParams: { param1: 1, param2: 'string value' } }).then((tasks) => {
      assert.equal(tasks.length, 1);
      assert.equal(tasks[0].status, '');
      done();
    })
  });

  it('test stop & getting the statistics', (done) => {
    const tm = new TaskManager({ machine, search, update });
    tm.run(200);

    setTimeout(() => {
      assert.equal(tm.stop(), true);
      let processExecutionInfo = Array.from(tm.processCache.values())[0];
      assert.equal(processExecutionInfo.name, machine.machineDefinition.schema.name);
      assert.equal(
        processExecutionInfo.started.getTime() < processExecutionInfo.finished.getTime(),
        true
      );

      done();
    }, 1000);
  })
});
