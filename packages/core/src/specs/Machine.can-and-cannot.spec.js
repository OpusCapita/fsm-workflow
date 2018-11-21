import assert from "assert";
import Machine from "../Machine";
import MachineDefinition from "../MachineDefinition";

const createMachine = () => {
  return new Machine({
    machineDefinition: new MachineDefinition({
      schema: {
        transitions: [
          {
            from: "opened",
            event: "close",
            to: "closed"
          },
          {
            from: "closed",
            event: "open",
            to: "opened"
          }
        ]
      }
    })
  });
};

describe("machine: can", function() {
  it("returns true", function() {
    return createMachine().can({ object: { status: "opened" }, event: "close" }).then(result => {
      assert.equal(result, true);
    });
  });

  it("returns false", function() {
    return createMachine().can({ object: { status: "opened" }, event: "open" }).then(result => {
      assert.equal(result, false);
    });
  });
});

describe("machine: cannot", function() {
  it("returns true", function() {
    return createMachine().cannot({ object: { status: "opened" }, event: "open" }).then(result => {
      assert.equal(result, true);
    });
  });

  it("returns false", function() {
    return createMachine().cannot({ object: { status: "opened" }, event: "close" }).then(result => {
      assert.equal(result, false);
    });
  });
});
