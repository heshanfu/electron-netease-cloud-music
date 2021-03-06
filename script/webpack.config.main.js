'use strict';

const webpack = require('webpack');
const packageJson = require('../package.json');

const { isProd, absPath } = require('./util');

let cfg = {
    mode: process.env.NODE_ENV || 'development',
    performance: { hints: false },
    context: absPath('src/main'),
    target: 'electron-main',
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: absPath('dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        plugins: [
                            'syntax-object-rest-spread',
                            'transform-es2015-modules-commonjs'
                        ]
                    },
                },
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: 'native-ext-loader'
            }
        ]
    },
    plugins: [],
    node: {
        __dirname: false,
        __filename: false
    }
};

if (isProd) {
    // release config
    cfg.devtool = 'source-map';
    cfg.plugins.push(
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"production"` })
    );
} else {
    // dev config
    cfg.devtool = 'cheap-module-source-map';
    cfg.externals = Object.keys(packageJson.dependencies);
    cfg.resolve = {
        modules: [
            absPath('node_modules')
        ]
    };
}

module.exports = cfg;
