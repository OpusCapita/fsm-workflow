const action = args => {
  console.log('action "testAction" executed')
}

action.paramsSchema = {
  "type": "object",
  "properties": {
    nickname: {
      "type": "string"
    },
    fullName: {
      "type": "string",
      "uiComponent": "fullName"
    },
    age: {
      "type": "integer"
    },
    bankAccountBalance: {
      "type": "number"
    },
    adult: {
      "type": "boolean"
    },
    favoriteColor: {
      "type": "string",
      "enum": ['red', 'green', 'blue', 'yellow', 'I\'m achromate']
    },
    children: {
      "type": "integer",
      "enum": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    confidenceRate: {
      "type": "number",
      "enum": [15.75, 44.55, 66.7, 99999.9]
    },
    dateOfBirth: {
      "type": "string",
      "format": "date"
    },
    todoList: {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    nextLotteryNumbers: {
      "type": "array",
      "items": {
        "type": "integer"
      }
    },
    monthlyInterestHistory: {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    importantDates: {
      "type": "array",
      "items": {
        "type": "string",
        "format": "date"
      }
    },
    dinnerMenu: {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ['Steak', 'Vegetables', 'Mashrooms', 'Beer']
      }
    }
  }
}

export default action;
