'use strict';

const TABLE_NAME = 'BusinessObjFlowHistory';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable(TABLE_NAME, {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    from: { type: DataTypes.STRING, allowNull: false },
    to: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: false },
    businessObjectType: { type: DataTypes.STRING, allowNull: false },
    businessObjectId: { type: DataTypes.STRING, allowNull: false },
    initiator: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    executedOn: { type: DataTypes.DATE, allowNull: false }
  }),
  down: (queryInterface, DataTypes) => queryInterface.dropTable(TABLE_NAME)
};
