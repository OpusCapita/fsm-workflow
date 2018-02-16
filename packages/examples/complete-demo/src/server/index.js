import { resolve } from 'path';
import express from 'express';
import { Server } from 'http';
import timeout from 'connect-timeout';
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
  res.sendFile(resolve(__dirname, '../client/index.html'));
});

server.listen(port, host, function(){
  console.log(`server is listening on ${host}:${port}`);
});