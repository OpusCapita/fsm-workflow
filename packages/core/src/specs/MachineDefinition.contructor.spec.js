import assert from 'assert';
import MachineDefinition from '../MachineDefinition';
import bluebird from "bluebird"

describe('machine definition: constructor', function() {
  it('uses correct default object state field name if not specified', () => {
    assert.equal(new MachineDefinition().objectConfiguration.stateFieldName,
      MachineDefinition.getDefaultObjectStateFieldName());
  });

  [null].forEach(promise => {
    it(`promise = '${promise}' in constructor is no acceptable`, () => {
      assert.throws(() => {
        return new MachineDefinition({ promise });
      }, Error);
    });
  });

  // eslint-disable-next-line max-len
  it("if library is used outside node (e.g. browser) then 'bluebird' should be used as default Promise implementation", () => {
    // store Promise
    const { Promise } = global;
    try {
      global.Promise = undefined;

      assert.equal(new MachineDefinition().promise, bluebird.Promise);
    } finally {
      // restore promise
      global.Promise = Promise;
    }
  });
});
