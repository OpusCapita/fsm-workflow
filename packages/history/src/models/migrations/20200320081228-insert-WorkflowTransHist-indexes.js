'use strict';
const TABLE = 'WorkflowTransitionHistory';
const SEARCH_INDEX = 'WorkflowTransitionHistory_boID_boType_to';
const FINISHEDON_INDEX = 'WorkflowTransitionHistory_FinishedOn';

module.exports = {
  up: (queryInterface) => {
    queryInterface.addIndex(
      TABLE,
      {
        name: SEARCH_INDEX,
        fields: ['businessObjId', 'businessObjType', 'to'],
      }
    );
    queryInterface.addIndex(
      TABLE,
      {
        name: FINISHEDON_INDEX,
        fields: ['finishedOn'],
      }
    );
  },
  down: (queryInterface) => {
    queryInterface.removeIndex(TABLE, FINISHEDON_INDEX);
    queryInterface.removeIndex(TABLE, SEARCH_INDEX);
  }
};
