var path = require('path'),
	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},

	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: './src/index.html',
				to: './'
			}, {
				from: './src/js/main.js',
				to: './js'
			}, {
				from: './src/css/styles.css',
				to: './css'
			}, {
				from: './node_modules/jquery/dist/jquery.min.js',
				to: './jquery/dist'
			}, {
				from: './src/data/kana.json',
				to: './data'
			}, {
				from: './src/data/keybinding.json',
				to: './data'
			}
			]
		})
	]
};
