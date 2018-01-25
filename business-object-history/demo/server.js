'use strict';

const app = require('express')();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const workflowTransitionHistory = require('..');
const dbConfig = require('./config/db')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// const importModels = require('../db/models');
// importModels(sequelize).sync();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(helmet.noCache());
app.use(bodyParser.json());

exports.run = ({ host, port } = require('./config/server')) => workflowTransitionHistory(sequelize).
  then(handlers => {
    let { add, search } = handlers;

    app.post('/history', (req, res) => add(req.body).
      then(entry => res.json(entry))
    );

    app.get('/history', (req, res) => {
      let order;

      if (order) {
        try {
          order = JSON.parse(req.query.order);
        } catch (err) {
          order = req.query.order;
        }
      }

      search({
        where: req.query.where && JSON.parse(req.query.where),
        order
      }).
        then(entries => res.json(entries))
    });


    app.listen(port, host, err => {
      if (err) {
        console.error('■■■ Server starting error:', err);
      }

      const msg = `■■■ Server listening at http://${host}:${port} ■■■`;
      console.info('\n' + '■'.repeat(msg.length) + '\n' + msg + '\n' + '■'.repeat(msg.length) + '\n');
      process.on('exit', _ => console.warn('■■■ Server has been stopped ■■■'));
    });
  }).
  catch(err => console.log('■■■ Business-object-history library error:', err, '■■■'));
