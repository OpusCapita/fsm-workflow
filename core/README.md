# FSM core

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-core.svg) 
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-core.svg)

Machine and its definition.

## How To Use

### Install package

Run ```npm install @opuscapita/fsm-workflow-core``` to get up and running.

### Use in code

```javascript
import { MachineDefinition, Machine } from '@opuscapita/fsm-workflow-core';
```

## Machine definition

Machine definition consist of:
- [schema](#schema)
- [actions](#action)
- conditions [guards](#guard-conditions) &amp; [automatic](#automatic-conditions)

### Example

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
                },
                "negate": true
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

Defines machine transitions and initialization options. Could be presented as oriented graph, where each node represents state and directed edges are used to represent transition from one state to another.

#### Transitions

In schema you needs to define an array of available machine transitions. Typically a transition is triggered by an _event_ and happens between _from_ and _to_ states. Optionally each transition can have _actions_, _guards_ and/or _automatic_ (conditions).

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

Guards are used to protect transitions. Guard works as 'if' condition. Technically guard is defined the same way like as action, it is a function. The difference is that it should always return boolean value (true or false). Condition(function) result could be inverted if its property _negate_ is set to true.

Note: similar to [Spring State Machine Guards](http://docs.spring.io/spring-statemachine/docs/current/reference/htmlsingle/#configuring-guards)

#### Automatic (conditions)

Transition could be marked as automatic using corresponding property. It could be:
- true (boolean value) - e.g. this transition is always automatic
- array of conditions(functions, each return true or false), condition(function) result could be inverted if its property _negate_ is set to true

Check for whether object in current state has (at least one) automatic transition could be done via **[task manager](../task-manager)** (inside the application). Basing on evaluated results task manager will be able to take a decision to send event without user interaction.


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

// returns a list of available transitions: {event, from, to, request..}, e.g. event
// request is used to pass parameters to guards for some dynamic calculation, e.g. when event availability depends 
// on current user information as roles and etc. 
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
machine.isInFinalState({ object })   // returns true iff object is in one of final states
machine.can({ object, event })       // whether event is available
machine.cannot({ object, event })    // whether event is not available

// hooks (tbd)
machine.onStartTransition()   // returns promise
machine.onFinishTransition()  // returns promise
```
