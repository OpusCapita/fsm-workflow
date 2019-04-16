/* eslint-disable max-len */
export const common = {
  editorTitle: 'Workflow-Editor',
  workflowName: {
    label: 'Name',
    placeholder: 'Der Name Ihres Schemas'
  },
  confirmation: {
    title: 'Bestätigung',
    message: 'Sie haben die Änderungen vorgenommen. Falls Sie den Editor schließen, gehen die Änderungen verloren.'
  }
}

export const states = {
  label: 'Status',
  name: {
    label: 'Name',
    placeholder: 'Geben Sie den Namen ein'
  },
  description: {
    label: 'Beschreibung',
    placeholder: 'Geben Sie die Statusbeschreibung ein'
  },
  initial: {
    label: 'Initial'
  },
  final: {
    label: 'Final'
  },
  noAvailableNamesLeft: 'Keine weiteren Namen verfügbar.',
  stateAlreadyExists: 'Dieser Status existiert bereits',
  deleteDialog: {
    message: {
      description: 'Der Status "{stateName}" wird im Vorgang verwendet. Sie haben die folgenden Optionen:',
      delete: 'Diesen Status und zugehörigen Vorgänge löschen',
      swap: 'Diesen Status "{stateName}" auf einen anderen Status ändern'
    },
    simpleMessage: 'Möchten Sie diesen Status wirklich löschen?'
  },
  editor: {
    title: {
      add: 'Einen neuen Status hinzufügen',
      edit: 'Neuen Status "{stateName}" bearbeiten'
    }
  },
  labelHint: 'Es wird als "{label}" in UI angezeigt',
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
  label: 'Vorgänge',
  event: {
    label: 'Event',
    placeholder: 'Geben Sie den Namen des Events ein'
  },
  from: {
    label: 'Von',
    placeholder: "Wählen Sie den Status 'von'"
  },
  to: {
    label: 'Bis',
    placeholder: "Wählen Sie den Status 'bis'"
  },
  editor: {
    title: {
      add: 'Neuen Vorgang hinzufügen',
      edit: 'Vorgang bearbeiten'
    }
  },
  deleteDialog: {
    message: 'Möchten Sie diesen Vorgang wirklich löschen?'
  },
  fromRequired: "Geben Sie den Status 'von' ein",
  toRequired: "Geben Sie den Status 'bis' ein"
}

export const guards = {
  label: 'Schutz',
  title: 'Die Schutze für die Vorgänge an "{event}" von "{from}" bis "{to}"',
  name: {
    label: 'Name'
  },
  parameters: {
    label: 'Parameter'
  },
  negate: {
    label: 'Negieren'
  },
  expressionTypeName: 'JavaScript Ausdruck',
  emptyList: 'Für diesen Vorgang wurde kein Schutz definiert.',
  addNewCallout: 'Neu hinzufügen!',
  deleteDialog: {
    message: 'Möchten Sie wirklich diesen Schutz entfernen?'
  },
  editor: {
    title: {
      edit: 'Schutz bearbeiten',
      add: 'Schutz hinzufügen'
    },
    wrongResultType: 'Die Funktion ergab einen Wert: "{value}" für den Typ "{type}", aber es wurde ein boolean Wert erwartet.',
    predefinedFunction: {
      label: 'Vorgegebene Funktion ',
      chooseCondition: 'Wählen Sie die Bedingung',
      negate: 'Negieren'
    },
    expression: {
      label: 'Ausdruck',
      placeholder: 'Geben Sie JavaScript-Code hier ein',
      results: 'Ergebnisse',
      autoplay: 'Autoplay',
      exampleObject: {
        label: 'Beispielobjekt',
        hint: 'Klicken Sie auf die Eigenschaft, um die Referenz in den JavaScript-Ausdruckeditor einzugeben.'
      }
    }
  }
}

export const automatic = {
  label: 'Automatisch',
  title: 'Automatische Schütze für die Vorgänge an "{event}" von "{from}" bis "{to}"',
  alwaysAutomatic: 'Immer automatisch',
  emptyList: 'Für diesen Vorgang wurde kein automatischer Schutz definiert.',
  addNewCallout: 'Neu hinzufügen!'
}

export const actions = {
  label: 'Aktionen',
  title: 'Aktionen für den Vorgang an "{event}" von "{from}" bis "{to}"',
  deleteDialog: {
    message: 'Möchten Sie wirklich diese Aktion entfernen?'
  },
  name: {
    label: 'Name'
  },
  parameters: {
    label: 'Parameter'
  },
  emptyList: 'Für diesen Vorgang wurde keine Aktion definiert.',
  addNewCallout: 'Neu hinzufügen!',
  editor: {
    title: 'Aktionsanruf',
    chooseAction: 'Wählen Sie die Aktion aus'
  }
}

export const buttons = {
  save: {
    label: 'Speichern'
  },
  download: {
    label: 'Herunterladen'
  },
  add: {
    label: 'Hinzufügen'
  },
  edit: {
    label: 'Bearbeiten'
  },
  delete: {
    label: 'Löschen'
  },
  ok: {
    label: 'Ok'
  },
  cancel: {
    label: 'Abbrechen'
  },
  close: {
    label: 'Schließen'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Geben Sie einen Wert ein'
  },
  integerInput: {
    inValid: 'Keine gültige Ganzzahl'
  },
  decimalInput: {
    inValid: 'Keine gültige Zahl'
  },
  enterValue: 'Geben Sie einen Wert ein',
  defineExpression: 'Definieren Sie einen Ausdruck',
  expression: 'Ausdruck',
  selectProperty: 'Wählen Sie die Eigenschaft von {businessObject}'
}

export const preview = {
  title: 'Schema',
  description: 'Das ist eine temporäre Lösung für FSM-Visualisierung.',
  meta: {
    regular: 'Knoten im regulären Status',
    initial: 'Knoten im initialen Status',
    final: 'Knoten im finalen Status'
  },
  nothingToVisualize: 'Es gibt nichts zu visualisieren'
}

export const select = {
  typeToSearch: `Geben Sie etwas ein, um zu suchen`,
  createOption: `Eine Option "{option}" anlegen`,
  clearValue: `Löschen`,
  clearAll: `Inhalt löschen`,
  nothingFound: `Keine Treffer gefunden`,
  loading: `Laden...`
}
/* eslint-enable max-len */
