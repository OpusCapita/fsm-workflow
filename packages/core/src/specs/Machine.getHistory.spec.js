import assert from 'assert';
import Machine from '../Machine';
import MachineDefinition from '../MachineDefinition';
import bluebird from 'bluebird';

const convertObjectToReference = (object) => {
  return {
    businessObjId: 'Usain Bolt',
    businessObjType: 'sprinter'
  }
};

const workflowName = 'sprint';
const createMachine = ({ history } = {}) => {
  return new Machine(
    {
      machineDefinition: new MachineDefinition({
        schema: {
          name: workflowName
        }
      }),
      history,
      convertObjectToReference
    }
  );
}

describe('machine: getHistory', function() {
  it('history.search is called with correct parameters and returns provided results', function() {
    const object = {
      nick: 'flash'
    };
    const foundHistoryRecord = {
      from: 'start',
      to: 'finish',
      event: 'gong-blow',
      finihedOn: Date(),
      user: 'start gate official',
      description: "stadium sreams: 'run baby, run!'",
      object: convertObjectToReference(object),
      workflowName
    };
    let passedSearchParameters, passedPaging, passedSorting = null;
    const history = {
      search(searchParameters, paging, sorting) {
        passedSearchParameters = searchParameters;
        passedPaging = paging;
        passedSorting = sorting;
        return bluebird.Promise.resolve([foundHistoryRecord]);
      }
    };
    const searchParameters = {
      object,
      user: 'start gate official',
      finishedOn: null
    };
    const paging = {
      max: 30,
      offset: 99
    };
    const sorting = {
      by: 'finishedOn',
      order: 'desc'
    };
    const machine = createMachine({ history });
    return machine.getHistory(searchParameters, paging, sorting).then((results) => {
      // check passed argiments
      assert.deepEqual(passedSearchParameters, {
        ...searchParameters,
        object: convertObjectToReference(searchParameters.object),
        workflowName
      });
      assert.deepEqual(passedPaging, paging);
      assert.deepEqual(passedSorting, sorting);
      // // check results
      assert.equal(results.length, 1);
      const { object, ...otherHistoryProperties } = results[0];
      assert.deepEqual(results[0], {
        workflowName: machine.machineDefinition.schema.name,
        object: convertObjectToReference(object),
        ...otherHistoryProperties,
      });
    });
  });
});
