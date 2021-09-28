const path = require('path');

module.exports = {

	mode: process.env.NODE_ENV,

	entry: './js/index.js',

	output: {
		filename: 'index.js',
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						shouldPrintComment: () => false,
					}
				}
			}
		],
	},
};