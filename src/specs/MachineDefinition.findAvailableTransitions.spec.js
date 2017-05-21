import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: findAvailableTransitions', function() {
  it("throws an error if 'from' is not specified", function() {
    assert.throws(() => {
      new MachineDefinition().findAvailableTransitions();
    });
  });

  it("returns empty list if transition are not defined in machine schema", function() {
    // 0 transitions
    const transitions = new MachineDefinition().findAvailableTransitions({from: 'anyState'});
    assert(transitions && transitions.length === 0);
  });

  it("returns appropriate transitions for specified 'from' and 'event'", function() {
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
    )
    // todo: check exact transitions, not only array length
    assert.equal(
      machineDefinition.findAvailableTransitions({from: 'a'}).length,
      2
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->b'
      }).length,
      1
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->c'
      }).length,
      1
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'a',
        event: 'a->a'
      }).length,
      0
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({from: 'b'}).length,
      1
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'b',
        event: 'b->c'
      }).length,
      1
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'b',
        event: 'b->a'
      }).length,
      0
    );
  });

  it("return transition only if 'guard accepts object'", function() {
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
                  argumens: {
                    'one': 1,
                    'two': 2
                  }
                }
              ]
            }
          ]
        },
        guards: {
          'a-to-b': ({object}) => {
            return object.enabled;
          }
        }
    });
    // todo: check exact transitions, not only array length
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {
          enabled: false
        }
      }).length,
      0
    );
    assert.equal(
      machineDefinition.findAvailableTransitions({
        from: 'a',
        object: {
          enabled: true
        }
      }).length,
      1
    );
  });
});
