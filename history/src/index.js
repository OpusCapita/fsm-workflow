'use strict';

const Umzug = require('umzug');
const path = require('path');

const importModels = require('./models/definitions');
const interfaceModels = require('./models/interfaces');

const MIGRATIONS_DIR = './models/migrations';

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
    path: path.join(__dirname, MIGRATIONS_DIR),
    pattern: /\.js$/
  }
}).
  up().
  then(_ => importModels(sequelize)).
  then(_ => interfaceModels(sequelize));
