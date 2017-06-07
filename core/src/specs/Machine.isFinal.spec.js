import assert from "assert";
import Machine from "../Machine";
import MachineDefinition from "../MachineDefinition";

const createMachine = () => {
  return new Machine({
    machineDefinition: new MachineDefinition({
      schema: {
        finalStates: ["x", "y", "z"]
      }
    })
  });
};

describe("machine: isFinal", function() {
  it("returns correct value", function() {
    assert.equal(createMachine().isFinal({ state: "x" }), true);
    assert.equal(createMachine().isFinal({ state: "a" }), false);
  });
});
