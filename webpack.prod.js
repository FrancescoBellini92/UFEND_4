const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const Webpack = require('webpack');
const { MODE } = require('./src/server/environment');

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  optimization: {
    // terser minifies js, opmtimizeCss minifies css
    minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader' // transpile everything to es5
      },
      {
        test: /\.scss$/,
        // mini will extract css into a single file
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/html/index.html'
    }),
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({}),
    new Webpack.DefinePlugin({
      'process.env.APIURL': JSON.stringify('/sentiment-analysis'),
      'process.env.MODE': JSON.stringify(MODE)
    })
  ]
};
