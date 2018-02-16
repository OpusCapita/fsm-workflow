import fs from 'fs';
import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import timeout from 'connect-timeout';
import jsfaker from 'json-schema-faker';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackConfig from './webpack.config';
import bundleRoute from './bundleRoute';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const app = express();
const server = Server(app);

app.use(timeout(120000));
app.use(bundleRoute)

// const compiler = webpack(webpackConfig);
// app.get(webpackDevMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath
// }));

app.get('*', function(req, res){
  res.sendFile(resolve(__dirname, '../../www/index.html'));
});

// read schema, generate objects

// server state keeper
// - schema
// - businessObjects
const keepster = {};

fs.readFile(resolve(__dirname, './data/workflow-schema.json'), 'utf8', (err, data) => {
  if (err) {
    throw err
  };

  try {
    keepster.schema = JSON.parse(data);
  } catch (err) {
    throw err
  }

  // generate objects
  const numberOfObjects = 10;
  keepster.businessObjects = [];
  for (let i = 0; i < numberOfObjects; i++) {
    const config = keepster.schema.objectConfiguration;
    const object = jsfaker(config.schema);
    keepster.businessObjects.push(object);
  }

  server.listen(port, host, function(){
    console.log(`server is listening on ${host}:${port}`);
  });
});
