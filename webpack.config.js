const path = require('path');

module.exports = {
  entry: './netlify/edge-functions/rateLimiter.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rateLimiter.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'firebase-admin': 'commonjs firebase-admin'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  mode: 'production'
};
