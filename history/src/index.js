'use strict';

const Umzug = require('umzug');
const path = require('path');

const importModels = require('./db/models');
const { MODEL_NAME } = require('./constants');
const MIGRATIONS_DIR = path.join(__dirname, 'db/migrations');

/*
 * The function return Model.create(...) promise
 * which resolved value is a row instance.
 */
const add = sequelize => fields => sequelize.model(MODEL_NAME).create(fields);

/*
 * The function returns Model.findAll(...) promise
 * which resolved value is an array of objects.
 */
const search = sequelize => {
  const { gt, gte, lt, lte } = sequelize.Op || { // Sequelize v.4 || v.3
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte'
  };

  return ({
    searchParameters: {
      object: { businessObjId, businessObjType } = {},
      user,
      finishedOn = {}
    } = {},
    paging: {
      max = 25,
      offset = 0
    } = {},
    sorting: {
      by = 'finishedOn',
      order = 'desc'
    } = {}
  }) => sequelize.model(MODEL_NAME).findAll({
    where: {
      ...(businessObjId && { businessObjId }),
      ...(businessObjType && { businessObjType }),
      ...(user && { user }),
      ...(Object.keys(finishedOn).length && {
        finishedOn: {
          ...(finishedOn.gt && { [gt]: finishedOn.gt }),
          ...(finishedOn.gte && { [gte]: finishedOn.gte }),
          ...(finishedOn.lt && { [lt]: finishedOn.lt }),
          ...(finishedOn.lte && { [lte]: finishedOn.lte })
        }
      })
    },
    order: [[by, order.toUpperCase()]],
    limit: max,
    offset
  });
}

/*
 * The function runs pending migrations from MIGRATIONS_DIR,
 * (re)imports the package's models into sequelize
 * and returns a promise.
 * The promise is resolved with { add, search } object.
 * The promise is rejected with an error
 */
module.exports = sequelize => new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor // DataTypes
    ],
    path: MIGRATIONS_DIR,
    pattern: /\.js$/
  }
}).
  up().
  then(_ => importModels(sequelize)).
  then(_ => ({
    add: add(sequelize),
    search: search(sequelize)
  }));
