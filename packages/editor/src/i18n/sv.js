export const common = {
  editorTitle: 'Arbetsflödesredigerare',
  workflowName: {
    label: 'Namn',
    placeholder: 'Namn på ditt schema'
  },
  confirmation: {
    title: 'Bekräftelse',
    message: 'Du har gjort ändringar. Om du stänger redigeraren försvinner ändringarna.'
  }
}

export const states = {
  label: 'Tillstånd',
  name: {
    label: 'Namn',
    placeholder: 'Ange tillståndsnamn'
  },
  description: {
    label: 'Beskrivning',
    placeholder: 'Ange tillståndsbeskrivning'
  },
  initial: {
    label: 'Initial'
  },
  final: {
    label: 'Slutlig'
  },
  noAvailableNamesLeft: 'Det finns inga tillgängliga namn kvar.',
  stateAlreadyExists: 'Detta tillstånd existerar redan',
  deleteDialog: {
    message: {
      description: 'Tillståndet "{stateName}" används i övergångar. Alternativ för att fortsätta',
      delete: 'Ta bort detta tillstånd och berörda övergångar',
      swap: 'Byt tillståndet "{stateName}" mot ett annat'
    },
    simpleMessage: 'Vill du verkligen ta bort detta tillstånd?'
  },
  editor: {
    title: {
      add: 'Lägg till ett nytt tillstånd',
      edit: 'Redigera tillståndet "{stateName}"'
    }
  },
  labelHint: 'Kommer att visas i användargränssnittet som "{label}"',
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
  label: 'Övergångar',
  event: {
    label: 'Händelse',
    placeholder: 'Ange händelsenamn'
  },
  from: {
    label: 'Från',
    placeholder: 'Välj "från"-tillståndet'
  },
  to: {
    label: 'Till',
    placeholder: 'Välj "till"-tillståndet'
  },
  editor: {
    title: {
      add: 'Lägg till en ny övergång',
      edit: 'Redigera övergång'
    }
  },
  deleteDialog: {
    message: 'Vill du verkligen ta bort denna övergång?'
  },
  fromRequired: 'Specificera "från"-tillståndet',
  toRequired: 'Specificera "till"-tillståndet'
}

export const guards = {
  label: 'Bevakningar',
  title: 'Bevakningar för övergångar i "{event}" från "{from}" till "{to}"',
  name: {
    label: 'Namn'
  },
  parameters: {
    label: 'Parametrar'
  },
  negate: {
    label: 'Ogiltigförklara'
  },
  expressionTypeName: 'JavaScript-uttryck',
  emptyList: 'Det finns inga specificerade bevakningar för denna övergång.',
  addNewCallout: 'Lägg till ny!',
  deleteDialog: {
    message: 'Vill du ta bort denna bevakning?'
  },
  editor: {
    title: {
      edit: 'Redigera bevakning',
      add: 'Lägg till bevakning'
    },
    wrongResultType: 'Funktionen returnerad: "{value}" av typen "{type}", men förväntat booleskt värde.',
    predefinedFunction: {
      label: 'Fördefinierad funktion',
      chooseCondition: 'Välj villkor',
      negate: 'Ogiltigförklara'
    },
    expression: {
      label: 'Uttryck',
      placeholder: 'Ange JavaScript-kod här',
      results: 'Resultat',
      autoplay: 'Autoplay',
      exampleObject: {
        label: 'Exempelobjekt',
        hint: 'Klicka på en egenskap för att införa dess referens i redigeraren för JavaScript-uttryck.'
      }
    }
  }
}

export const automatic = {
  label: 'Automatisk',
  title: 'Automatiska bevakningar för övergång i "{event}" från "{from}" till "{to}"',
  alwaysAutomatic: 'Alltid automatisk',
  emptyList: 'Det finns inga automatiska bevakningar för denna övergång.',
  addNewCallout: 'Lägg till ny!'
}

export const actions = {
  label: 'Åtgärder',
  title: 'Åtgärder för övergångar i "{event}" från "{from}" till "{to}"',
  deleteDialog: {
    message: 'Vill du ta bort denna åtgärd?'
  },
  name: {
    label: 'Namn'
  },
  parameters: {
    label: 'Parametrar'
  },
  emptyList: 'Det finns inga specificerade åtgärder för denna övergång.',
  addNewCallout: 'Lägg till ny!',
  editor: {
    title: 'Åtgärdsanrop',
    chooseAction: 'Välj åtgärd'
  }
}

export const buttons = {
  save: {
    label: 'Spara'
  },
  download: {
    label: 'Hämta'
  },
  add: {
    label: 'Lägg till'
  },
  edit: {
    label: 'Redigera'
  },
  delete: {
    label: 'Ta bort'
  },
  ok: {
    label: 'OK'
  },
  cancel: {
    label: 'Avbryt'
  },
  close: {
    label: 'Stäng'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Ange värde'
  },
  integerInput: {
    inValid: 'Inte ett giltigt heltal'
  },
  decimalInput: {
    inValid: 'Inte ett giltigt nummer'
  },
  enterValue: 'Ange värde',
  defineExpression: 'Definiera uttryck',
  expression: 'Uttryck',
  selectProperty: 'Välj egenskap för {businessObject}'
}

export const preview = {
  title: 'Schema',
  description: 'Detta är en tillfällig lösning för FSM-visualisering.',
  meta: {
    regular: 'reguljära tillståndsnoder',
    initial: 'initiala tillståndsnoder',
    final: 'slutliga tillståndsnoder'
  },
  nothingToVisualize: 'Inget att visualisera'
}

export const select = {
  typeToSearch: `Skriv för att söka`,
  createOption: `Skapa alternativet "{option}"`,
  clearValue: `Rensa värde`,
  clearAll: `Rensa allt`,
  nothingFound: `Inga resultat hittades`,
  loading: `Läser in…`
}
