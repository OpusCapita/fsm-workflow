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
    ]
  }
});

describe("machine: getAvailableStates", function() {
  it("returns decalred states", () =>
    assert.deepEqual(machineDefinition.getAvailableStates(), ['a', 'b', 'x', 'y', 'z'])
  );
});
