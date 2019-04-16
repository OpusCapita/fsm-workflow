export const common = {
  editorTitle: 'Redigeringsprogram for arbeidsflyt',
  workflowName: {
    label: 'Navn',
    placeholder: 'Navn på skjema'
  },
  confirmation: {
    title: 'Bekreftelse',
    message: 'Du har foretatt endringer. Hvis du lukker dette redigeringsprogrammet går endringene tapt.'
  }
}

export const states = {
  label: 'Tilstander',
  name: {
    label: 'Navn',
    placeholder: 'Angi tilstandsnavn'
  },
  description: {
    label: 'Beskrivelse',
    placeholder: 'Angi tilstandsbeskrivelse'
  },
  initial: {
    label: 'Innledende'
  },
  final: {
    label: 'Endelig'
  },
  noAvailableNamesLeft: 'Ingen tilgjengelige navn igjen.',
  stateAlreadyExists: 'Denne tilstanden eksisterer allerede',
  deleteDialog: {
    message: {
      description: 'Tilstanden "{stateName}" brukes i overganger. Alternativer for å fortsette',
      delete: 'Slett denne tilstanden og involverte overganger',
      swap: 'Bytt tilstand "{stateName}" med en annen'
    },
    simpleMessage: 'Vil du slette denne tilstanden?'
  },
  editor: {
    title: {
      add: 'Legg til ny tilstand',
      edit: 'Rediger tilstand "{stateName}"'
    }
  },
  labelHint: 'Vises på brukergrensesnittet som "{label}"',
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
  label: 'Overganger',
  event: {
    label: 'Hendelse',
    placeholder: 'Angi hendelsesnavn'
  },
  from: {
    label: 'Fra',
    placeholder: 'Velg "fra" tilstand'
  },
  to: {
    label: 'Til',
    placeholder: 'Velg "til" tilstand'
  },
  editor: {
    title: {
      add: 'Legg til ny overgang',
      edit: 'Rediger overgang'
    }
  },
  deleteDialog: {
    message: 'Vil du slette denne overgangen?'
  },
  fromRequired: 'Spesifiser "fra" tilstand',
  toRequired: 'Spesifiser "til" tilstand'
}

export const guards = {
  label: 'Vakter',
  title: 'Vakter for overgang på "{event}" fra "{from}" til "{to}"',
  name: {
    label: 'Navn'
  },
  parameters: {
    label: 'Parametre'
  },
  negate: {
    label: 'Ugyldiggjør'
  },
  expressionTypeName: 'JavaScript-uttrykk',
  emptyList: 'Ingen vakter spesifisert for denne overgangen.',
  addNewCallout: 'Legg til ny!',
  deleteDialog: {
    message: 'Vil du fjerne denne vakten?'
  },
  editor: {
    title: {
      edit: 'Rediger vakt',
      add: 'Legg til vakt'
    },
    wrongResultType: 'Funksjon returnert: "{value}" av type "{type}", men forventet en boolsk verdi.',
    predefinedFunction: {
      label: 'Forhåndsdefinert funksjon',
      chooseCondition: 'Velg betingelse',
      negate: 'Ugyldiggjør'
    },
    expression: {
      label: 'Uttrykk',
      placeholder: 'Angi JavaScript-kode her',
      results: 'Resultater',
      autoplay: 'Kjør automatisk',
      exampleObject: {
        label: 'Eksempelobjekt',
        hint: 'Klikk en egenskap for å sette inn referansen dens i JavaScript Expression-redigeringsprogrammet.'
      }
    }
  }
}

export const automatic = {
  label: 'Automatisk',
  title: 'Automatiske vakter for overgang på "{event}" fra "{from}" til "{to}"',
  alwaysAutomatic: 'Alltid automatisk',
  emptyList: 'Ingen automatiske vakter spesifisert for denne overgangen.',
  addNewCallout: 'Legg til ny!'
}

export const actions = {
  label: 'Handlinger',
  title: 'Handlinger for overgang på "{event}" fra "{from}" til "{to}"',
  deleteDialog: {
    message: 'Vil du fjerne denne handlingen?'
  },
  name: {
    label: 'Navn'
  },
  parameters: {
    label: 'Parametre'
  },
  emptyList: 'Ingen handlinger spesifisert for denne overgangen.',
  addNewCallout: 'Legg til ny!',
  editor: {
    title: 'Handlingspåkallelse',
    chooseAction: 'Velg handling'
  }
}

export const buttons = {
  save: {
    label: 'Lagre'
  },
  download: {
    label: 'Last ned'
  },
  add: {
    label: 'Legg til'
  },
  edit: {
    label: 'Rediger'
  },
  delete: {
    label: 'Slett'
  },
  ok: {
    label: 'OK'
  },
  cancel: {
    label: 'Avbryt'
  },
  close: {
    label: 'Lukk'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Angi verdi'
  },
  integerInput: {
    inValid: 'Ikke et gyldig heltall'
  },
  decimalInput: {
    inValid: 'Ikke et gyldig tall'
  },
  enterValue: 'Angi verdi',
  defineExpression: 'Definer uttrykk',
  expression: 'Uttrykk',
  selectProperty: 'Velg egenskap til {businessObject}'
}

export const preview = {
  title: 'Skjema',
  description: 'Dette er en midlertidig løsning for FSM-visualisering.',
  meta: {
    regular: 'regelmessige statusnoder',
    initial: 'første statusnoder',
    final: 'endelige statusnoder'
  },
  nothingToVisualize: 'Ingenting å visualisere'
}

export const select = {
  typeToSearch: `Skriv for å søke`,
  createOption: `Opprett alternativ "{option}"`,
  clearValue: `Tøm verdi`,
  clearAll: `Tøm alle`,
  nothingFound: `Fant ingen resultater`,
  loading: `Laster…`
}
