'use strict';

const app = require('express')();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const workflowTransitionHistory = require('..');

const serverConfig = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3040'
};

const dbConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1111',
  database: process.env.DB_NAME || 'fsm',
  host: process.env.DB_HOSTNAME || 'localhost',
  dialect: process.env.DB_DIALECT || 'mysql'
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(helmet.noCache());
app.use(bodyParser.json());

workflowTransitionHistory(sequelize).
  then(({ add, search }) => {
    app.post('/history', (req, res) => add(req.body).
      then(entry => res.json(entry))
    );

    app.get('/history', (req, res) => {
      const {
        businessObjType,
        businessObjId,
        user,
        finishedOnGt,
        finishedOnGte,
        finishedOnLt,
        finishedOnLte,
        max,
        offset,
        by,
        order
      } = req.query;

      const finishedOn = {
        ...(finishedOnGt && { gt: new Date(finishedOnGt) }),
        ...(finishedOnGte && { gte: new Date(finishedOnGte) }),
        ...(finishedOnLt && { lt: new Date(finishedOnLt) }),
        ...(finishedOnLte && { lte: new Date(finishedOnLte) }),
      };

      return search({
        searchParameters: {
          object: {
            businessObjType,
            businessObjId
          },
          user,
          finishedOn
        },
        paging: {
          max: max ? Number(max) : undefined,
          offset: offset ? Number(offset) : undefined
        },
        sorting: {
          by,
          order
        }
      }).
        then(entries => res.json(entries));
    });

    app.listen(serverConfig.port, serverConfig.host, err => {
      if (err) {
        console.error('■■■ Server starting error:', err);
      }

      const msg = `■■■ Server listening at http://${serverConfig.host}:${serverConfig.port} ■■■`;
      console.info('\n' + '■'.repeat(msg.length) + '\n' + msg + '\n' + '■'.repeat(msg.length) + '\n');
      process.on('exit', _ => console.warn('■■■ Server has been stopped ■■■'));
    });
  }).
  catch(err => console.error('■■■ Workflow Transition History package error:', err, '■■■'));
