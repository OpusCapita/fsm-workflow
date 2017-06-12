import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

const createMachineCorrectly = ({ promise } = {}) => {
  return new Machine(
    {
      machineDefinition: new MachineDefinition(),
      promise: promise
    }
  );
}

describe('machine: constructor', function() {
  it('should throw Error as machineDefinitionProvider is not defined', function() {
    assert.throws(() => {
      return new Machine()
    }, Error);
  });

  it('should throw Error as machine name is not defined', function() {
    assert.throws(() => {
      return new Machine({ machineDefinitionProvider: {} });
    }, Error);
  });

  it('should throw Error as machine definition is not found', function() {
    assert.throws(() => {
      return new Machine(
        {
          machineDefinitionProvider: {
            definitions: {
            }
          },
          name: 'testmachine'
        },
        Error
      );
    });
  });

  it('should not throw Error as Worklfow should be correctly created', function() {
    assert.doesNotThrow(createMachineCorrectly);
  });

  it('check default machine promise', function() {
    const w = createMachineCorrectly();
    assert.equal(w.promise, Machine.defaultPromise());
  });

  it('check passed machine promise', function() {
    const promise = 'MegaPromise';
    const w = createMachineCorrectly({ promise });
    assert.equal(w.promise, promise);
  });
});
