import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

describe('machine definition: object alias', function() {
  it('static method extendParamsWithObjectAlias', () => {
    const params = {};
    const object = { brand: "tesla" };
    // objectConfiguration is not defined -> params stays unchanged
    assert.equal(MachineDefinition.extendParamsWithObjectAlias(params, object, {}), params);
    // objectConfiguration is defined, but alias is not defined -> params stays unchanged
    assert.equal(MachineDefinition.extendParamsWithObjectAlias(params, object, { objectConfiguration: { } }), params);
    // alias is defined -> params are extended with alias
    assert.deepEqual(MachineDefinition.extendParamsWithObjectAlias(
      params,
      object,
      {
        objectConfiguration: {
          alias: "car"
        }
      }
    ), { ...params, car: object });
  });
});
