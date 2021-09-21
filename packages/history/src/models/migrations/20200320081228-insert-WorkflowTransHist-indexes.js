'use strict';
const TABLE = 'WorkflowTransitionHistory';
const SEARCH_INDEX = 'WorkflowTransitionHistory_boID_boType_to';
const FINISHEDON_INDEX = 'WorkflowTransitionHistory_FinishedOn';

module.exports = {
  up: (queryInterface) => {
    queryInterface.addIndex(
      TABLE,
      ['businessObjId', 'businessObjType', 'to'],
      {
        name: SEARCH_INDEX
      }
    );
    queryInterface.addIndex(
      TABLE,
      ['finishedOn'],
      {
        name: FINISHEDON_INDEX
      }
    );
  },
  down: (queryInterface) => {
    queryInterface.removeIndex(TABLE, FINISHEDON_INDEX);
    queryInterface.removeIndex(TABLE, SEARCH_INDEX);
  }
};
