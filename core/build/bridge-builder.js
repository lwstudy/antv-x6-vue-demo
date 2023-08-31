const webpack = require('webpack')
const utils = require('../utils')
const config = require('../config/webpack.bridge.config')
const libConfig = require('../config/wepack.bridge.lib.config')

utils.rm(config.output.path)
utils.log('正在执行编译bridge ...')
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    utils.log(stats, 'error')
  } else {
    // 打包类库
    webpack(libConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        utils.log(stats, 'error')
      } else {
        utils.log('>>> bridge 编译完成', 'success')
      }
    })
  }
})
