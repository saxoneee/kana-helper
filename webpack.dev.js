var path = require('path');

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
};
