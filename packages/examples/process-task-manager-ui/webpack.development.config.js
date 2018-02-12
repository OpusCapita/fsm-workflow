const path = require('path');
const webpack = require('webpack');
const packageVersion = require('./package.json').version;
const fs = require('fs');

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.js'),
  context: path.resolve(__dirname),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './lib'),
    filename: `index.js`,
    library: 'demopage',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader', '*'],
    extensions: ['.js']
  },

  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
    extensions: ['.json', '.js']
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'www'),
          fs.realpathSync(path.join(__dirname, './node_modules/@opuscapita/fsm-workflow-core')),
          fs.realpathSync(path.join(__dirname, './node_modules/@opuscapita/fsm-workflow-task-manager'))
        ],
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
};
