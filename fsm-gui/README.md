## fsm-workflow
FSM workflow (for Node.js)

### Introduction
Workflow is based on Finite State Machine

- state is stored in the business object related to workflow, not in an extra
workflow object. Multiple workflows could be defined for one business object,
it means that for each workflow owns state field should be use
- one state per workflow execution (no parallelism)
- action is executed in the transition, not in the node/state
- no event sending inside the workflow itself (in action)
- no variables in state workflow: all variables/data need to be stored in
the business objects (e.g. invoice)
- events: visible/available in UI as action buttons for the user
- workflow definition stored as JSON
- guard support (transition/event availability is defined via
condition/expression/function = guard)

#### Notes
- task list is based on domain object (could be done externally with the
help of FSM by accessing available events)

### Later

- graphical editor
- logging
- analysis
- automatic (times) transitions

#### https://github.com/vstirbu/fsm-as-promised
Heavy influenced by https://github.com/jakesgordon/javascript-state-machine

Based on Promise-s.

Improvements/extensions:
- function/callback argument is one object that has named properties 'name' (event), 'from', 'to', 'args' (passed when firing event)
- more callbacks: onleave, onenter, onentered - specific states/event agnostic

looks good, a lot of tests
