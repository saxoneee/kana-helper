var path = require('path'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin');
	CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		open: false,
		contentBase: [
			path.join(__dirname, 'src'),
			path.join(__dirname, 'node_modules'),
		],
		port: 8000,
	},

	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: './src/index.html',
				to: './'
			},{
				from: './src/js/main.js',
				to: './js'
			},{
				from: './src/css/styles.css',
				to: './css'
			},{
				from: './node_modules/jquery/dist/jquery.min.js',
				to: './jquery/dist'
			},{
				from: './src/data/*.json',
				to: './data'
			}
		]
		})
	]
};
