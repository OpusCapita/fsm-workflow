import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../config/webpack.config';
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
import objectConfig from './objectConfig';
import { generateObjects } from './utils';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3020;

const app = express();
const server = Server(app);

app.use(bodyParser.json());
app.use(morgan('tiny', { immediate: true }));

app.use(objectRoutes);
app.use(sendEventRoute);
app.use(transitionsRoute);
app.use(editorDataRoute);
app.use(statesRoute);
app.use(historyRoute);

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
} else {
  app.get('/bundle.js', (req, res) => {
    res.sendFile(resolve(__dirname, '../../build/bundle.js'));
  })
}

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Workflow Demo App</title>
  <link rel="stylesheet" href="https://opuscapita.github.io/styles/index.css">
</head>

<body style="padding-bottom: 0; overflow-x: hidden;">
  <div id="main"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.2/react.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/15.6.2/react-dom.js" type="text/javascript"></script>
  <script src="${process.env.BASE_URL || ''}/bundle.js" type="text/javascript"></script>

  <script>
    ${webpackConfig.output.library}.render(
      document.getElementById("main"),
      { baseUrl: "${process.env.BASE_URL || '/'}" }
    )
  </script>
</body>
</html>`
  );
});

// initialize data and start server

(async function() {
  await schema.init();
  await objectConfig.init();
  await storage.init();
  await fsm.init(storage.sequelize);

  // generate invoices based on schema
  const objectConfiguration = objectConfig.getConfig();
  const invoices = generateObjects({ objectConfiguration })
  const { machine } = fsm;
  return Promise.all(invoices.map(invoice => {
    machine.start({ object: invoice, user: 'demouser' });
    return storage.addObject(invoice)
  }))
}()).
  then(_ => {
    server.listen(port, host, _ => console.log(`Server is listening on http://${host}:${port}`));
  }).
  catch(err => console.log('INIT FAILED', err));

