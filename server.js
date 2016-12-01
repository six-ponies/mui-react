/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const args = require('minimist')(process.argv.slice(2));
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
let config = require('./webpack.config');
new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.port, config.host, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`http://${config.host}:${config.port}`);
        console.log('Opening your system browser...');
        // open(`http://${host}:${config.port}/webpack-dev-server/`);
        open(`http://${config.host}:${config.port}/`);
    });