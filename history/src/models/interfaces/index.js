'use strict';

const workflowTransitionHistory = require('./workflowTransitionHistory.js');

module.exports = sequelize => {
  const { add, search } = workflowTransitionHistory(sequelize.model('WorkflowTransitionHistory'));
  return { add, search };
}
