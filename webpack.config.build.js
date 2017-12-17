const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackConfig = require('./webpack.config')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssFilename = '[name]/[contenthash:8].css'

module.exports = Object.assign(webpackConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/[chunkhash].js'
  },

  plugins: webpackConfig.plugins.concat([
    new ExtractTextPlugin({
      filename: cssFilename
    }),

    new CleanWebpackPlugin(['dist']),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css|jpg|png)$/,
      threshold: 3072, //in bytes (3kb ~ 2 packets)
      minRatio: 0.8
    })
  ])
})
