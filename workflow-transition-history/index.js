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
const search = sequelize => ({
  where, // searchable fields are "from", "to", "event", "businessObjType", "businessObjId".
  order = ['createdOn']
}) => sequelize.model(MODEL_NAME).findAll({
  where,
  order
});

/*
 * The function runs pending migrations from MIGRATIONS_DIR and returns a promise.
 * It is resolved with an array of executed migrations' names.
 * It is rejected with an error.
 */
exports.runMigrations = sequelize => {
  return new Umzug({
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
    up();
};

/*
 * The function (re)imports the package's models into sequelize and returns a promise.
 * It is resolved with { add, search } object.
 * It is rejected with an error
 *
 * The function calls "associate()" for the models with these models array as an argument =>
 * the models may ONLY have associations with each other BUT NOT with other models from outside the package
 * AND models from outside the package must not have associations with the package's models.
 */
exports.createModel = sequelize => importModels(sequelize).
  then(sequelize => ({
    add: add(sequelize),
    search: search(sequelize)
  }));
