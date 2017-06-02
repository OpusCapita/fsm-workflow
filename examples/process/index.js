const Machine = require('../../fsm-library').Machine;
const MachineDefinition = require('../../fsm-library').MachineDefinition;
const TaskManager = require('../../fsm-library').TaskManager;

let data = [
  { id: 1, status: '', assignee: '' },
  { id: 2, status: '', assignee: '' },
  { id: 3, status: '', assignee: '' },
  { id: 4, status: '', assignee: '' },
  { id: 5, status: '', assignee: '' },
];

const search = (searchParams) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000)
  })
};

const update = (object) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data[data.findIndex((element) => {
        return element.id === object.id
      })] = object;
      resolve();
    }, 1000)
  });
};


let processMachine = new Machine({
  machineDefinition: new MachineDefinition({
    schema: require('./www/workflow/process-schema.json'),
    actions: require('./www/workflow/actions').default,
    guards: require('./www/workflow/guards').default
  })
});

let taskManager = new TaskManager({ machine: processMachine, search, update });



setTimeout(() => {
  console.log(data[0]);
  processMachine.sendEvent({object: data[0], event: "register"}).then(({object}) => {
    processMachine.sendEvent({object, event: "toAutoBranch"});
  })
}, 6000);



