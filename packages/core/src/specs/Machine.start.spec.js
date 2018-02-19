import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';
import bluebird from 'bluebird';

const convertObjectToReference = (object) => {
  return {
    businessObjId: 'tesla',
    businessObjType: 'car'
  }
};

const createMachine = ({ history } = {}) => {
  return new Machine(
    {
      machineDefinition: new MachineDefinition({
        schema: {
          name: 'verification',
          initialState: 'started'
        }
      }),
      history,
      convertObjectToReference
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

  it('creates correct history record', function() {
    let historyRecordUnderTest = null;
    const history = {
      add(passedData) {
        historyRecordUnderTest = passedData;
        return bluebird.Promise.resolve(historyRecordUnderTest);
      }
    };
    const machine = createMachine({ history });
    const object = {
      status: 'none'
    };
    const user = 'johnny';
    const description = 'getoff!';
    return machine.start({ object, user, description }).then(({ object }) => {
      assert.deepEqual(historyRecordUnderTest, {
        from: 'NULL',
        to: object.status,
        event: '__START__',
        ...convertObjectToReference(object),
        workflowName: machine.machineDefinition.schema.name,
        user,
        description
      });
    });
  });
});
