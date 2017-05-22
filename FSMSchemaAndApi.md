
### FSM Schema

```
{
  name: 'invoice approval',             // workflow name
  initialState: 'new',                  // init state
  finalStates = ['payed', 'canceled'],  // final states
  objectStateFieldName = 'status',       // object field where state is stored
  transitions: [
    {
        from: 'new',                    // from state (required)
        event: 'match',                 // event (required)
        guards: [                       // list/array of guards
          {                               // guard is name of predefined function that returns true or false
            name: 'new-to-matched-guard'
            arguments: {
              argumentName1: ..someValue..
              argumentName2: ..someValue..
            }
        ],
        to: 'matched',                     // to state (required)
        actions: [                         // list/array of actions
          {                                // action is a name of predefined function
            name: 'new-to-matched-action'  // that executes the logic needed by this transition
            arguments: {
              argumentName1: ..someValue..
              argumentName2: ..someValue..
            }
          }
        ],
        auto: [                             // .. later
          {                                 // list of conditions, if each returns true then event
              name: 'automatic-condition'   // needs/could to be sent by application without user
              arguments: {
                argumentName1: ..someValue..
                argumentName2: ..someValue..
              }
          }
        ]
    },
    ...
  ]
}
```

FSM definition
- workflow schema // transitions, initialState, finalState, etc.
// todo describe more how action is declared (name, arguments), how its call
// is defined (explicit/implicit parameters)
- action
// todo describe more how action is declared (name, arguments), how its call
// is defined (explicit/implicit parameters)
- guards
// conditions that could be checked/called from outside the FSM to take a
// decision if transition should be executed automatically
// (defined in the same way as guards)
- auto

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
machine.sendEvent({event, object, request})

machine.currentState({object})     // gets current state
machine.is({state, object})        // is object in state
machine.isFinal({state})           // state is final or not
machine.can({state, object})       // whether event is available
machine.cannot({event, object})    // whether event is not available

// hooks
machine.onStartTransition()   // returns promise
machine.onFinishTransition()  // returns promise
