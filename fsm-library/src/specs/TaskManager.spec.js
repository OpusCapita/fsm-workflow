import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';
import TaskManager from '../TaskManager';

describe('Task manager:', function() {
  const machine = new Machine({machineDefinition: new MachineDefinition({
    schema: {
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
          "auto": []
        }
      ]
    }
  })});

  const taskManager = new TaskManager({machine});

  it('automatic execution', function(done) {
    const object = {
      [MachineDefinition.getDefaultObjectStateFieldName()]: ''
    };

    taskManager.monitor({object});
    machine.start({object}).then((result) => {
      setTimeout(() => {
        assert.equal(machine.isFinal({state: machine.currentState({object})}), true);
        done();
      }, 1500);
    });
  });
});
