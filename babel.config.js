// 需要在项目根目录放置 babel.config.js
// 通过修改webpack配置制定configFile路径，发现打包主题有缓存，结果全部都是第一次编译的主题，在根目录放置配置文件即正常
module.exports = require('./core/babel.config')
