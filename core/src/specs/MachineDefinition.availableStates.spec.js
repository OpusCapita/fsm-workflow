import assert from "assert";
import MachineDefinition from "../MachineDefinition";

const machineDef = new MachineDefinition({
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

describe("machine: available states", function() {
  it("returns correct value", function() {
    assert.deepEqual(machineDef.getAvailableStates(), ['a', 'b', 'x', 'y', 'z']);
  });
});
