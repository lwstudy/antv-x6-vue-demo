/**
 * 工程开发环境webpack配置
 *
 * @author chenhuachun
 */
const utils = require('../utils')
const config = require('../config')()
const core = require('../index')
const devThemeSwitch = require('../build/dev-theme-switch')
// const routesBuilder = require('../build/routes')

module.exports = function (chain, theme) {

  // 扩展静态目录
  const contentBase = (config.extendContentBase || []).map(dir => utils.resolve(dir))

  // 监听文件views文件编号，生成路由配置
  // routesBuilder.watch(
  //   core.ViewsPath,
  //   core.OutputRoutesFile,
  //   !config.autoRoutes
  // )


  // 扩展静态文件服务目录
  chain.devServer.contentBase([
    utils.join(core.ProjectRootPath, 'public'),
    core.TempPath,
    ...contentBase
  ])

  // 在线更换主题服务接口
  chain.devServer.setup(server => {
    server.get(core.DevThemeSwitchServiceApi, function (req, res) {
      const theme = req.query.theme
      let code = -1
      let data = null
      if (theme) {
        data = devThemeSwitch(theme)
        code = 0
      }
      res.json({
        code: code,
        data
      })
    })
  })
}


