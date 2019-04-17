export const common = {
  editorTitle: 'Työnkulun muokkaus',
  workflowName: {
    label: 'Nimi',
    placeholder: 'Skeemasi nimi'
  },
  confirmation: {
    title: 'Vahvistus',
    message: 'Olet tehnyt muutoksia. Tämän editorin sulkeminen poistaa muutokset.'
  }
}

export const states = {
  label: 'Tilat',
  name: {
    label: 'Nimi',
    placeholder: 'Lisää tilan nimi'
  },
  description: {
    label: 'Kuvaus',
    placeholder: 'Lisää tilan kuvaus'
  },
  initial: {
    label: 'Alku'
  },
  final: {
    label: 'Loppu'
  },
  noAvailableNamesLeft: 'Ei nimiä käytettävissä',
  stateAlreadyExists: 'Tämä tila on jo olemassa',
  deleteDialog: {
    message: {
      description: 'Tilaa "{stateName}" käytetään siirtymissä. Jatkovaihtoehdot',
      delete: 'Poista tämä tila ja siihen liittyvät siirtymät',
      swap: 'Vaihda tila "{stateName}" toiseen'
    },
    simpleMessage: 'Haluatko varmasti poistaa tämän tilan?'
  },
  editor: {
    title: {
      add: 'Lisää uusi tila',
      edit: 'Muokkaa tilaa "{stateName}"'
    }
  },
  labelHint: 'Näkyy käyttöliittymässä nimellä "{label}"',
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
  label: 'Siirtymät',
  event: {
    label: 'Tapahtuma',
    placeholder: 'Lisää tapahtuman nimi'
  },
  from: {
    label: 'Alkaen',
    placeholder: "Lisää lähtötila"
  },
  to: {
    label: 'Asti',
    placeholder: "Lisää kohdetila"
  },
  editor: {
    title: {
      add: 'Lisää uusi siirtymä',
      edit: 'Muokkaa siirtymää'
    }
  },
  deleteDialog: {
    message: 'Haluatko varmasti poistaa tämän siirtymän?'
  },
  fromRequired: "Määritä lähtötila",
  toRequired: "Määritä kohdetila"
}

export const guards = {
  label: 'Suojat',
  title: 'Suojat siirtymälle tapahtumassa "{event}" lähtötilasta "{from}" kohdetilaan "{to}"',
  name: {
    label: 'Nimi'
  },
  parameters: {
    label: 'Parametrit'
  },
  negate: {
    label: 'Kiellä'
  },
  expressionTypeName: 'JavaScript-lauseke',
  emptyList: 'Tälle siirtymälle ei ole määritelty suojia.',
  addNewCallout: 'Lisää uusi!',
  deleteDialog: {
    message: 'Haluatko varmasti poistaa tämän suojan?'
  },
  editor: {
    title: {
      edit: 'Muokkaa suojaa',
      add: 'Lisää suoja'
    },
    wrongResultType: 'Toiminto palautti arvon: "{value}" tyyppiä "{type}", mutta odotettiin totuusarvoa.',
    predefinedFunction: {
      label: 'Esimääritelty toiminto',
      chooseCondition: 'Valitse ehto',
      negate: 'Kiellä'
    },
    expression: {
      label: 'Ilmaisu',
      placeholder: 'Syötä tässä JavaScript-koodi',
      results: 'Tulokset',
      autoplay: 'Automaattinen toisto',
      exampleObject: {
        label: 'Esimerkkiobjekti',
        hint: 'Napsauta ominaisuutta, jonka viitteen haluat lisätä JavaScript-lausekkeen editoriin.'
      }
    }
  }
}

export const automatic = {
  label: 'Automaattinen',
  title: 'Automaattiset suojat siirtymälle tapahtumassa "{event}" lähtötilasta "{from}" kohdetilaan "{to}"',
  alwaysAutomatic: 'Aina automaattinen',
  emptyList: 'Tälle siirtymälle ei ole määritelty automaattisia suojia.',
  addNewCallout: 'Lisää uusi!'
}

export const actions = {
  label: 'Toimenpiteitä',
  title: 'Toimet tapahtumassa "{event}" lähtötilasta "{from}" kohdetilaan "{to}"',
  deleteDialog: {
    message: 'Haluatko varmasti poistaa tämän toimen?'
  },
  name: {
    label: 'Nimi'
  },
  parameters: {
    label: 'Parametrit'
  },
  emptyList: 'Tälle siirtymälle ei ole määritelty toimia.',
  addNewCallout: 'Lisää uusi!',
  editor: {
    title: 'Toimen hakeminen',
    chooseAction: 'Valitse toimenpide'
  }
}

export const buttons = {
  save: {
    label: 'Tallenna'
  },
  download: {
    label: 'Ladata'
  },
  add: {
    label: 'Lisää'
  },
  edit: {
    label: 'Editoida'
  },
  delete: {
    label: 'Poista'
  },
  ok: {
    label: 'OK'
  },
  cancel: {
    label: 'Peru'
  },
  close: {
    label: 'Sulje'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Lisää arvo'
  },
  integerInput: {
    inValid: 'Ei kelvollinen kokonaisluku'
  },
  decimalInput: {
    inValid: 'Ei kelvollinen luku'
  },
  enterValue: 'Lisää arvo',
  defineExpression: 'Määrittele lauseke',
  expression: 'Ilmaisu',
  selectProperty: 'Valitse ominaisuus kohteelle {businessObject}'
}

export const preview = {
  title: 'Skeema',
  description: 'Tämä on tilapäisratkaisu FSM-visualisointia varten.',
  meta: {
    regular: 'tavanomaiset tilanoodit',
    initial: 'alkutilanoodit',
    final: 'lopputilanoodit'
  },
  nothingToVisualize: 'Ei visualisoitavaa'
}

export const select = {
  typeToSearch: `Kirjoita haku`,
  createOption: `Luo valinta "{option}"`,
  clearValue: `Tyhjennä arvo`,
  clearAll: `Tyhjennä kaikki`,
  nothingFound: `Tuloksia ei löytynyt`,
  loading: `Lataa…`
}
