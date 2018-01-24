'use strict';

const TABLE_NAME = 'BusinessObjFlowHistory';

module.exports = (sequelize, DataTypes) => sequelize.define(TABLE_NAME, {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  from: { type: DataTypes.STRING, allowNull: false },
  to: { type: DataTypes.STRING, allowNull: false },
  event: { type: DataTypes.STRING, allowNull: false },
  businessObjectType: { type: DataTypes.STRING, allowNull: false },
  businessObjectId: { type: DataTypes.STRING, allowNull: false },
  initiator: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
}, {
  // enable timestamps
  timestamps: true,

  // don't add the timestamp attribute "updatedAt"
  updatedAt: false,

  // rename "createdAt" timestamp attribute
  createdAt: 'executedOn',

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: TABLE_NAME
});
