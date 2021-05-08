const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  // ...
  target: 'node12.18'
};

const config = {
  // set to false because __dirname resolving to / instead of absolute path when
  // built using webpack
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  // set to development to read .env.local variables
  mode: 'development'
};

const serverConfig = Object.assign({}, config, {
  // set target to node to fix build warnings
  target: 'node',
  name: 'server',
  entry: __dirname + '/src/index.js',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'index.js'
  },
  // webpack-node-externals package used to exclude other packages like express
  // in the final bundle.js
  externals: [nodeExternals()]
});

// widget.js file served from dist/widget
const widgetConfig = Object.assign({}, config, {
  // set target to web for use in browsers
  target: 'web',
  name: 'widget',
  entry: __dirname + '/widget/index.js',
  output: {
    path: path.resolve(__dirname + '/dist/widget/js'),
    filename: 'widget.js'
  }
});

module.exports = [widgetConfig, serverConfig];