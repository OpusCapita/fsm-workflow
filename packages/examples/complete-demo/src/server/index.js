import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import objectRoutes from './routes/objects';
import sendEventRoute from './routes/sendEvent';
import transitionsRoute from './routes/availableTransitions';
import editorDataRoute from './routes/editorData';
import statesRoute from './routes/states';
import storage from './storage';
import fsm from './fsm';
import webpack from 'webpack';
import config from './webpack.config';

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

const compiler = webpack(config);

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
} else {
  app.get('/bundle.js', (req, res) => {
    res.sendFile(resolve(__dirname, '../../www/bundle.js'));
  })
}

app.get('/', function(req, res) {
  res.sendFile(resolve(__dirname, '../../www/index.html'));
});

(async function() {
  await fsm.init();
  await storage.init(fsm);
}()).
  then(_ => {
    server.listen(port, host, _ => console.log(`server is listening on ${host}:${port}`));
  }).
  catch(err => console.log('INIT FAILED', err));

