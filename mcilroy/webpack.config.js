const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/pages/app.js',
    login: './client/pages/login.js',
    register: './client/pages/register.js',
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
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      chunks: ['app'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'login',
      chunks: ['login'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'register',
      chunks: ['register']
    })
  ]
};
