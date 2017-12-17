const webpackConfig = require('./webpack.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssFilename = '[name].[contenthash:8].css'

module.exports = Object.assign(webpackConfig, {
  devtool: 'eval-source-map',

  plugins: webpackConfig.plugins.concat([
    new ExtractTextPlugin({
      filename: cssFilename
    })
  ]),

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  }
})
