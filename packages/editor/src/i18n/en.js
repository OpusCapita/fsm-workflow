export const common = {
  editorTitle: 'Workflow Editor',
  workflowName: {
    label: 'Name',
    placeholder: 'Name of your schema'
  },
  confirmation: {
    title: 'Confirmation',
    message: 'You have made changes. Closing this editor will lose these changes.'
  }
}

export const states = {
  label: 'States',
  name: {
    label: 'Name',
    placeholder: 'Enter state name'
  },
  description: {
    label: 'Description',
    placeholder: 'Enter state description'
  },
  initial: {
    label: 'Initial'
  },
  final: {
    label: 'Final'
  },
  noAvailableNamesLeft: 'No available names left.',
  stateAlreadyExists: 'This state already exists',
  deleteDialog: {
    message: {
      description: 'State "{stateName}" is used in transitions. Options to proceed:',
      delete: 'Delete this state and involved transitions',
      swap: 'Swap state "{stateName}" with a different one:'
    },
    simpleMessage: 'Do you really want to delete this state?'
  },
  editor: {
    title: {
      add: 'Add new state',
      edit: 'Edit state "{stateName}"'
    }
  },
  labelHint: 'Will appear on UI as "{label}"',
  releaseGuards: {
    table: {
      to: {
        label: 'To'
      },
      title: 'Release guards for state "{stateName}"'
    }
  }
}

export const transitions = {
  label: 'Transitions',
  event: {
    label: 'Event',
    placeholder: 'Enter event name'
  },
  from: {
    label: 'From',
    placeholder: "Select 'from' state"
  },
  to: {
    label: 'To',
    placeholder: "Select 'to' state"
  },
  editor: {
    title: {
      add: 'Add new transition',
      edit: 'Edit transition'
    }
  },
  deleteDialog: {
    message: 'Do you really want to delete this transition?'
  },
  fromRequired: "Specify 'from' state",
  toRequired: "Specify 'to' state"
}

export const guards = {
  label: 'Guards',
  title: 'Guards for transition on "{event}" from "{from}" to "{to}"',
  name: {
    label: 'Name'
  },
  parameters: {
    label: 'Parameters'
  },
  negate: {
    label: 'Negate'
  },
  expressionTypeName: 'JavaScript Expression',
  emptyList: 'No guards specified for this transition.',
  addNewCallout: 'Add new!',
  deleteDialog: {
    message: 'Do you really want to remove this guard?'
  },
  editor: {
    title: {
      edit: 'Edit guard',
      add: 'Add guard'
    },
    wrongResultType: 'Function returned: "{value}" of type "{type}", but expected a boolean value.',
    predefinedFunction: {
      label: 'Predefined function',
      chooseCondition: 'Choose condition',
      negate: 'Negate'
    },
    expression: {
      label: 'Expression',
      placeholder: 'Enter JavaScript code here',
      results: 'Results',
      autoplay: 'Autoplay',
      exampleObject: {
        label: 'Example object',
        hint: 'Click on a property to insert its reference into JavaScript Expression editor.'
      }
    }
  }
}

export const automatic = {
  label: 'Automatic',
  title: 'Automatic guards for transition on "{event}" from "{from}" to "{to}"',
  alwaysAutomatic: 'Always automatic',
  emptyList: 'No automatic guards specified for this transition.',
  addNewCallout: 'Add new!'
}

export const actions = {
  label: 'Actions',
  title: 'Actions for transition on "{event}" from "{from}" to "{to}"',
  deleteDialog: {
    message: 'Do you really want to remove this action?'
  },
  name: {
    label: 'Name'
  },
  parameters: {
    label: 'Parameters'
  },
  emptyList: 'No actions specified for this transition.',
  addNewCallout: 'Add new!',
  editor: {
    title: 'Action invocation',
    chooseAction: 'Choose action'
  }
}

export const buttons = {
  save: {
    label: 'Save'
  },
  download: {
    label: 'Download'
  },
  add: {
    label: 'Add'
  },
  edit: {
    label: 'Edit'
  },
  delete: {
    label: 'Delete'
  },
  ok: {
    label: 'Ok'
  },
  cancel: {
    label: 'Cancel'
  },
  close: {
    label: 'Close'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Enter value'
  },
  integerInput: {
    inValid: 'Not a valid integer'
  },
  decimalInput: {
    inValid: 'Not a valid number'
  },
  enterValue: 'Enter value',
  defineExpression: 'Define expression',
  expression: 'Expression',
  selectProperty: 'Select property of {businessObject}'
}

export const preview = {
  title: 'Schema',
  description: 'This is a temporary solution for FSM visualization.',
  meta: {
    regular: 'regular state nodes',
    initial: 'initial state nodes',
    final: 'final state nodes'
  },
  nothingToVisualize: 'Nothing to visualize'
}

export const select = {
  typeToSearch: `Type to search`,
  createOption: `Create option "{option}"`,
  clearValue: `Clear value`,
  clearAll: `Clear all`,
  nothingFound: `No results found`,
  loading: `Loading…`
}
