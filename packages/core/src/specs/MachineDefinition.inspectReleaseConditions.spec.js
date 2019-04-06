import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: inspectReleaseConditions', function() {
  it(`rejects if 'from' is undefined`, function() {
    const machineDefinition = new MachineDefinition({});
    return machineDefinition.inspectReleaseConditions({}).
      then(result => assert.fail(result)).
      catch(e => assert(e));
  });

  it(`rejects if 'from' is null`, function() {
    const machineDefinition = new MachineDefinition({});
    return machineDefinition.inspectReleaseConditions({}).
      then(result => assert.fail(result)).
      catch(e => assert(e));
  });

  it('returns true if states are not defined', function() {
    const machineDefinition = new MachineDefinition({ from: null });
    return machineDefinition.inspectReleaseConditions({ from: 'a' }).
      then(result => assert.equal(result, true)).
      catch(e => assert.fail(e));
  });

  it('returns true if no release conditions defined for state', function() {
    const definition = {
      schema: {
        transitions: [],
        states: [{ name: 'a' }]
      }
    };
    const machineDefinition = new MachineDefinition(definition);
    return machineDefinition.inspectReleaseConditions({ from: 'a' }).
      then(result => assert(result)).
      catch(e => assert.fail(e));
  });

  describe('when release conditions are defined', function() {
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
              to: ['c'], // relevant only for 'c'
              guards: [{ expression: 'object.total > 500' }]
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

    const stateA = definition.schema.states.find(s => s.name === 'a');

    it(`for empty 'to' inspects only conditions with empty 'to'`, function() {
      const object = { enabled: true, total: 150 }
      const machineDefinition = new MachineDefinition(definition);

      const applyToAll = stateA.release.find(r => r.to === undefined);
      assert(applyToAll);

      return machineDefinition.inspectReleaseConditions({ from: 'a', object }).
        then(result => {
          assert.equal(result.length, 1);
          assert.deepEqual(applyToAll, result[0].condition);

          assert.deepEqual(result[0].result[0].condition, applyToAll.guards[0]);
          assert.equal(result[0].result[0].result, object.enabled);

          assert.deepEqual(result[0].result[1].condition, applyToAll.guards[1]);

          const limit = applyToAll.guards[1].params.find(p => p.name === 'limit').value;
          assert.equal(result[0].result[1].result, object.total >= limit);
        }).
        catch(e => assert.fail(e));
    });

    it(`for defined 'to' inspects conditions both with same 'to', and if condition includes 'to', and with empty 'to'`, function() { // eslint-disable-line max-len
      const object = { enabled: true, total: 150 }
      const machineDefinition = new MachineDefinition(definition);

      return machineDefinition.inspectReleaseConditions({ from: 'a', to: 'b', object }).
        then(result => {
          assert.equal(result.length, 3);
          result.forEach(({ condition }, i) => assert.deepEqual(condition, stateA.release[i]));
        }).
        catch(e => assert.fail(e));
    });
  });
});
