const utils = require('../utils')
const core = require('../../core/index')
const createHttpServer = require('./http')
const config = require('../../core/config')()
createHttpServer({
  port: config.serverPort,
  root: utils.join(core.MyRootPath, 'web')
})
