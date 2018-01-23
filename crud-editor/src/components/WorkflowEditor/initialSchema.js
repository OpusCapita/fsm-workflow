export default {
  name: "invoice approval",
  initialState: "open",
  finalStates: ["approved"],
  objectStateFieldName: "status",
  transitions: [
    {
      event: "approve",
      from: "open",
      to: "approved",

      // guards: [
      //   {
      //     "name": "validate",
      //     "arguments": {
      //       "argument1": "value1",
      //       "argument2": "value2"
      //     }
      //   }
      // ],
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
