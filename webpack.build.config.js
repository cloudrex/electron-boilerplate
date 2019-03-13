const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Config directories
const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
	entry: SRC_DIR + "/index.tsx",

	output: {
		path: OUTPUT_DIR,
		publicPath: "./",
		filename: "bundle.js"
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			},
			{
				test: /\.css$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",

						options: {
							sourceMap: true,
							modules: true,
							localIdentName: "[local]__[hash:base64:5]"
						}
					}
				],

				include: defaultInclude
			},

			// Load typescript + typescript/react files
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: "babel-loader" }],
				include: defaultInclude
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
				include: defaultInclude
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [{ loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" }],
				include: defaultInclude
			},

			// Load sound files
			{
				test: /\.wav$|\.mp3$/,
				exclude: /node_modules/,
				use: [{loader: "file-loader?name=sound/[name]__[hash:base64:5].[ext]"}],
				include: defaultInclude
			}
		]
	},

	target: "electron-renderer",

	plugins: [
		new HtmlWebpackPlugin(),
		new MiniCssExtractPlugin(),

		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		
		new BabiliPlugin()
	],

	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},

	mode: "production"
};
