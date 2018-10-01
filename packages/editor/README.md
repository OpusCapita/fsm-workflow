# Usage

[Editor demo (showroom)](https://opuscapita.github.io/fsm-workflow/branches/master/editor/?currentComponentName=WorkflowEditor&maxContainerWidth=100%25) - see example schema in props

[Actions & conditions paramsSchema definition and usage](https://github.com/OpusCapita/fsm-workflow/blob/master/packages/editor/src/components/Actions/Readme.md)

## i18n

UI labels for `states`, `conditions`, `actions` and `params` can be translated.

To add translations `register` an object of the following structure within [i18nManager](https://github.com/OpusCapita/i18n) in context of your app:

```
de: { // locale
    fsmWorkflowEditor: {
      actions: { // here you define translations for actions
        testAction: { // action name like in workflow.actions
          label: 'Test Action', // this text is a UI label for this action
          params: {
            nickname: { // param name in this action's schema
              label: 'Nickname' // UI label for this param
            },
            fullName: {
              label: 'Full Name'
            }
          }
        },
        sendMail: {
          label: 'Send Email',
          params: {
            fromAddress: {
              label: "Sender' address"
            }
          }
        },
        ...
      },
      conditions: { // like in workflow.conditions
        userHasRoles: {
          label: 'User Has Roles',
          params: {
            restrictedRoles: {
              label: 'Only these roles are allowed'
            }
          }
        },
        ...
      },
      states: {
        approved: {
          label: 'Approved'
        },
        inspectionRequired: {
          label: "Inspection Required"
        },
        ...
      }
    }
  },
fi: {
  ...same structure
}
```

Plain objects are also ok:

```
de: {
  'fsmWorkflowEditor.states.approved.label': 'Approved',
  'fsmWorkflowEditor.actions.testAction.label': 'Test action',
  'fsmWorkflowEditor.actions.testAction.params.nickname.label': 'Nickname',
  ...
}
```