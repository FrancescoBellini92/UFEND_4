const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');
const { MODE, PORT } = require('./src/server/environment');
module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html'
    }),
    new CleanWebpackPlugin({
      // dry: true
    }),
    new Webpack.DefinePlugin({
      'process.env.APIURL': JSON.stringify(`http://localhost:${PORT}/sentiment-analysis`),
      'process.env.MODE': JSON.stringify(MODE)
    })
  ]
};
