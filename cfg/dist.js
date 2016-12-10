'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


let config = Object.assign({}, baseConfig, {
  entry: {
    'mui-react': path.join(__dirname, '../src/components/index'),
  },
  cache: false,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: `.${defaultSettings.publicPath}`
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: defaultSettings.getDefaultModules()
});

config.module.loaders = [{
  test: /\.(js|jsx)$/,
  loader: 'babel-loader'
}, {
  test: /\.sass$/,
  loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded')
}, ];

module.exports = config;