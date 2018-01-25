'use strict';

const Umzug = require('umzug');
const path = require('path');

const importModels = require('./db/models');

const TABLE_NAME = 'BusinessObjFlowHistory';

/*
 * The function return Model.create(...) promise
 * which resolved value is a row instance.
 */
const add = sequelize => fields => sequelize.model(TABLE_NAME).create(fields);

/*
 * The function returns Model.findAll(...) promise
 * which resolved value is an array of objects.
 */
const search = sequelize => ({
  where, // searchable fields are "from", "to", "event", "businessObjectType", "businessObjectId".
  order = ['executedOn']
}) => sequelize.model(TABLE_NAME).findAll({
  where,
  order
});

module.exports = sequelize => {
  importModels(sequelize);

  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor // DataTypes
      ],
      path: path.join(__dirname, 'db/migrations'),
      pattern: /\.js$/
    }
  });

  return umzug.up().
    then(_ => ({
      add: add(sequelize),
      search: search(sequelize)
    })).
    catch(err => umzug.down().
      then(_ => { throw err; }).
      catch(_ => { throw err; })
    );
}
