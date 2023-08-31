module.exports = function () {
  const config = require('../config')();
  const core = require('../index')
  const utils = require('../utils')
  const createHttpServer = require('../server/http')
  
  createHttpServer({
    port: config.previewServerPort,
    root: utils.join(core.ProjectRootPath, config.outputDir),
    path: config.publicPath,
    routes: [],
    open: true
  })
  
}
