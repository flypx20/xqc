const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	mode:'development',
	// entry:'./src/index.js',
	entry:{
		fzf:'./fzf1/index.js',
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'view'),
		filename:'[name].js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
				//style-loader必须在前面
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.(png|svg|jpg|jpeg|gif)$/,
				use:[
					'url-loader'
				]
			}
		]

	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./fzf/index.html',
			filename:'index.html',
			hash:true,
			inject:true
		}),
		new CleanWebpackPlugin(['view'])
	],
	devServer:{
		 contentBase:path.join(__dirname,'view'),
		 port:3000
	}
};