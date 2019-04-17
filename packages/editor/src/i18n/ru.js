export const common = {
  editorTitle: 'Редактор рабочих процессов',
  workflowName: {
    label: 'Имя',
    placeholder: 'Имя вашей схемы'
  },
  confirmation: {
    title: 'Подтверждение',
    message: 'Вы внесли изменения Эти изменения пропадут, если закрыть данный редактор.'
  }
}

export const states = {
  label: 'Состояния',
  name: {
    label: 'Имя',
    placeholder: 'Ввести имя состояния'
  },
  description: {
    label: 'Описание',
    placeholder: 'Ввести описание состояния'
  },
  initial: {
    label: 'Начальный'
  },
  final: {
    label: 'Конечный'
  },
  noAvailableNamesLeft: 'Не осталось доступных имен.',
  stateAlreadyExists: 'Это состояние уже существует',
  deleteDialog: {
    message: {
      description: 'Состояние "{stateName}" используется в переходах. Параметры для продолжения',
      delete: 'Удалить этот состояние и сопутствующие переходы',
      swap: 'Поменять состояние "{stateName}" на другое'
    },
    simpleMessage: 'Действительно удалить это состояние?'
  },
  editor: {
    title: {
      add: 'Добавить новое состояние',
      edit: 'Редактировать состояние "{stateName}"'
    }
  },
  labelHint: 'Появится в пользовательском интерфейсе как "{label}"',
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
  label: 'Переходы',
  event: {
    label: 'Событие',
    placeholder: 'Ввести имя события'
  },
  from: {
    label: 'C',
    placeholder: 'Выбрать состояние "от"'
  },
  to: {
    label: 'По',
    placeholder: 'Выбрать состояние "до"'
  },
  editor: {
    title: {
      add: 'Добавить новый переход',
      edit: 'Редактировать переход'
    }
  },
  deleteDialog: {
    message: 'Действительно удалить этот переход?'
  },
  fromRequired: 'Указать состояние "от"',
  toRequired: 'Указать состояние "до"'
}

export const guards = {
  label: 'Сторожевые условия',
  title: 'Сторожевые условия для перехода по "{event}" от "{from}" до "{to}"',
  name: {
    label: 'Имя'
  },
  parameters: {
    label: 'Параметры'
  },
  negate: {
    label: 'Инвертировать'
  },
  expressionTypeName: 'Выражение JavaScript',
  emptyList: 'Не указаны сторожевые условия для этого перехода.',
  addNewCallout: 'Добавить новое!',
  deleteDialog: {
    message: 'Действительно удалить это сторожевое условие?'
  },
  editor: {
    title: {
      edit: 'Редактировать сторожевое условие',
      add: 'Добавить сторожевое условие'
    },
    wrongResultType: 'Функция возвращена: "{value}" типа "{type}", но ожидалось логическое значение.',
    predefinedFunction: {
      label: 'Предопределенная функция',
      chooseCondition: 'Выбрать условие',
      negate: 'Инвертировать'
    },
    expression: {
      label: 'Выражение',
      placeholder: 'Введите здесь код JavaScript',
      results: 'Результаты',
      autoplay: 'Автозапуск',
      exampleObject: {
        label: 'Типовой объект',
        hint: 'Щелкните по свойству, чтобы вставить ссылку на него в редактор выражений JavaScript.'
      }
    }
  }
}

export const automatic = {
  label: 'Автоматические',
  title: 'Автоматические сторожевые условия для перехода по "{event}" от "{from}" до "{to}"',
  alwaysAutomatic: 'Всегда автоматические',
  emptyList: 'Не указаны автоматические сторожевые условия для этого перехода.',
  addNewCallout: 'Добавить новое!'
}

export const actions = {
  label: 'Действия',
  title: 'Действия для перехода по "{event}" от "{from}" до "{to}"',
  deleteDialog: {
    message: 'Действительно удалить это действие?'
  },
  name: {
    label: 'Имя'
  },
  parameters: {
    label: 'Параметры'
  },
  emptyList: 'Не указаны действия для этого перехода.',
  addNewCallout: 'Добавить новое!',
  editor: {
    title: 'Вызов действия',
    chooseAction: 'Выберите действие'
  }
}

export const buttons = {
  save: {
    label: 'Сохранить'
  },
  download: {
    label: 'Скачать'
  },
  add: {
    label: 'Добавить'
  },
  edit: {
    label: 'Редактировать'
  },
  delete: {
    label: 'Удалить'
  },
  ok: {
    label: 'Ок'
  },
  cancel: {
    label: 'Отменить'
  },
  close: {
    label: 'Закрыть'
  }
}

export const paramsEditor = {
  stringInput: {
    placeholder: 'Ввести значение'
  },
  integerInput: {
    inValid: 'Недопустимое целое число'
  },
  decimalInput: {
    inValid: 'Недопустимое количество'
  },
  enterValue: 'Ввести значение',
  defineExpression: 'Определить выражение',
  expression: 'Выражение',
  selectProperty: 'Выбрать свойство {businessObject}'
}

export const preview = {
  title: 'Схема',
  description: 'Это временное решение по визуализации FSM.',
  meta: {
    regular: 'узлы регулярного состояния',
    initial: 'узлы начального состояния',
    final: 'узлы конечного состояния'
  },
  nothingToVisualize: 'Отсутствуют объекты для визуализации'
}

export const select = {
  typeToSearch: `Ввести текст для поиска`,
  createOption: `Создать параметр "{option}"`,
  clearValue: `Очистить значение`,
  clearAll: `Очистить все`,
  nothingFound: `Не найдены результаты`,
  loading: `Идет загрузка…`
}
