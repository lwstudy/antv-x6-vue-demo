const utils = require('../utils')
const core = require('../index')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    bridge: core.BridgeEntry
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: utils.join(core.ProjectRootPath, 'public/assets/bridge'),
    publicPath: '',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  resolve: {
    alias: {
      $ui: core.LibPath
    }
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Message Bridge'
    })
  ]
}
