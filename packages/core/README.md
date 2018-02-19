# FSM core

![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/fsm-workflow-core.svg)
![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/fsm-workflow-core.svg)

Machine and its definition.

## How To Use

### Install package

Run `npm install @opuscapita/fsm-workflow-core` to get up and running.

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
    objectConfiguration: {
      stateFieldName: "status",
      alias: "invoice",
      example: {
        "invoiceNo": "1111",
        "customerId": "wefwefewfew",
        "supplierId": "33333",
        "netAmount": 1000,
        "status": "reviewRequired"
      },
      schema: {
        {
          title: "Invoice",
          type: "object",
          properties: {
            invoiceNo: {
              type: "string"
            },
            customerId: {
              type: "string"
            },
            supplierId: {
              type: "string"
            },
            netAmount: {
              type: "number"
            },
            status: {
              type: "string"
            }
          },
          required: ["invoiceNo"]
        }
      }
    },
    states: [
      { name: "open", description: "Open" },
      { name: "approved", description: "Approved" }
    ],
    transitions: [
      {
          from: "open",
          event: "approve",
          guards: [
            {
              "name": "validate",
              "params": [
                {
                  "name": "param1",
                  "value": "value1"
                },
                {
                  "name": "param2",
                  "value": "value2"
                }
              ]
            }
          ],
          to: "approved",
          actions: [
            {
              "name": "archive",
              "params": [
                {
                  "name": "param1",
                  "value": "value1"
                },
                {
                  "name": "param2",
                  "value": "value2"
                }
              ]
            }
          ],
          automatic: [
            {
                "name": "lastlyUpdatedMoreThan24hAgo",
                "params": [
                  {
                    "name": "param1",
                    "value": "value1"
                  },
                  {
                    "name": "param2",
                    "value": "value2"
                  }
                ],
                "negate": true
            }
          ]
      }
    ]
  },
  actions: {
    archive: function({ param1, param2 }) {}
  },
  conditions: {
    validate: function({ param1, param2 }) {},
    lastlyUpdatedMoreThan24hAgo: function({ param1, param2 }) {}
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
    name: 'sprint'
    initialState: 'start'
    transitions: [
      { from: 'start', event: 'run', to: 'finish' }
    ]
  }
});

const machine = new Machine({ machineDefinition });
machine.start({ object }).then(({ status: 'none' }) => {
  console.log(machine.currentState({ object }));
  // start
});
```

if initial state is not specified, then 'none' will be used (TBD)

#### Final states

You can define the final states (one or many) by setting the _finalStates_ property:

```javascript
var machineDefinition = new MachineDefinition({
  schema: {
    initialState: 'start',
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

Actions (action = function) are executed during transition (not while leaving/entering state). Action references specific function by name. Action implemented separately from schema. Each action accepts named arguments explicitly defined in transition and implicit arguments like _object_, _from_, _to_, etc. During transition machine executes each action in defined order. Each action gets _actionExecutionResults_ argument which serves as an accumulator from perviously called actions, where each property is an action name and value is value returned by action.

#### Guard (conditions)

Guards are used to protect transitions. Guard works as 'if' condition. 
Technically guard is defined the same way like as action, it is a function. 
The difference is that it should always return boolean value (true or false). 
Condition(function) result could be inverted if its property _negate_ is set to true.

Guards could be also _sync_ and _async_ functions. In case you want to implement async guard, pay additional attention
to the value resolved by a guard - it should be **only** boolean value. In case your guard rejects some value 
(error or smth else) - it will be taken as an error and _findAvailableTransitions_ will be rejected with error. 

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
    initialState: 'start'
    finalStates: ['finish'],
    transitions: [
      { from: 'start', event: 'run', to: 'finish' }
    ]
  }
});

const object = { status: 'none' };
const machine = new Machine(machineDefinition);
machine.start({ object }).then(({ object }) => {
  console.log(machine.currentState({ object }));
  // start
  return machine.sendEvent({ object, event: 'start' })
}).then(({ object }) => {
  console.log(machine.currentState({ object }));
  // finish
});
```

## Object Workflow History

Machine configuration
```
var machine = new Machine({ history, ... });
```
**history** is a DAO that provides a possibility to create and read object workflow history records. You can find its API (and DB specific implementation) [here](https://github.com/OpusCapita/fsm-workflow/tree/master/history).

Machine writes history records for all object transitions within the workflow.
It happens when you start workflow
```
machine.start({ object, user, description })
```
or you send an event
```
machine.sendEvent({ object, event, user, description })
```
In both cases, new history records are created.
Here
- **object** (required) - business object of the following structure
- **user** (required) - user identifier who initiated an event
- **description** (optional) - custom text that describes transition/object
All this info together is stored in workflow history.
Note: In case of **start** method call history fields **from** and **event** are filled with string value **NULL** (4 upper cases letters: N, U, L, L)

Machine provides possibility to get(search) history records via **getHistory** method:

Getting/searching specific workflow history. You can either search by:
- specific **object** history
- initiated by specific **user**
- additionally, you can restrict query using **finishedBy** to get history within a specific period of time.
```javascript
machine.getHistory(searchParameters, paging, sorting)
```
where
  - **searchParameters**
  ```javascript
  {
    object,
    user,                    // example: 'john.miller'
    finishedOn: {
      gte,                   // example: Date("2018-03-05T21:00:00.000Z")
      gt,                    // (syntax like 'today', 'yesterday', 'week ago' could be introduced later, if required)
      lt,
      lte
    }
  }
  ```
  - **paging**:
  ```javascript
  {
    max,                      // example: '25', default value: 100
    offset                    // example: '50', default value: 0
  }
  ```
  - **sorting**:
  ```javascript
  {
   by,                        // example: 'user', default value: 'finishedOn',
                              // possible values: ['event', 'from', 'to', 'user', 'description', 'finishedOn']
   order                      // example: 'asc', default value: 'desc'
  }
  ```
  as a result you get a promise that results into array of objects of the following structure:
  ```javascript
  {
    event,
    from,
    to,
    object: {
      businessObjectId,
      businessObjectType     
    },
    user,
    description,
    finishedOn
  }
  ```

**Note:** while writing workflow object history or searching history records by
object machine uses configured **convertObjectToReference** callback to convert
real business object into reference object that has the following structure
**{businessObjType, businessObjId}**

## Machine
### API

```javascript
var machineDefinition = new MachineDefinition({ schema, conditions, actions })
// register workflow
var machine = new Machine(machineDefinition, context);

// start/initialize machine/workflow
machine.start({ object })

// returns a list of available transitions: {event, from, to, request..}, e.g. event
// request is used to pass parameters to guards for some dynamic calculation, e.g. when event availability depends
// on current user information as roles and etc.
machine.availableTransitions({ object })
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
