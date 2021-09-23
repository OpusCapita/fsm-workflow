'use strict';

const indexName = 'WorkflowTransHist_boid_idx';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.addIndex(
    'WorkflowTransitionHistory',
    {
      name: indexName,
      fields: ['businessObjId']
    }
  ),
  down: (queryInterface, DataTypes) => queryInterface.removeIndex('WorkflowTransitionHistory', indexName)
};
