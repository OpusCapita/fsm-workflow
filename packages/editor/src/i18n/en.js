const common = {
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

const states = {
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
  confirmation: {
    message: {
      description: 'State "{stateName}" is used in transitions. Options to proceed:',
      delete: 'Delete this state and involved transitions',
      swap: 'Swap state "{stateName}" with a different one:'
    }
  }
}

const transitions = {
  label: 'Transitions'
}

const buttons = {
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
  }
}

const errors = {
  stateAlreadyExists: 'This state already exists'
}

export default {
  fsmWorkflowEditor: {
    common,
    buttons,
    states,
    transitions,
    errors
  }
}
