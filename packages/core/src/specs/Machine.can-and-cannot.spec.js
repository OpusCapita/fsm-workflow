import assert from "assert";
import Machine from "../Machine";
import MachineDefinition from "../MachineDefinition";

const createMachine = ({ states } = {}) => {
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
        ],
        ...(states ? { states } : {})
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

  it("returns false is release guard denies transition", function() {
    return createMachine({
      states: [
        {
          name: 'opened',
          release: [
            {
              guards: [
                {
                  expression: 'object.enabled'
                }
              ]
            }
          ]
        }
      ]
    }).can({ object: { status: "opened", enabled: false }, event: "close" }).then(result => {
      assert.equal(result, false);
    });
  });

  it("returns true is release guard aloows transition", function() {
    return createMachine({
      states: [
        {
          name: 'opened',
          release: [
            {
              guards: [
                {
                  expression: 'object.enabled'
                }
              ]
            }
          ]
        }
      ]
    }).can({ object: { status: "opened", enabled: true }, event: "close" }).then(result => {
      assert.equal(result, true);
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
