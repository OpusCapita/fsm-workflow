const { resolve } = require('path');

module.exports = {
  context: resolve(__dirname, '../src'),
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ["env", {
              "targets": {
                "browsers": ["last 2 versions", "ie >= 11", "safari >= 7", "Firefox ESR"]
              }
            }],
            "react"
          ],
          plugins: [
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-object-rest-spread"
          ]
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'less-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader', options: {
              plugins: (loader) => [
                require('autoprefixer')()
              ]
            }
          }
        ]
      }
    ]
  }
};
