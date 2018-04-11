'use strict';

module.exports = sequelize => {
  return require('./workflowTransitionHistory.js')(sequelize.model('WorkflowTransitionHistory'));
}
