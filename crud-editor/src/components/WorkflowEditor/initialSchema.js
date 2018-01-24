export default {
  name: "invoice approval",
  initialState: "open",
  finalStates: ["approved", "state-3"],
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
    },
    {
      event: "event-1",
      from: "approved",
      to: "state-1"
    },
    {
      event: "event-2",
      from: "state-1",
      to: "state-2"
    },
    {
      event: "event-3",
      from: "state-1",
      to: "state-3"
    },
    {
      event: "event-4",
      from: "state-3",
      to: "approved"
    }
  ]
};
