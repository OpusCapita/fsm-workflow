## FSM Workflow (for Node.js)

[![CircleCI Status](https://circleci.com/gh/OpusCapita/fsm-workflow/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/OpusCapita/fsm-workflow)
![badge-license](https://img.shields.io/github/license/OpusCapita/fsm-workflow.svg)

### Introduction
[Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) workflow is implemented in JS using [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)-s.

- state is stored in the business object related to workflow(machine), not in an extra
workflow generic object. Multiple workflows could be defined for one business object,
it means that for each workflow own state field should be used
- one state per workflow execution (no parallelism)
- actions are executed in the transition, not in the node/state
- no event sending inside the workflow itself (in action)
- no variables in state workflow: all variables/data need to be stored in
the business objects
- events: visible/available in UI as action buttons for the user
- workflow definition stored as JSON
- guard support (transition/event availability is defined via
condition/expression/function = guard)
- hierarchical states are not supported

#### Notes

The following things will be implemented later as extensions/helpers (separate sibling library) or in specific application:
- automatic transitions
- task list is based on domain object
- graphical editor
- logging
- analysis

**P.S.** basic ideas on how FSM API looks like are taken from [fsm-as-promised](https://github.com/vstirbu/fsm-as-promised)

### FSM (Core)

FSM core could be found here [here](packages/core/README.md)

### Task/Work Management

Task management is implemented as additional library. You can find more detailed info [here](packages/task-manager/README.md).

### Workflow Transition History

Workflow Transition History is implemented as separate library. You can find more information [here](packages/history/README.md).

### FAQ for developers
**How do I set a version for all packages?**
Define it as `version` value in `lerna.json` file. There's no need to rewrite version in packages, release process will handle it itself. 

### References

[Existing FSM libs review](existingFsmLibsReview.md)

### Contributors

| <img src="https://avatars.githubusercontent.com/u/24603787?v=3" width="100px;"/> | [**Alexey Sergeev**](https://github.com/asergeev-sc)     |
| :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/24652543?v=3" width="100px;"/> | [**Kirill Volkovich**](https://github.com/kvolkovich-sc) |
| <img src="https://avatars3.githubusercontent.com/u/24650360?v=3" width="100px;"/> | [**Daniel Zhitomirsky**](https://github.com/dzhitomirsky-sc) |

Contributing are welcome. We need YOU! :metal:
