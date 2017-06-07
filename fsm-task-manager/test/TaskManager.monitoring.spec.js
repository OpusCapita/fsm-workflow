import assert from 'assert';
import Machine from '../../fsm-library/src/Machine';
import MachineDefinition from '../../fsm-library/src/MachineDefinition';
import TaskManager from '../src/TaskManager';

describe('Task manager:monitoring', function() {
  const machine = new Machine({
    machineDefinition: new MachineDefinition({
      schema: {
        "name": "test",
        "initialState": "init",
        "finalStates": [
          "finished"
        ],
        "objectStateFieldName": "status",
        "transitions": [
          {
            "from": "init",
            "event": "autoFinish",
            "to": "finished",
            "isAutomatic": true
          }
        ]
      }
    })
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
      assert.equal(machine.isFinal({ state: machine.currentState({ object }) }), true);
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
