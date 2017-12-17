const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const pages = require('./pages').default

const IS_DEV = process.env.NODE_ENV === 'dev'
const dirNode = 'node_modules'
const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')

const cssFilename = '[name]/[contenthash:8].css'

const extractTextPluginOptions = {
  publicPath: Array(cssFilename.split('/').length).join('../')
}

const cssLoader = [
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      minimize: true,
      sourceMap: true
    }
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      sourceMap: IS_DEV,
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          flexbox: 'no-2009'
        })
      ]
    }
  }
]

const styleLoader = ExtractTextPlugin.extract(
  Object.assign(
    {
      fallback: {
        loader: require.resolve('style-loader'),
        options: {
          hmr: false
        }
      },
      use: cssLoader
    },
    extractTextPluginOptions
  )
)

const styleLoaderWithSass = ExtractTextPlugin.extract(
  Object.assign(
    {
      fallback: {
        loader: require.resolve('style-loader'),
        options: {
          hmr: false
        }
      },
      use: cssLoader.concat([
        {
          loader: 'sass-loader',
          options: {
            sourceMap: IS_DEV,
            includePaths: [dirAssets]
          }
        }
      ])
    },
    extractTextPluginOptions
  )
)

const HtmlWebpackPlugins = pages.map(
  ({ filename, template, chunks }) =>
    new HtmlWebpackPlugin({
      chunks,
      filename,
      template: path.join(__dirname, template),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
)

const plugins = [
  new webpack.DefinePlugin({
    IS_DEV: IS_DEV
  }),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      comparisons: false
    },
    mangle: {
      safari10: true
    },
    output: {
      comments: false,
      ascii_only: true
    },
    sourceMap: true
  })
].concat(HtmlWebpackPlugins)

const chunks = pages.map(page => page.chunks[0]).reduce((acc, currentChunkName) => {
  acc[currentChunkName] = path.join(dirApp, currentChunkName)
  return acc
}, {})

module.exports = {
  entry: chunks,

  resolve: {
    modules: [dirNode, dirApp, dirAssets]
  },

  plugins: plugins,

  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      // STYLES
      {
        test: /\.css$/,
        loader: styleLoader
      },

      // CSS / SASS
      {
        test: /\.scss/,
        loader: styleLoaderWithSass
      },

      // EJS
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]'
        }
      }
    ]
  }
}
