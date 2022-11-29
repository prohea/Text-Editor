const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
	return {
		mode: "development",
		//Entry point for files
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
			database: "./src/js/database.js",
			editor: "./src/js/editor.js",
			header: "./src/js/header.js",
		},
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
		},
		plugins: [
			//Webpack plugin that generates html file and inject our bundles
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "TEXT",
			}),
			//Injects our custom service worker
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),
			//Creates a manifest.json file
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: "Text Editor",
				short_name: "TEXT",
				description: "Text Editor",
				background_color: "#0A090C",
				theme_color: "#0A090C",
				start_url: "/",
				publicPath: "/",
				icons: [
					{
						src: path.resolve("src/images/logo-te.gif"),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join("assets", "icons"),
					},
				],
			}),
		],

		module: {
			//CSS Loaders
			rules: [
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					//Use babel-loader in order to use ES6
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/present-env"],
							plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
							],
						},
					},
				},
			],
		},
	};
};
