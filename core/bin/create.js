const core = require('../index')
const utils = require('../utils')
const join = utils.join
const root = core.MyRootPath
const pathsList = {
  bin: join(root, 'bin'),
  core: join(root, 'core'),
  types: join(root, 'types'),
  ui: join(root, 'ui'),
  web: join(root, 'web'),
  LICENSE: join(root, 'LICENSE'),
  'package.json': join(root, 'package.json'),
  'README.md': join(root, 'README.md')
}

const localPath = join(core.ProjectRootPath, '.my', '@xdh', 'my')

module.exports = function(args = []) {
  utils.mkdir(localPath)
  const allCopy = Object.entries(pathsList).map((entry) => {
    return utils.copy(entry[1], join(localPath, entry[0])).then((res) => {
      utils.log(`复制${entry[0]}成功`, 'success')
      return Promise.resolve()
    }) 
  })
  Promise.all(allCopy).then(() => {
    utils.log('创建完成', 'success')
  })
  
}