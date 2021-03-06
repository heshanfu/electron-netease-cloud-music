/**
 * This file is used specifically and only for development. It enables the use of ES6+
 * features for the main process and installs `electron-debug` & `vue-devtools`. There
 * shouldn't be any need to modify this file, but it can be used to extend your
 * development environment.
 */

/* eslint-disable no-console */

// Set debug `env`
process.env.DEBUG = 'MusicServer,API,MPRIS,MPRIS:IPC';
process.env.DEBUG_COLORS = true;

// Set babel `env` and install `babel-register`
process.env.NODE_ENV = 'development';
require('babel-register')({
    babelrc: false,
    only: /src\/main\//,
    plugins: [
        'syntax-object-rest-spread',
        'transform-es2015-modules-commonjs'
    ]
});

// Install `vue-devtools`
const EDI = require('electron-devtools-installer');
const install = EDI.default;
const vueDevTool = EDI.VUEJS_DEVTOOLS.id;

require('electron').app.on('ready', () => {
    install(vueDevTool).catch(console.log);
});

// Require `main` process to boot app
require('./index');
