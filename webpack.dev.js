// enrich webpack cfg for development

var path = require('path'),
    webpackBuildCfg = require('./webpack.build.js');

webpackBuildCfg.output = {
    path: path.resolve(__dirname, 'tmp'), // TODO, not existing folder, but may cause trouble some time
};

module.exports = webpackBuildCfg;
