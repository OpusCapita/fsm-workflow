import fs from 'fs';
import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import timeout from 'connect-timeout';
import bodyParser from 'body-parser';
import bundleRoute from './routes/bundle';
import objectRoutes from './routes/objects';
import sendEventRoute from './routes/sendEvent';
import transitionsRoute from './routes/availableTransitions';
import editorDataRoute from './routes/editorData';
import statesRoute from './routes/states';
import storage from './storage';
import { generateObjects } from './utils';
import { objectIdProp } from '../common';
import createMachine from './createMachine';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const app = express();
const server = Server(app);
app.use(timeout(120000));
app.use(bodyParser.json())
app.use(bundleRoute)
app.use(objectRoutes)
app.use(sendEventRoute)
app.use(transitionsRoute)
app.use(editorDataRoute)
app.use(statesRoute)

app.get('*', function(req, res) {
  res.sendFile(resolve(__dirname, '../../www/index.html'));
});

storage.init().then(_ => console.log('INIT SUCCESS')).catch(err => console.log('INIT FAILED', err))

// read schema, generate objects
fs.readFile(resolve(__dirname, './data/workflow-schema.json'), 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  let schema;
  try {
    schema = JSON.parse(data)
  } catch (err) {
    throw err
  }

  const machine = createMachine({ schema });

  const businessObjects = generateObjects({ schema, objectIdProp })
  businessObjects.forEach(object => machine.start({ object }))

  storage.set({
    schema,
    machine,
    businessObjects,
    objectIdProp
  })

  server.listen(port, host, _ => console.log(`server is listening on ${host}:${port}`));
});
