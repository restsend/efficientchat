const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        noInfo: false,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100,
        }
    },
});