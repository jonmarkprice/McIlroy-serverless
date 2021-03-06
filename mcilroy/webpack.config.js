const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    login: './client/pages/login.js',
    register: './client/pages/register.js',
    api: './client/pages/api.js',
    app: './client/pages/app.js'
  },
  module: {
    loaders: [
      {
        // Include common *and* client but not server
        include: [
          path.resolve(__dirname, './common'),
          path.resolve(__dirname, './client'),
        ],
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'login',
      chunks: ['login'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'register',
      chunks: ['register']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'api',
      chunks: ['api']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      chunks: ['app']
    })      
  ]
};
