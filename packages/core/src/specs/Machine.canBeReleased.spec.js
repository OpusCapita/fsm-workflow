import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

describe('machine: canBeReleased', function() {
  it(`can release if states are not defined in schema`, function() {
    const machine = new Machine({ machineDefinition: new MachineDefinition() });

    const object = { status: 'a' };

    return machine.canBeReleased({ object }).
      then(result => {
        assert.equal(result, true)
      }).
      catch(e => assert.fail(e));
  });

  it(`can release if no release conditions defined for current state`, function() {
    const machine = new Machine({
      machineDefinition: new MachineDefinition({
        schema: {
          states: [
            {
              name: 'a'
            }
          ]
        }
      })
    });

    const object = { status: 'a' };

    return machine.canBeReleased({ object }).
      then(result => {
        assert.equal(result, true)
      }).
      catch(e => assert.fail(e));
  });

  describe('if release conditions are defined', function() {
    const definition = {
      schema: {
        transitions: [],
        states: [{
          name: 'a',
          release: [
            {
              // 'to' is not defined, this condition is relevant for all requests
              guards: [
                {
                  expression: 'object.enabled'
                },
                {
                  name: 'atLeast',
                  params: [
                    {
                      name: 'fieldName',
                      value: 'total'
                    },
                    {
                      name: 'limit',
                      value: 10
                    }
                  ]
                }
              ]
            },
            {
              to: 'b', // relevant only for 'to' === 'b'
              guards: [{ expression: 'object.total > 300' }]
            },
            {
              to: ['d', 'b', 'c'], // relevant for any of these states
              guards: [{ expression: 'object.total > 100' }]
            },
            {
              to: 'c', // irrelevant for 'a' -> (undefined | 'b') requests
              guards: [{ expression: `object.irrelevant == 'gonnafail'` }]
            }
          ]
        }]
      },
      conditions: {
        'atLeast': ({ limit, fieldName, object }) => {
          return object[fieldName] >= limit
        }
      }
    };

    it(`returns true if requested release to any state and wildcard condition passes`, function() {
      const object = { enabled: true, total: 150, status: 'a' }
      const machine = new Machine({ machineDefinition: new MachineDefinition(definition) });
      return machine.canBeReleased({ object }).
        then(result => {
          assert.equal(result, true);
        }).
        catch(e => assert.fail(e));
    });

    it(`returns false if requested release to any state and wildcard condition fails`, function() {
      const object = { enabled: false, total: 150, status: 'a' }
      const machine = new Machine({ machineDefinition: new MachineDefinition(definition) });
      return machine.canBeReleased({ object, to: 'b' }).
        then(result => {
          assert.equal(result, false);
        }).
        catch(e => assert.fail(e));
    });

    it(`returns true if requested release to particular state and all conditions pass`, function() {
      const object = { enabled: true, total: 301, status: 'a' }
      const machine = new Machine({ machineDefinition: new MachineDefinition(definition) });
      return machine.canBeReleased({ object, to: 'b' }).
        then(result => {
          assert.equal(result, true);
        }).
        catch(e => assert.fail(e));
    });

    it(`returns false if requested release to particular state and some conditions fail`, function() {
      const object = { enabled: true, total: 299, status: 'a' }
      const machine = new Machine({ machineDefinition: new MachineDefinition(definition) });
      return machine.canBeReleased({ object, to: 'b' }).
        then(result => {
          assert.equal(result, false);
        }).
        catch(e => assert.fail(e));
    });
  });
});
