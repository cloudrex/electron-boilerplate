const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {spawn} = require("child_process");
const {CheckerPlugin} = require("awesome-typescript-loader");
const node = require("./node_modules/pca")

// Config directories
const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
	entry: SRC_DIR + "/index.tsx",

	output: {
		path: OUTPUT_DIR,
		publicPath: "/",
		filename: "bundle.js"
	},

	module: {
		rules: [
			// Load SCSS files.
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "sass-loader" // compiles Sass to CSS
					}
				]
			},

			// Load CSS files.
			{
				test: /\.css$/,

				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				],

				include: defaultInclude
			},

			// Load TypeScript + TypeScript/React files.
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},

			// Load JavaScript + JavaScript/React files.
			{
				test: /\.jsx?$/,
				use: [{loader: "babel-loader"}],
				include: defaultInclude
			},

			// Load images.
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]"}],
				include: defaultInclude
			},

			// Load fonts.
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [{loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]"}],
				include: defaultInclude
			},

			// Load sound files.
			{
				test: /\.wav$|\.mp3$/,
				exclude: /node_modules/,
				use: [{loader: "file-loader?name=sound/[name]__[hash:base64:5].[ext]"}],
				include: defaultInclude
			},

			// Load '.node' files.
			{
				test: /\.node$/,
				loader: "node-loader"
			}
		]
	},

	target: "electron-renderer",

	plugins: [
		new HtmlWebpackPlugin({
			title: "XMS"
		}),

		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),

		new CheckerPlugin()
	],

	devtool: "cheap-source-map",

	devServer: {
		contentBase: OUTPUT_DIR,

		stats: {
			colors: true,
			chunks: false,
			children: false
		},

		before() {
			spawn("electron", ["."], {
				shell: true, env: process.env, stdio: "inherit"
			}).on("close", code => process.exit(code)).on("error", spawnError => console.error(spawnError));
		}
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},

	mode: "development"
};
