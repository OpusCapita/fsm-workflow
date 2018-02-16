const { resolve } = require('path');
// const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const nodeExternals = require('webpack-node-externals');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  entry: [
    '../src/index.js'
  ],
  output: {
    path: resolve(__dirname, '../lib'),
    filename: 'index.js',
    library: `fsm-workflow-editor`,
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  // externals: [
  //   nodeExternals({
  //     modulesFromFile: true
  //   }),
  // ]
});
