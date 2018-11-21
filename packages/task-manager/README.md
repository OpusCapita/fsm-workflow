# FSM Task Manager

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-task-manager.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-task-manager.svg)

FSM Task(Work) Manager is an extension to finite state machine. It manages
existing tasks (stateful objects, e.g. invoice) within the lifecycle
specified in Finite State Machine definition.

## Usage

### Machine(workflow) definition

An example could be found [here](../core#example)

### Task(process) Manager

```javascript
const machine = new Machine({
  machineDefinition: new MachineDefinition({schema,actions,conditions}),
  context
});

const taskManager = new TaskManager({
  machine: machine,
  search: search,
  update: update
});

//function that return promise that is resolved with task list
function search(searchParams) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{status: ''}, {status: ''}]);
    }, 500)
  })
};

//function that return promise that is resolved after object saving
function update(object) {
 return new Promise((resolve, reject) => {
  //some hard-working persistent saving code
  resolve();
 })
};
```

## Starting the process

After configuration there is only one thing left behind - to start task list monitoring.

```javascript
taskManager.run({ timeout: 1000 });
```

_timeout_ argument indicates the frequency of calling _search_ action and checking for
available automatic event / sending events (in case found auto-transitions);

## Stopping the process

If the time has come to kill the process, you have to do the next:

```javascript
taskManager.stop();
```
This method return true/false in case of correct/incorrect process finish, correspondingly.

## Getting ongoing/stopped process statistic

Sometime you may need to get the process statistic (currently available values are: machine name,
start & end timestamps)

```javascript
taskManager.processCache
```

This field is an object with next signature:

```javascript
{<timer_descriptor> : {
  <name>,
  <started>,
  <finished>
}}
```

TBD: increase process cache notation usability
TBD: add 1 by 1 event sending queue

## Sending event to object with TaskManager

You might need an ability to send event to an object with further saving.
If you configured TaskManager properly and it knows how to save objects, next two code snippets do the same:

```javascript
//passed as constructor arg to TaskManager
const update = (object) => {
  <some async object update code>
  return Promise
};
machine.sendEvent({object, event, request}).then(({object}) => {
  return update(object);
})

//----equals---

taskManager.sendEvent({object, event, request})
```

## Starting workflow with TaskManager

Also you might want to start the workflow with further object saving.
If you configured TaskManager properly and it knows how to save objects, next two code snippets do the same:

```javascript
//passed as constructor arg to TaskManager
const update = (object) => {
  <some async object update code>
  return Promise
};
machine.start({object}).then(({object}) => {
  return update(object);
})

//----equals---

taskManager.start({object})
```
