const path = require('path');

module.exports = {
  entry: './client/cognito/cognito-auth.js',
  module: {
    loaders: [{
      loader: 'json-loader',
      test: /\.json$/
    }],
  },
  output: {
    filename: 'cognito.bundle.js',
    path: path.resolve(__dirname, './dist')
  }
};
