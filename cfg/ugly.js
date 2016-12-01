'use strict';

let distBaseConfig = require('./dist.js');
let config = Object.assign({}, distBaseConfig);
let ExtractTextPlugin = require('extract-text-webpack-plugin');
config.output.filename = '[name].min.js';
config.plugins.push(new ExtractTextPlugin('[name].min.css'));

module.exports = config;