const action = args => {
  console.log('action "updateProcessedBy" executed')
}

action.paramsSchema = {
  "type": "object",
  "properties": {
    processedByFieldName: {
      "type": "string"
    }
  },
  "required": ["processedByFieldName"]
}

export default action;
