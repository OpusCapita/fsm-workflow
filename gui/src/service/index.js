'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3020;
const paths = {
  machines: path.resolve(__dirname, './db/machines'),
  domainObjects: path.resolve(__dirname, './db/domain-objects')
};

app.use(compression());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Routes

app.get('/machines', function(req, res) {
  getMachines(req, res, paths.machines);
});

app.get('/machines/:id', function(req, res) {
  getMachine(req, res, paths.machines, req.params.id);
});

// app.get('/domain-objects', function(req, res) {
//   getDomainObjects(req, res, paths.machines, req.params.id);
// });

// app.get('/domain-objects/:id', function(req, res) {
//   getDomainObject(req, res, paths.machines, req.params.id);
// });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});

// Handlers

function getMachines(req, res, itemsPath) {
  fs.readdir(itemsPath, (err, files) => {
    if(err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
    return res.send(
      files
        .filter(file => file.match(/^.*\.json$/))
        .map(file => file.replace(/\.json$/, ''))
    );
  });
}

function getMachine(req, res, itemsPath, itemId) {
  const itemPath = path.resolve(`${itemsPath}/${itemId}.json`);
  fs.readFile(itemPath, { encoding: 'utf-8' }, (err, data) => {
    if(err) {
      return res.status(500).send({ error: 'Internal server error' });
    }
    return res.send(JSON.parse(data));
  });
}
