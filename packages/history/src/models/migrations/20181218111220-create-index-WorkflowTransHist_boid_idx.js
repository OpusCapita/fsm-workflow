'use strict';

const indexName = 'WorkflowTransHist_boid_idx';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.addIndex(
    'WorkflowTransitionHistory',
    ['businessObjId'],
    {
      name: indexName
    }
  ),
  down: (queryInterface, DataTypes) => queryInterface.removeIndex('WorkflowTransitionHistory', indexName)
};
