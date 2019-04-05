import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: inspectReleaseRestrictions', function() {
  it(`rejects if 'from' is undefined`, function() {
    const machineDefinition = new MachineDefinition({});
    return machineDefinition.inspectReleaseRestrictions({}).
      then(result => assert.fail(result)).
      catch(e => assert(e));
  });

  it(`rejects if 'from' is null`, function() {
    const machineDefinition = new MachineDefinition({});
    return machineDefinition.inspectReleaseRestrictions({}).
      then(result => assert.fail(result)).
      catch(e => assert(e));
  });

  it('returns true if states are not defined', function() {
    const machineDefinition = new MachineDefinition({ from: null });
    return machineDefinition.inspectReleaseRestrictions({ from: 'a' }).
      then(result => assert(result)).
      catch(e => assert.fail(e));
  });

  it('returns true if no release restrictions defined for state', function() {
    const definition = {
      schema: {
        transitions: [],
        states: [{ name: 'a' }]
      }
    };
    const machineDefinition = new MachineDefinition(definition);
    return machineDefinition.inspectReleaseRestrictions({ from: 'a' }).
      then(result => assert(result)).
      catch(e => assert.fail(e));
  });

  describe('when release restrictions are defined', function() {
    const definition = {
      schema: {
        transitions: [],
        states: [{
          name: 'a',
          release: [
            {
              // 'to' is not defined, this restriction is relevant for all requests
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
              guards: [
                {
                  expression: 'object.total > 300'
                }
              ]
            },
            {
              to: ['d', 'b', 'c'], // relevant for any of these states
              guards: [
                {
                  expression: 'object.total > 100'
                }
              ]
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

    it(`for empty 'to' inspects only restrictions with empty 'to'`, function() {
      const object = { enabled: true, total: 150 }
      const machineDefinition = new MachineDefinition(definition);

      const applyToAll = stateA.release.find(r => r.to === undefined);
      assert(applyToAll);

      return machineDefinition.inspectReleaseRestrictions({ from: 'a', object }).
        then(result => {
          assert.equal(result.length, 1);
          assert.deepEqual(applyToAll, result[0].restriction);

          assert.deepEqual(result[0].result[0].condition, applyToAll.guards[0]);
          assert.equal(result[0].result[0].result, object.enabled);

          assert.deepEqual(result[0].result[1].condition, applyToAll.guards[1]);

          const limit = applyToAll.guards[1].params.find(p => p.name === 'limit').value;
          assert.equal(result[0].result[1].result, object.total >= limit);
        }).
        catch(e => assert.fail(e));
    });

    it(`for defined 'to' inspects restrictions both with same 'to', and if restriction includes 'to', and with empty 'to'`, function() { // eslint-disable-line max-len
      const object = { enabled: true, total: 150 }
      const machineDefinition = new MachineDefinition(definition);

      return machineDefinition.inspectReleaseRestrictions({ from: 'a', to: 'b', object }).
        then(result => {
          assert.equal(result.length, stateA.release.length);
          result.forEach(({ restriction }, i) => assert.deepEqual(restriction, stateA.release[i]));
        }).
        catch(e => assert.fail(e));
    });
  });
});
