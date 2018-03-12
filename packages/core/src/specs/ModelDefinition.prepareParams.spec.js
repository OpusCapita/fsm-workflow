import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('path expressions', function() {
  const object = {
    numberProp: 234234.3454,
    stringProp: '%xc%ds%%^%$^&--0$&*$&*'
  }

  const params = [
    {
      name: 'one',
      value: 'invoice["numberProp"]',
      expression: 'path'
    },
    {
      name: 'two',
      value: 'object["stringProp"]',
      expression: 'path'
    }
  ]

  const machineDefinition = new MachineDefinition({
    objectConfiguration: {
      alias: 'invoice'
    }
  })

  const implicitParams = {
    object,
    ...machineDefinition.prepareObjectAlias(object)
  }

  it('return evaluated path expressions', () => {
    const newParams = machineDefinition.prepareParams({
      explicitParams: params,
      implicitParams
    });
    assert.deepEqual({
      one: object.numberProp,
      two: object.stringProp,
      ...implicitParams
    }, newParams)
  })

  it('throw for invalid path', () => {
    try {
      const newParams = machineDefinition.prepareParams({
        explicitParams: [
          {
            name: 'three',
            expression: 'path',
            value: '["numberProp"]' // not prefixed -> error
          }
        ],
        implicitParams
      });
      assert.fail(`Did not throw for invalid path; returned: ${newParams}`)
    } catch (err) {
      assert(true)
    }
  })
});
