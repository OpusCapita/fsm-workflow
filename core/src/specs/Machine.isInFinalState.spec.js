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

describe("machine: isInFinalState", function() {
  it("returns correct value", function() {
    assert.equal(createMachine().isInFinalState({ object: { status: "x" } }), true);
    assert.equal(createMachine().isInFinalState({ object: { status: "a" } }), false);
  });
});
