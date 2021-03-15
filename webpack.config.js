const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');



const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin(),
		]
	}
	return config
}

const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: '',
			},
		},
		{
			loader: 'css-loader',
		},
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					plugins: [
						autoprefixer(
							{
								overrideBrowserslist: ['ie >= 8', 'last 4 version']
							}
						)
					],
				},
			},
		},
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash:8].${ext}`)


const plugins = () => {
	const base = [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: './index.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/favicon.ico'),
					to: path.resolve(__dirname, 'docs'),
				},
			]
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
	]

	return base
}


module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js']
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'docs')
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'inputmask': path.resolve(__dirname, './node_modules/inputmask/dist/jquery.inputmask'),
		},
		// fallback: {
		// 	"path": require.resolve("path-browserify"),
		// }
	},
	optimization: optimization(),
	devServer: {
		port: 3000,
		open: true,
		hot: isDev,
		watchContentBase: true,
	},
	plugins: plugins(),
	devtool: isDev ? 'source-map' : false,
	target: isProd ? 'browserslist' : 'web',
	module: {
		rules: [
			// Loading CSS
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			// Loading SCSS/SASS
			{
				test: /\.s[ac]ss$/i,
				use: cssLoaders('sass-loader')
			},
			// Loading images
			{
				test: /\.jpe?g$|\.gif$|\.png|\.ico|\.webp/,
				use: [{
					loader: 'file-loader',
					options: {
						esModule: false,
						outputPath: 'images',
						name: '[hash:8].[ext]'
					}
				},
				{
					loader: 'image-webpack-loader',
					options: {
						pngquant: {
							quality: [0.65, 0.90],
							speed: 4
						},
						mozjpeg: {
							progressive: true,
						},
					},
				},
				]
			},
			// Loading SVG sprite
			{
				test: /\.svg$/,
				use: [
					'svg-sprite-loader',
				]
			},
			// Loading fonts
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				use: ['file-loader']
			},
			// Babel JS
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},
		],
	},
}