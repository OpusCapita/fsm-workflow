'use strict';

const app = require('express')();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const importModels = require('../db/models');
const dbConfig = require('./config/db')[process.env.NODE_ENV || 'development'];
const { addHistory, searchHistory } = require('..');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(helmet.noCache());
app.use(bodyParser.json());

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

importModels(sequelize).sync();

app.post('/history', (req, res) => addHistory({
  sequelize,
  fields: req.body
}).
  then(entry => res.json(entry))
);

app.get('/history', (req, res) => searchHistory({
  sequelize,
  where: req.query.where,
  order: req.query.order
}).
  then(entries => res.json(entries))
);

exports.run = ({ host, port } = require('./config/server')) => {
  app.listen(port, host, err => {
    if (err) {
      console.error(err);
    }

    console.info(`Server listening at http://${host}:${port}`);
  });

  process.on('exit', _ => console.warn('Server has been stopped'));
};
