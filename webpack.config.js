const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './netlify/edge-functions/rateLimiter.js',
  target: 'webworker', // Ensures the build is compatible with Edge Functions environment
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rateLimiter.js',
    library: {
      type: 'module'
    },
    chunkFormat: 'module' // Ensure module chunk format
  },
  experiments: {
    outputModule: true, // Enable output as an ES module
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify")
    },
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
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
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'node-fetch' // Ensure fetch is available
    }),
  ],
  mode: 'production'
};
