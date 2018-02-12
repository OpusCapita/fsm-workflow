'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('WorkflowTransitionHistory', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    from: { type: DataTypes.STRING, allowNull: false },
    to: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: false },
    businessObjType: { type: DataTypes.STRING, allowNull: false },
    businessObjId: { type: DataTypes.STRING, allowNull: false },
    user: { type: DataTypes.STRING, allowNull: false },
    workflowName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    finishedOn: { type: DataTypes.DATE, allowNull: false }
  }),
  down: (queryInterface, DataTypes) => queryInterface.dropTable('WorkflowTransitionHistory')
};
