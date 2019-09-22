const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('webpack-nano/argv')

const DIST_DIR = 'dist'
const devDevTool = 'source-map' // see https://webpack.js.org/configuration/devtool/ for options
const prodDevTool = false

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
  }),
]

const { mode = 'production' } = argv

const isProd = mode === 'production'

module.exports = {
  entry: './src/main.js',
  mode,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, DIST_DIR),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [isProd ? MiniCSSExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
    ],
  },
  plugins: plugins,
  devtool: isProd ? prodDevTool : devDevTool,
  resolve: {
    symlinks: false,
  },
}
