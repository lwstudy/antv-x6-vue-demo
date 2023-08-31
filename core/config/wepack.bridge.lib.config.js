const utils = require('../utils')
const core = require('../index')

module.exports = {
  mode: 'production',
  entry: core.BridgeLibEnter,
  output: {
    filename: 'index.js',
    path: utils.join(core.ProjectRootPath, 'public/assets/bridge/lib'),
    publicPath: '',
    libraryTarget: 'umd',
    chunkFilename: 'index.js',
    library: 'MyBridge'
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
  }
}
