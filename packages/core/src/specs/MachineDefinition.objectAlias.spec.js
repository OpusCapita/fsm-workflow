import assert from 'assert';
import MachineDefinition from '../MachineDefinition';

const object = { brand: "tesla" };

describe('machine definition: object alias', function() {
  it('prepareObjectAlias: objectConfiguration is not defined -> empty object is returned', () => {
    const machineDefinition = new MachineDefinition();
    assert.deepEqual(machineDefinition.prepareObjectAlias(object), {});
  });

  it('prepareObjectAlias: objectConfiguration is defined, but alias is not defined -> empty object is returned', () => {
    const machineDefinition = new MachineDefinition({
      objectConfiguration: {}
    });
    assert.deepEqual(machineDefinition.prepareObjectAlias(object), {});
  });

  it('prepareObjectAlias: objectConfiguration.alias is defined -> {<alias>: object} is returned', () => {
    const machineDefinition = new MachineDefinition({
      objectConfiguration: {
        alias: "car"
      }
    });
    assert.deepEqual(machineDefinition.prepareObjectAlias(object), { car: object });
  });
});
