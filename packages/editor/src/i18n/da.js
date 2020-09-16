export const common = {
  editorTitle: 'Workflow-editor',
  workflowName: {
    label: 'Navn',
    placeholder: 'Navn på dit skema'
  },
  confirmation: {
    title: 'Bekræftelse',
    message: 'Du har foretaget ændringer. Hvis du lukker editoren, mister du ændringerne.'
  }
}

export const states = {
  label: 'Status',
  name: {
    label: 'Navn',
    placeholder: 'Indtast navn på status'
  },
  description: {
    label: 'Beskrivelse',
    placeholder: 'Indtast beskrivelse for status'
  },
  initial: {
    label: 'Første'
  },
  final: {
    label: 'Endelige'
  },
  noAvailableNamesLeft: 'Ingen tilgængelige navne tilbage.',
  stateAlreadyExists: 'Denne status eksisterer i forvejen',
  deleteDialog: {
    message: {
      description: 'Status "{stateName}" bruges i overgange. Muligheder for at fortsætte:',
      delete: 'Slet denne status og involverede overgange',
      swap: 'Udskift status "{stateName}" med en anden:'
    },
    simpleMessage: 'Vil du virkelig slette denne status?'
  },
  editor: {
    title: {
      add: 'Tilføj ny status',
      edit: 'Redigér status "{stateName}"'
    }
  },
  labelHint: 'Vises på UI som "{label}"',
  releaseGuards: {
    table: {
      to: {
        label: 'Til'
      },
      title: 'Ophæv afgrænsning for status "{stateName}"'
    }
  }
}

export const transitions = {
  label: 'Overgange',
  event: {
    label: 'Hændelse',
    placeholder: 'Indtast navn på hændelse'
  },
  from: {
    label: 'Fra',
    placeholder: "Select 'from' state"
  },
  to: {
    label: 'Til',
    placeholder: "Select 'to' state"
  },
  editor: {
    title: {
      add: 'Tilføj ny overgang',
      edit: 'Redigér overgang'
    }
  },
  deleteDialog: {
    message: 'Vil du virkelig slette denne overgang?'
  },
  fromRequired: "Specify 'from' state",
  toRequired: "Specify 'to' state"
}

export const guards = {
  label: 'Afgrænsninger',
  title: 'Afgrænsninger for overgang på "{event}" fra "{from}" til "{to}"',
  name: {
    label: 'Navn'
  },
  parameters: {
    label: 'Parametre'
  },
  negate: {
    label: 'Eliminér'
  },
  expressionTypeName: 'JavaScript Expression',
  emptyList: 'Ingen afgrænsninger angivet for denne overgang.',
  addNewCallout: 'Tilføj ny!',
  deleteDialog: {
    message: 'Vil du virkelig fjerne denne afgrænsning?'
  },
  editor: {
    title: {
      edit: 'Redigér afgrænsning',
      add: 'Tilføj afgrænsning'
    },
    wrongResultType: 'Funktion returneret: "{value}" for type "{type}", men forventede en boolesk værdi.',
    predefinedFunction: {
      label: 'Foruddefineret funktion',
      chooseCondition: 'Vælg tilstand',
      negate: 'Eliminér'
    },
    expression: {
      label: 'Udtryk',
      placeholder: 'Indtast JavaScript-kode her',
      results: 'Resultater',
      autoplay: 'Autoplay',
      exampleObject: {
        label: 'Eksempel på objekt',
        hint: 'Klik på en egenskab for at indsætte dens reference i JavaScript Expression-editor.'
      }
    }
  }
}

export const automatic = {
  label: 'Automatisk',
  title: 'Automatiske afgrænsninger for overgang på "{event}" fra "{from}" til "{to}"',
  alwaysAutomatic: 'Altid automatisk',
  emptyList: 'Ingen automatiske afgrænsninger angivet for denne overgang.',
  addNewCallout: 'Tilføj ny!'
}

export const actions = {
  label: 'Handlinger',
  title: 'Handlinger for overgang på "{event}" fra "{from}" til "{to}"',
  deleteDialog: {
    message: 'Vil du virkelig fjerne denne handling?'
  },
  name: {
    label: 'Navn'
  },
  parameters: {
    label: 'Parametre'
  },
  emptyList: 'Ingen handlinger angivet for denne overgang.',
  addNewCallout: 'Tilføj ny!',
  editor: {
    title: 'Handlingspåkaldelse',
    chooseAction: 'Vælg handling'
  }
}

export const buttons = {
  save: {
    label: 'Gem'
  },
  download: {
    label: 'Download'
  },
  add: {
    label: 'Tilføj'
  },
  edit: {
    label: 'Redigér'
  },
  delete: {
    label: 'Slet'
  },
  ok: {
    label: 'OK'
  },
  cancel: {
    label: 'Annullér'
  },
  close: {
    label: 'Luk'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Indtast værdi'
  },
  integerInput: {
    inValid: 'Ikke et gyldigt heltal'
  },
  decimalInput: {
    inValid: 'Ikke et gyldigt tal'
  },
  enterValue: 'Indtast værdi',
  defineExpression: 'Definér udtryk',
  expression: 'Udtryk',
  selectProperty: 'Vælg egenskab for {businessObject}'
}

export const preview = {
  title: 'Skema',
  description: 'Dette er en midlertid løsning for FSM-visualisering.',
  meta: {
    regular: 'knuder for almindelig status',
    initial: 'knuder for første status',
    final: 'knuder for endelig status'
  },
  nothingToVisualize: 'Intet af visualisere'
}

export const select = {
  typeToSearch: 'Skriv for at søge',
  createOption: 'Opret valgmulighed "{option}"',
  clearValue: 'Slet værdi',
  clearAll: 'Slet alt',
  nothingFound: 'Der blev ikke fundet nogen resultater',
  loading: 'Henter…'
}
