'use strict';
const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  context: path.resolve(__dirname),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../lib'),
    filename: `index.js`,
    library: 'fsm-task-manager',
    libraryTarget: 'umd'
  },
  devtool: IS_PRODUCTION ? false : 'inline-source-map',
  watch: IS_PRODUCTION ? false : true,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${NODE_ENV}"`
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js']
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0']
          }
        }],
        include: [
          path.resolve(__dirname, '../src')
        ]
      }
    ]
  }
};
