module.exports = function (args = []) {
  const app = require('../build/app')
  const utils = require('../utils')
  const [action, appName, port] = args
  
  switch (action) {
    case 'add':
      if (!appName) {
        utils.log('需要指定应用名称', 'warning')
        return false
      }
      app.add(appName, parseInt(port || 8001))
      break;
    case 'remove':
      if (!appName) {
        utils.log('需要指定应用名称', 'warning')
        return false
      }
      app.remove(appName)
      break;
    case 'build':
      app.build()
      break;
    default:
      utils.log('缺少操作名称', 'warning')
      break;
  }
  
}
