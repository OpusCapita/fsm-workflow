import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../config/webpack.config';
import bodyParser from 'body-parser';
import objectRoutes from './routes/objects';
import sendEventRoute from './routes/sendEvent';
import transitionsRoute from './routes/availableTransitions';
import editorDataRoute from './routes/editorData';
import statesRoute from './routes/states';
import historyRoute from './routes/history';
import storage from './storage';
import fsm from './fsm';
import schema from './schema';
import { generateObjects } from './utils';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const app = express();
const server = Server(app);
app.use(bodyParser.json())
app.use(objectRoutes)
app.use(sendEventRoute)
app.use(transitionsRoute)
app.use(editorDataRoute)
app.use(statesRoute)
app.use(historyRoute)

const compiler = webpack(config);

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
} else {
  app.get('/bundle.js', (req, res) => {
    res.sendFile(resolve(__dirname, '../../www/bundle.js'));
  })
}

app.get('*', function(req, res) {
  res.sendFile(resolve(__dirname, '../../www/index.html'));
});

// initialize data and start server

(async function() {
  await schema.init();
  await storage.init();
  await fsm.init(storage.sequelize);

  // generate invoices based on schema
  const invoices = generateObjects({ schema: schema.getSchema() })
  const { machine } = fsm;
  return Promise.all(invoices.map(invoice => {
    machine.start({ object: invoice, user: 'demouser' });
    return storage.addObject(invoice)
  }))
}()).
  then(_ => {
    server.listen(port, host, _ => console.log(`server is listening on ${host}:${port}`));
  }).
  catch(err => console.log('INIT FAILED', err));

