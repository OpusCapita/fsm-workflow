const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new CopyWebpackPlugin([
    path.resolve(__dirname, '../src/demo/index.html')
  ])
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin())
}

const config = {
  context: path.resolve(__dirname, '../'),
  plugins,
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../build')
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

module.exports = config;
