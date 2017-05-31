
const Machine = require('../../fsm-library').Machine;
const MachineDefinition = require('../../fsm-library').MachineDefinition;
const TaskManager = require('../../fsm-library').TaskManager;
let businessObject = {status: ''};

let processMachine = new Machine({machineDefinition: new MachineDefinition({
  schema: require('./process-schema.json'),
  actions: require('./actions').default,
  guards: require('./guards').default
})});

let taskManager = new TaskManager({machine: processMachine});
taskManager.monitor({object: businessObject});

processMachine.start({object: businessObject}).then((result) => {
  processMachine.sendEvent({
    object: result.object,
    event: "toStateA"
  }).catch((err) => (
    console.log(err))
  );
});
