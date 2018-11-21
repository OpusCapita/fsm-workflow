const action1 = () => {}

action1.paramsSchema = {
  type: "object",
  properties: {
    param1: {
      type: "integer"
    },
    param2: {
      type: "integer"
    }
  }
}

module.exports = {
  action1
}