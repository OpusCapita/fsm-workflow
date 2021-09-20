'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const basename = path.basename(__filename);
const readdir = promisify(fs.readdir);

/*
 * The function import models into sequelize
 * and returns updated sequelize.
 */
module.exports = async function(sequelize) {
  const models = (await readdir(__dirname)).
    filter(file => file.indexOf('.') !== 0 && (file !== basename) && (file.slice(-3) === '.js')).
    reduce(
      (models, file) => {
        const model = require(path.join(__dirname, file));

        return Object.assign(models, {
          [model.name]: model
        });
      },
      {}
    );

  Object.values(models).forEach(model => model.associate && model.associate(models));
  return sequelize;
};
