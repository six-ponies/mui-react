'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let pkg = require('../package.json');
// Add needed plugins here

let config = Object.assign({}, baseConfig, {
  entry: {
    'bundle': path.join(__dirname, '../docs/index')
  },
  cache: false,
  devtool: 'sourcemap',
  output: {
    path: path.join(__dirname, '../docs-built/assets'),
    filename: '[name].[chunkhash].min.js',
    publicPath: `.${defaultSettings.publicPath}`
  },
  devServer: {
    contentBase: './docs-built/',
    historyApiFallback: true,
    hot: false,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__VERSION__': JSON.stringify(pkg.version)
    }),

    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.join(__dirname, '../docs/template.html')
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      src: `${defaultSettings.srcPath}`,
    }
  },
  module: defaultSettings.getDefaultModules()
});
config.module.loaders.push([{
  test: /\.html$/,
  loader: 'html'
}, {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader'
}, {
  test: /\.sass/,
  loader: ExtractTextPlugin.extract('style', 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax')
}, {
  test: /\.scss/,
  loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded')
}]);
module.exports = config;