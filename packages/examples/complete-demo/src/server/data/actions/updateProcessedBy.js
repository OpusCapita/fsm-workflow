const action = args => {
  console.log('action "updateProcessedBy" received args: ', args)
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
