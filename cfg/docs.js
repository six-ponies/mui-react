'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let pkg = require('../package.json');

// Add needed plugins here
// let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = Object.assign({}, baseConfig, {
  entry: [
    `webpack-dev-server/client?http://${defaultSettings.host}:${defaultSettings.port}`,
    'webpack/hot/only-dev-server',
    './docs/index'
  ],
  output: {
    path: path.join(__dirname, '/../docs/assets'),
    filename: 'app.js',
    publicPath: `${defaultSettings.publicPath}`
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: path.join(__dirname, '../docs/template.html')
    // }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkg.version)
    })
  ],
  devServer: {
    contentBase: './docs/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      src: `${defaultSettings.srcPath}`,
    }
  },
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.html&/,
  loader: 'html'
}, {
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths, [path.join(__dirname, '/../src')], [path.join(__dirname, '/../docs')]
  )
}, {
  test: /\.sass$/,
  loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded')
});

module.exports = config;