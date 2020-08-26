const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const port = 7011;

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.[hash].js"
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
				loader: "file-loader"
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv({
			path: path.resolve(__dirname, "./.env")
		})
	],
	devServer: {
		host: "localhost",
		port: port,
		historyApiFallback: true,
		open: true,
		hot: true
	}
};
