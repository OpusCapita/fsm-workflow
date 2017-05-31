import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: findAvailableTransitions', function() {
  it("throws an error if 'from' is not specified", function() {
    return new MachineDefinition().findAvailableTransitions().then(() => {
      assert.equal("then method is called", "error is thrown", "it is expected that error is thrown")
    }).catch((e) => {
      assert(e, 'Error is thrown as expected')
    });
  });

  it("returns empty list if transition are not defined in machine schema", function() {
    // 0 transitions
    return new MachineDefinition().findAvailableTransitions({ from: 'anyState' }).then(({ transitions }) => {
      assert(transitions);
      assert.equal(transitions.length, 0);
    });
  });

  it("finds appropriate transitions for specified 'from' and 'event'", function() {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a->b'
            },
            {
              from: 'b',
              to: 'c',
              event: 'b->c'
            },
            {
              from: 'a',
              to: 'c',
              event: 'a->c'
            }
          ]
        }
      }
    );
    return Promise.all([
      machineDefinition.findAvailableTransitions({ from: 'a' }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 2);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->b'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->c'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->a'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 0);
      }),
      machineDefinition.findAvailableTransitions({ from: 'b' }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'b',
        event: 'b->c'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 1);
      }),
      machineDefinition.findAvailableTransitions({
        from: 'b',
        event: 'b->a'
      }).then(({ transitions }) => {
        assert(transitions);
        assert.equal(transitions.length, 0);
      })
    ]);
  });

  describe("'guarded' transitions", function() {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a->b',
              guards: [
                {
                  name: 'a-to-b',
                  arguments: {
                    'one': 1,
                    'two': 2
                  }
                }
              ]
            }
          ]
        },
        guards: {
          'a-to-b': ({ object }) => {
            return object.enabled;
          }
        }
      });

    // todo: check exact transitions, not only array length
    it("guard forbids transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {
          enabled: false
        }
      }).then((result) => {
        return assert.equal(result.transitions.length, 0)
      });
    });

    it("guard permits transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {
          enabled: true
        }
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });
  });

  describe("'automatic' transitions", () => {
    const machineDefinition = new MachineDefinition(
      {
        schema: {
          transitions: [
            {
              from: 'a',
              to: 'b',
              event: 'a2b',
              guards: [
                {
                  name: 'a2b-guard',
                  arguments: {
                    'one': 1,
                    'two': 2
                  }
                }
              ],
              auto: [
                {
                  name: 'a2b-auto-guard',
                  arguments: {
                    'one': 1,
                    'two': 2
                  }
                }
              ]
            },
            {
              from: 'b',
              to: 'c',
              event: 'b2c',
              guards: [
                {
                  name: 'b2c-guard',
                  arguments: {
                    'one': 1,
                    'two': 2
                  }
                }
              ],
              auto: [
                {
                  name: 'b2c-auto-guard',
                  arguments: {
                    'one': 1,
                    'two': 2
                  }
                }
              ]
            },
            {
              from: 'c',
              to: 'd',
              event: 'b2c',
              guards: [],
              auto: []
            }
          ]
        },
        guards: {
          'a2b-guard': ({ object }) => {
            return true;
          },
          'a2b-auto-guard': ({ object }) => {
            return true
          },
          'b2c-guard': ({ object }) => {
            return true;
          },
          'b2c-auto-guard': ({ object }) => {
            return false
          }
        }
      });

    it("auto-guard permits transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {},
        auto: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("guard-free check", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'c',
        object: {},
        auto: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 1)
      });
    });

    it("auto-guard forbids transition", function() {
      return machineDefinition.findAvailableTransitions({
        from: 'b',
        object: {},
        auto: true
      }).then((result) => {
        return assert.equal(result.transitions.length, 0)
      });
    });
  });

});
