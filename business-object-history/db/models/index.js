'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

/*
 * The function import models into sequelize
 * and returns updated sequelize.
 */
module.exports = sequelize => {
  const db = fs.
    readdirSync(__dirname).
    filter(file => file.indexOf('.') !== 0 && (file !== basename) && (file.slice(-3) === '.js')).
    reduce(
      (rez, file) => {
        const model = sequelize['import'](path.join(__dirname, file));

        return Object.assign(rez, {
          [model.name]: model
        });
      },
      {}
    );

  Object.keys(db).forEach(modelName => db[modelName].associate && db[modelName].associate(db));
  return sequelize;
};
