import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';

const createMachine = ({} = {}) => {
  return new Machine(
    {
      machineDefinition: new MachineDefinition({
        schema: {
          initialState: 'started'
        }
      })
    }
  );
}

describe('machine: start', function() {
  it('returns promise', function() {
    const result = createMachine().start({
      object: {
        status: 'none'
      }
    });
    assert(result && typeof result.then === 'function')
  });

  it('sets correctly initial state', function() {
    const result = createMachine().start({
      object: {
        status: 'none'
      }
    });
    return result.then(({ object }) => {
      // console.log(`object '${JSON.stringify(object)}'`)
      assert.equal(object.status, 'started');
    })
  });
});
