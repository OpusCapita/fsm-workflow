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
        }
      );
    }, Error);
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

  [null].forEach(promise => {
    it(`promise = '${promise}' in constructor is no acceptable`, () => {
      assert.throws(() => {
        createMachineCorrectly({ promise });
      }, Error);
    });
  });

  // eslint-disable-next-line max-len
  it("if library is used outside node (e.g. browser) then 'bluebird' should be used as default Promise implementation", () => {
    // store Promise
    const { Promise } = global;
    try {
      global.Promise = undefined;

      assert.equal(createMachineCorrectly().promise, require("bluebird").Promise);
    } finally {
      // restore promise
      global.Promise = Promise;
    }
  });
});
