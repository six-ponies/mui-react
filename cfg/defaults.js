'use strict';
const ip = require('ip');
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const docsPath = path.join(__dirname, '/../docs');
const host = ip.address();
const dfltPort = 8000;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDefaultModules() {
  return {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!postcss-loader!less-loader'
    }, {
      test: /\.styl/,
      loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
    }, {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(mp4|ogg|svg)$/,
      loader: 'file-loader'
    }]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  host: `${host}`,
  port: dfltPort,
  getDefaultModules: getDefaultModules,
};