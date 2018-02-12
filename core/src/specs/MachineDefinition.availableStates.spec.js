import assert from "assert";
import MachineDefinition from "../MachineDefinition";

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
      {
        name: 'a'
      },
      {
        name: 'b',
        description: 'B'
      },
      {
        name: 'x'
      },
      {
        name: 'y'
      },
      {
        name: 'z'
      },
      {
        name: 'n'
      },
      {
        name: 'e'
      },
    ]
  }
});

describe("machine: getAvailableStates", function() {
  it("returns declared states", () =>
    assert.deepEqual(machineDefinition.getAvailableStates(), ['a', 'b', 'e', 'n', 'x', 'y', 'z'])
  );
});
