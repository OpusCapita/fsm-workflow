const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPlugin({
      template: '../www/index.html',
    }),
    new webpack.NamedModulesPlugin()
  ],
  entry: [
    '../www/index-page.js'
  ],
  devServer: {
    historyApiFallback: true,
    inline: false
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
});
