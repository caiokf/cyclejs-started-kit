var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var host = 'http://localhost';
var port = 8888;

module.exports = {
  port: port,
  host: host,
  config: {
    entry: [
      `webpack-dev-server/client?${host}:${port.toString()}`,
      'webpack/hot/dev-server',
      './src/'
    ],
    output: {
      filename: 'bundle.js',
      path: '/'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin()
    ]
  }
};
