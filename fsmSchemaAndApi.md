### Machine Schema

```
{
  "name": "invoice approval",                // workflow name
  "initialState": "open",                   // init state
  "finalStates": ["authorized", "canceled"],  // final states
  "objectStateFieldName": "status",           // object field where state is stored
  "transitions": [
    {
        "from": "new",                    // from state (required)
        "event": "match",                 // event (required)
        "guards": [                       // list/array of guards
          {                               // guard is name of predefined function that returns true or false
            "name": "new-to-matched-guard"
            "arguments": {
              "argument1": ..someValue..
              "argument2": ..someValue..
            }
          }
        ],
        "to": "matched",                     // to state (required)
        "actions": [                         // list/array of actions
          {                                  // action is a name of predefined function
            "name": "new-to-matched-action"  // that executes the logic needed by this transition
            "arguments": {
              "argument1": ..someValue..
              "argument2": ..someValue..
            }
          }
        ],
        "auto": [                            // .. later
          {                                  // list of conditions, if each returns true then event
              "name": "automatic-condition"  // needs/could to be sent by application without user
              "arguments": {
                "argument1": ..someValue..
                "argument2": ..someValue..
              }
          }
        ]
    },
    ...
  ]
}
```

### Machine definition

<dl>
  <dt>schema</dt>
  <dd>transitions, initialState, finalState, etc.</dd>

  <dt>actions</dt>
  <dd>predefined named actions, <i>todo</i> describe more how action is declared (name, arguments), how its call is defined (explicit/implicit parameters)
  </dd>

  <dt>guards</dt>
  <dd>conditions that could be checked/called from outside the FSM to take a decision if transition should be executed automatically, <i>todo</i> describe/define in detail</dd>

  <dt>autos</dt>
  <dd>conditions specified in schema that gives possibility to application (external task manager) possibility to determine whether event shoud/could be sent automatically, <i>todo</i> describe/define in detail</dd>
</dl>


### FSM API

```
var machineDefinition = new MachineDefinition({schema, guards, actions})
// register workflow
var machine = new Machine(machineDefinition, context);

// both 'start' and 'sendEvent' return Promise e.g. async execution

// start/initialize workflow
machine.start({object})

// list of available events: {event, auto}, e.g. event
// and auto(matic) functions for checking if event should/could be sent automatically
machine.availableTransitions({object})

// send event
// returns promise
// in case of successful transition then function will be called with one parameters
// that is an JSON with the following structure:
// - object - object in new state (the same reference that is passed as parameter)
machine.sendEvent({object, event, request})

machine.currentState({ object })     // gets current state
machine.is({ object, state})        // is object in state
machine.isFinal({ state })           // state is final or not
machine.can({ object, event })       // whether event is available
machine.cannot({ object, event })    // whether event is not available

// hooks
machine.onStartTransition()   // returns promise
machine.onFinishTransition()  // returns promise
```
