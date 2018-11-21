import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: inspectTransitions', function() {
  const definition = {
    schema: {
      transitions: [
        {
          from: 'a',
          to: 'b',
          event: 'a->b',
          guards: [
            {
              expression: 'object.enabled'
            },
            {
              name: 'lessThan',
              negate: true, // effectively 'more or equal'
              params: [
                {
                  name: 'fieldName',
                  value: 'total'
                },
                {
                  name: 'limit',
                  value: 0
                }
              ]
            }
          ],
          automatic: [ // object.total < 100 -> automatic
            {
              name: 'lessThan',
              params: [
                {
                  name: 'fieldName',
                  value: 'total'
                },
                {
                  name: 'limit',
                  value: 100
                }
              ]
            }
          ]
        },
        {
          from: 'b',
          to: 'c',
          event: 'b->c',
          guards: [
            {
              name: 'isEnabled'
            }
          ],
          automatic: true
        },
        {
          from: 'a',
          to: 'c',
          event: 'a->c',
          automatic: [
            {
              expression: 'object.total < 200'
            }
          ]
        },
        {
          from: 'a',
          to: 'd',
          event: 'a->d'
        }
      ]
    },
    conditions: {
      'isEnabled': ({ object }) => {
        return object.enabled;
      },
      'lessThan': ({ limit, fieldName, object }) => {
        return limit > object[fieldName]
      }
    }
  };

  const machineDefinition = new MachineDefinition(definition);

  const object = {
    enabled: true,
    total: 150,
    status: 'a'
  }

  it('returns results of guards evaluation only by default', function() {
    return machineDefinition.inspectTransitions({ from: 'a', object }).
      then(result => {
        assert.deepEqual(
          result,
          [
            {
              transition: definition.schema.transitions[0],
              result: {
                guards: [
                  {
                    condition: definition.schema.transitions[0].guards[0],
                    result: object.enabled
                  },
                  {
                    condition: definition.schema.transitions[0].guards[1],
                    result: object.total > 0
                  }
                ]
              }
            },
            {
              transition: definition.schema.transitions[2],
              result: {} // no guards were defined for this transition
            },
            {
              transition: definition.schema.transitions[3],
              result: {} // no guards were defined for this transition
            }
          ]
        )
      }).
      catch(e => assert.fail(e))
  });

  it('returns results of guards AND automatic, if checkAutomatic === true', function() {
    return machineDefinition.inspectTransitions({ from: 'a', object, checkAutomatic: true }).
      then(result => {
        assert.deepEqual(
          result,
          [
            {
              transition: definition.schema.transitions[0],
              result: {
                guards: [
                  {
                    condition: definition.schema.transitions[0].guards[0],
                    result: object.enabled
                  },
                  {
                    condition: definition.schema.transitions[0].guards[1],
                    result: object.total > 0
                  }
                ],
                automatic: [
                  {
                    condition: definition.schema.transitions[0].automatic[0],
                    result: object.total < 100
                  }
                ]
              }
            },
            {
              transition: definition.schema.transitions[2],
              result: {
                automatic: [
                  {
                    condition: definition.schema.transitions[2].automatic[0],
                    result: object.total < 200
                  }
                ]
              }
            },
            {
              transition: definition.schema.transitions[3],
              result: {
                automatic: false // automatic was undefined -> it means `false` for automatic check
              }
            }
          ]
        )
      }).
      catch(e => assert.fail(e))
  });

  it('transition can be always automatic (automatic === `true`), and result will also be just `true`', function() {
    return machineDefinition.inspectTransitions({ from: 'b', object, checkAutomatic: true }).
      then(result => {
        assert.deepEqual(
          result,
          [
            {
              transition: definition.schema.transitions[1],
              result: {
                guards: [
                  {
                    condition: definition.schema.transitions[1].guards[0],
                    result: object.enabled
                  }
                ],
                automatic: true
              }
            }
          ]
        )
      }).
      catch(e => assert.fail(e))
  });
});
