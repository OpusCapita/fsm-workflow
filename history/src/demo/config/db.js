'use strict';

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1111',
    database: process.env.DB_NAME || 'fsm',
    host: process.env.DB_HOSTNAME || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1111',
    database: process.env.DB_NAME || 'fsm',
    host: process.env.DB_HOSTNAME || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql'
  }
}
