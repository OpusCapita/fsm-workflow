const action = args => {
  console.log(`action "sendMail" executed`)
}

action.paramsSchema = {
  "type": "object",
  "properties": {
    fromAddress: {
      "type": "string"
    },
    greeting: {
      "type": "string"
    },
    sendCopy: {
      "type": "boolean"
    },
    maxRetries: {
      "type": "integer"
    },
    interest: {
      "type": "number"
    },
    language: {
      "type": "string",
      "enum": ["en", "de", "fi", "ru", "sv", "no"]
    },
    priority: {
      "type": "integer",
      "enum": [0, 1, 2, 3, 4, 5]
    },
    expiryDate: {
      "type": "string",
      "format": "date"
    }
  },
  "required": ["fromAddress", "greeting"]
}

export default action;
