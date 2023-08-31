module.exports = function (args = []) {
  const core = require('../index')
  const utils = require('../utils')
  const config = require('../config')()
  const packageJson = core.IsInstalled ? require('../../../../../package.json') : require('../../package.json')
  
  const [routeAction, routeApp] = args
  const routesBuilder = require('../build/routes')
  let viewPath = ''
  let outFile = ''
  let autoRoutes = true
  if (routeApp) {
    const apps = packageJson.apps || {}
    const app = apps[routeApp]
    if (app) {
      viewPath = utils.join(core.AppsPath, routeApp, 'views')
      outFile = utils.join(core.TempPath, 'routes', `${routeApp}.js`)
      autoRoutes = app.autoRoutes
    } else {
      utils.log(`应用${routeApp}不存在`)
    }
  } else {
    viewPath = core.ViewsPath
    outFile = core.OutputRoutesFile
    autoRoutes = config.autoRoutes
  }
  
  if (routeAction === 'watch') {
    routesBuilder.watch(
      viewPath,
      outFile,
      !autoRoutes
    )
  }
  
  if (routeAction === 'build') {
    routesBuilder.build(
      viewPath,
      outFile,
      !autoRoutes
    )
  }
}
