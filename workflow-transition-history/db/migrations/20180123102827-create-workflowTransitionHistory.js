'use strict';

const { MODEL_NAME } = require('../../constants');

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable(MODEL_NAME, {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    from: { type: DataTypes.STRING, allowNull: false },
    to: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: false },
    businessObjType: { type: DataTypes.STRING, allowNull: false },
    businessObjId: { type: DataTypes.STRING, allowNull: false },
    user: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    createdOn: { type: DataTypes.DATE, allowNull: false }
  }),
  down: (queryInterface, DataTypes) => queryInterface.dropTable(MODEL_NAME)
};
