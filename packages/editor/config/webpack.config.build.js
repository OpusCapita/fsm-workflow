const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: false
  },
  entry: [
    '../src/index.js'
  ],
  output: {
    path: resolve(__dirname, '../lib'),
    filename: 'index.js',
    library: `fsm-workflow-editor`,
    libraryTarget: 'umd'
  },
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ]
});
