'use strict';

const TABLE_NAME = 'BusinessObjFlowHistory';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(TABLE_NAME, {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    from: { type: Sequelize.STRING, allowNull: false },
    to: { type: Sequelize.STRING, allowNull: false },
    event: { type: Sequelize.STRING, allowNull: false },
    businessObjectType: { type: Sequelize.STRING, allowNull: false },
    businessObjectId: { type: Sequelize.STRING, allowNull: false },
    initiator: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT }
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable(TABLE_NAME)
};
