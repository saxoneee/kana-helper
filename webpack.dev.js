// enrich webpack cfg for development

var path = require('path'),
    webpackBuildCfg = require('./webpack.build.js');

webpackBuildCfg.output = {
    path: path.resolve(__dirname, 'tmp'), // TODO, not existing folder, but may cause trouble some time
};

webpackBuildCfg.devServer = {
    open: false,
    contentBase: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules'),
    ],
    port: 8000,
    host: '0.0.0.0' // use this with your local ip-address for debugging on mobile
};

module.exports = webpackBuildCfg;
