'use strict';
const path = require('path');
const webpack = require('webpack');
const packageVersion = require('./package.json').version;

module.exports = {
  entry: path.resolve(__dirname, './www/index-page.js'),
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
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
    extensions: ['.json', '.js']
  },
  module: {
    rules: [
      {
        test   : /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use : ['file-loader']
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: `[name]__[local]__${packageVersion}_[hash:base64:3]`,
              modules: true
            }
          },
          { loader: 'less-loader', options: { sourceMap: true } }
        ],
        include: /\.module\.(css|less)$/
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader', options: { sourceMap: true } }
        ],
        exclude: /\.module\.(css|less)$/
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'www'),
          path.join(__dirname, '../../fsm-library'),
          path.join(__dirname, '../../fsm-task-manager'),
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        }
      }
    ]
  }
};

