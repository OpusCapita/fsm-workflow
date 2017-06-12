[![CircleCI Status](https://circleci.com/gh/OpusCapita/fsm/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/OpusCapita/fsm)

## FSM workflow (for Node.js)

### Introduction
Workflow is based on Finite State Machine implemented in JS using promises.

- state is stored in the business object related to workflow, not in an extra workflow object. Multiple workflows could be defined for one business object, it means that for each workflow owns state field should be use
- one state per workflow execution (no parallelism)
- actions are executed in the transition, not in the node/state
- no event sending inside the workflow itself (in action)
- no variables in state workflow: all variables/data need to be stored in the business objects (e.g. invoice)
- events: visible/available in UI as action buttons for the user
- workflow definition stored as JSON
- guard support (transition/event availability is defined via condition/expression/function = guard)
- hierarchical states machines are not supported

#### Notes

The following things will be implemented later as extensions/helpers (separate sibling library) or in specific application:
- automatic transitions (done)
- task list is based on domain object (done)
- graphical editor (in process...)
- logging
- analysis

**P.S.** basic ideas on how FSM API looks like are taken from [fsm-as-promised](https://github.com/vstirbu/fsm-as-promised)

## How To Use

### Installation and Setup (in Node)

Run ```npm install @opuscapita/fsm-core``` to get uo and running. Then:

```javascript
import {MachineDefinition, Machine} from 'fsm-workflow';
```

## Machine definition

Machine definition consist of:
- [schema](#schema)
- [actions](#action)
- conditions: [guards](#guard-conditions) & [automatic](#automatic-conditions)

```javascript
const machineDefinition = new MachineDefinition({
  schema: {
    name: "invoice approval",               
    initialState: "open",                   
    finalStates: ["approved"],
    objectStateFieldName: "status",         
    transitions: [
      {
          from: "open",                    
          event: "approve",                 
          guards: [                       
            {                               
              "name": "validate",
              "arguments": {
                "argument1": "value1",
                "argument2": "value2"
              }
            }
          ],
          to: "approved",                   
          actions: [                       
            {                                
              "name": "archive",
              "arguments": {
                "argument1": "value1",
                "argument2": "value2"
              }
            }
          ],
          automatic: [                          
            {                                
                "name": "lastlyUpdatedMoreThan24hAgo",
                "arguments": {
                  "argument1": "value1",
                  "argument2": "value2"
                }
            }
          ]
      }
    ]
  },
  actions: {
    archive: function({argument1, argument1}) {}
  },
  conditions: {
    validate: function({argument1, argument1}) {},
    lastlyUpdatedMoreThan24hAgo: function({argument1, argument1}) {}
  }
});
```

### Schema

Defines machine transitions and initialization options

#### Transitions

In schema you needs to define an array of available machine transitions. Typically a transition is triggered by an _event_ and happens between _from_ and _to_ states. Optionally each transition can have _actions_, _guards_ and _automatic_ (defines conditions that if satisfied then event could be sent automatically).

#### Initial state

You can define the initial state by setting the _initialState_ property:

```javascript
var machineDefinition = new MachineDefinition({
  schema: {
    initial: 'start'
    transitions: [
      {from: 'start', event: 'run', to: 'finish'}
    ]
  }
});

const object = {status: 'none'};
const machine = new Machine(machineDefinition);
machine.start(object).then(({object}) => {
  console.log(machine.currentState({object}));
  // start  
});
```

if initial state is not specified, then 'none' will be used (TBD)

#### Final states

You can define the final states (one or many) by setting the _finalStates_ property:

```javascript
var machineDefinition = new MachineDefinition({
  schema: {
    initial: 'start',
    finalStates: ['finish'],
    transitions: [
      {from: 'start', event: 'run', to: 'finish'}
    ]
  }
});
```

### Code (Actions and Conditions(guards/automatic))

[Ideas & thoughts](actionsAndConditions.md)

#### Action

Actions (action = function) are executed during transition (not during existing or entering states). Action references specific function by name. Action implemented separately from schema. Each action accepts named arguments explicitly defined in transition and implicit arguments like _object_, _from_, _to_, etc. During transition machine executes each action in defined order. Each action gets _actionExecutionResutls_ argument which serves as an accumulator from perviously called actions, where each property is an action name and value is value returned by action.

#### Guard (conditions)

Guards are used to protect transitions. Guard works as 'if' condition. Technically guard is defined the same way like as action, it is a function. The difference is that it should always return boolean value (true or false).

Note: similar to [Spring State Machine Guards](http://docs.spring.io/spring-statemachine/docs/current/reference/htmlsingle/#configuring-guards)

#### Automatic (conditions)

Transition could be marked as automatic using corresponding property. It defines array of
conditions(functions, each return true or false). Check for whether object in current state has (at least one) automatic transition needs to be done by external task manager (inside the application). Basing on evaluated results task manager will be able to take a decision to send event without user interaction.


## Stateful object as a process

Machine does not have own state, all the transitions are performed over object which state is changed by machine. Object is used by Machine as a mutable parameter passed to guards and actions.

```javascript
var machineDefinition = new MachineDefinition({
  schema: {
    initial: 'start'
    finalStates: ['finish'],
    transitions: [
      {from: 'start', event: 'run', to: 'finish'}
    ]
  }
});

const object = {status: 'none'};
const machine = new Machine(machineDefinition);
machine.start(object).then(({object}) => {
  console.log(machine.currentState({object}));
  // start
  return machine.sendEvent({object, event: 'start'})
}).then(({object}) => {
  console.log(machine.currentState({object}));
  // finish
});
```

## Machine
### API

```javascript
var machineDefinition = new MachineDefinition({schema, guards, actions})
// register workflow
var machine = new Machine(machineDefinition, context);

// start/initialize machine/workflow
machine.start({object})

// returns a list of available transitions: {event, from, to, ..}, e.g. event
machine.availableTransitions({object})
// returns a list of available automatic transitions: {event, from, to, ..}, e.g. event
// if machine schema is adequate then there should be not more than 1 such transition
machine.availableAutomaticTransitions({})

// send 'event' and pass addition 'request' data that is posted by user/app
// returns promise, in case of successful transition then function will be called
// with one parameter that is an JSON with the following structure:
// - object - object in new state (the same reference that is passed as parameter)
machine.sendEvent({object, event, request})

machine.currentState({ object })     // gets current state
machine.is({ object, state})         // is object in state
machine.isFinal({ state })           // state is final or not
machine.can({ object, event })       // whether event is available
machine.cannot({ object, event })    // whether event is not available

// hooks (tbd)
machine.onStartTransition()   // returns promise
machine.onFinishTransition()  // returns promise
```

## Task/Work management

Task management is implemented s additional library. You can find more  detailed info more information [here](task-manager/README.md).

#### References

[Existing FSM libs review](existingFsmLibsReview.md)

## Contributors

| <img src="https://avatars.githubusercontent.com/u/24603787?v=3" width="100px;"/> | [**Alexey Sergeev**](https://github.com/asergeev-sc)     |
| :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/24652543?v=3" width="100px;"/> | [**Kirill Volkovich**](https://github.com/kvolkovich-sc) |
| <img src="https://avatars3.githubusercontent.com/u/24650360?v=3" width="100px;"/> | [**Daniel Zhitomirsky**](https://github.com/dzhitomirsky-sc) |

Contributing are welcome. We need YOU! :metal:
