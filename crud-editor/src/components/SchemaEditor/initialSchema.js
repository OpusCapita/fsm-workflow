export default {
  name: "invoice approval",
  initialState: "open",
  finalStates: ["approved"],
  objectStateFieldName: "status",
  transitions: [
    {
      from: "open",
      event: "approve",
      // guards: [
      //   {
      //     "name": "validate",
      //     "arguments": {
      //       "argument1": "value1",
      //       "argument2": "value2"
      //     }
      //   }
      // ],
      to: "approved",
      // actions: [
      //   {
      //     "name": "archive",
      //     "arguments": {
      //       "argument1": "value1",
      //       "argument2": "value2"
      //     }
      //   }
      // ],
      // automatic: [
      //   {
      //     "name": "lastlyUpdatedMoreThan24hAgo",
      //     "arguments": {
      //       "argument1": "value1",
      //       "argument2": "value2"
      //     },
      //     "negate": true
      //   }
      // ]
    }
  ]
};
