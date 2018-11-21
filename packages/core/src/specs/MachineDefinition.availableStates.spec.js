import assert from "assert";
import MachineDefinition from "../MachineDefinition";

const createMachineDefintion = ({ states = [
  { name: 'a' },
  { name: 'b' },
  { name: 'y' },
  { name: 'm' },
  { name: 'n' },
  { name: 'z' },
], transitions = [
  {
    from: 'a',
    to: 'b'
  },
  {
    from: 'b',
    to: 'x'
  },
] } = {}) => {
  return new MachineDefinition({
    schema: {
      initialState: "a",
      finalStates: ["x", "y", "z"],
      transitions,
      states
    }
  });
};

describe("machine: getAvailableStates", function() {
  it("returns declared states", () =>
    assert.deepEqual(createMachineDefintion().getAvailableStates(), ['a', 'b', 'm', 'n', 'x', 'y', 'z'])
  );

  it("returns declared states: empty transitions", () =>
    assert.deepEqual(
      createMachineDefintion({ transitions: [] }).getAvailableStates(),
      ['a', 'b', 'm', 'n', 'x', 'y', 'z']
    )
  );

  it("returns declared states: empty states", () =>
    assert.deepEqual(createMachineDefintion({ states: [] }).getAvailableStates(), ['a', 'b', 'x', 'y', 'z'])
  );

  it("returns declared states: no states and transitions", () =>
    assert.deepEqual(createMachineDefintion({ transitions: [], states: [] }).getAvailableStates(), ['a', 'x', 'y', 'z'])
  );
});
