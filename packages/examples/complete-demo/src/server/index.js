import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import bundleRoute from './routes/bundle';

// const { resolve } = require('path');
// const app = require('express')();
// const http = require('http').Server(app);
// const bundleRoute = require('./routes/bundle');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const app = express();
const server = Server(app);

app.use(bundleRoute);

app.get('*', function(req, res){
  res.sendFile(resolve(__dirname, '../client/index.html'));
});

server.listen(port, host, function(){
  console.log(`server is listening on ${host}:${port}`);
});