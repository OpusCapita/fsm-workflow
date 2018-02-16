import assert from "assert";
import MachineDefinition from "../MachineDefinition";

// TODO rewrite to get data from 'states' prop in schema
const machineDefinition = new MachineDefinition({
  schema: {
    initialState: "a",
    finalStates: ["x", "y", "z"],
    transitions: [
      {
        from: 'a',
        to: 'b'
      },
      {
        from: 'b',
        to: 'x'
      },
    ],
    states: [
      { name: 'a' },
      { name: 'b' },
      { name: 'x' },
      { name: 'y' },
      { name: 'm' },
      { name: 'n' },
      { name: 'z' },
    ]
  }
});

describe("machine: getAvailableStates", function() {
  it("returns declared states", () =>
    assert.deepEqual(machineDefinition.getAvailableStates(), ['a', 'b', 'm', 'n', 'x', 'y', 'z'])
  );
});
