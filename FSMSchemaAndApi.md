
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

FSM.read
- workflow schema
- action
- guards
- ... later "conditions for automatic execution(event sending)"

var machineDefinition = new MachineDefinition({schema, guards, actions})
// register workflow
var machine = new Machine(machineDefinition, context);

// both 'start' and 'sendEvent' return Promise e.g. async execution
machine.start({object})                 // start/initialize workflow
machine.sendEvent({object, event, data}) // send event
machine.availableEvents({object})            // list of available events
machine.currentState({object})           // current state

machine.is({state, object})              // is object in state
machine.isFinal({state})                 // state is final or not
machine.can({state, object})             // whether event is available
machine.cannot({event, object})          // whether event is not available
...
