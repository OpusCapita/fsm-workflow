'use strict';

const express = require('express');
const fs = require('fs');
const port = 3000;
const host = 'localhost'
const path = require('path');
const webpack = require('webpack');
const compiler = webpack(require('../../webpack.development.config'));

const app = express();

let serverOptions = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: { colors: true },
  noInfo: true
};

app.use(require('webpack-dev-middleware')(compiler, serverOptions));

app.use(require('serve-favicon')(path.join(__dirname, '../client/static/favicon.ico')));

app.use(express.static(path.join(__dirname, '../client/static')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
