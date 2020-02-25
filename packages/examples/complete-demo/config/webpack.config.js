const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin())
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  plugins,
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    library: 'fsmCompleteDemo',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../build'),
    host: process.env.HOST || 'localhost'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src/client'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              require('babel-plugin-transform-class-properties'),
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-decorators-legacy').default
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: ['file-loader']
      },
      {
        test: /\.(svg)(\?[a-z0-9=&.]+)?$/,
        use: ['raw-loader']
      },
    ]
  }
}
