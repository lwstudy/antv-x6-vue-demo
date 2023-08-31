const fs = require('fs')
const process = require('child_process')
const utils = require('../utils')
const core = require('../index')
const packageJSON = core.IsInstalled ? require('../../../../../package.json') : require('../../package.json')

const packageFile = utils.join(core.ProjectRootPath, 'package.json')
const appsDir = core.AppsPath
const appsConfigJSON = packageJSON.apps || {}

/**
 * 验证要创建的应用名称是否合法
 * @param name
 * @return {boolean}
 */
function validate(name) {
  if (core.AppReservedWords.includes(name)) {
    utils.log(`>>> ${name} 是保留关键字，请更换其他名称再试！`, 'warning')
    return false
  }
  if (fs.existsSync(appsDir)) {
    const dirs = fs.readdirSync(appsDir)
    if (dirs.includes(name)) {
      utils.log(`>>> 站点名称 ${name} 已被使用 ，请更换其他名称再试！`, 'warning')
      return false
    }
  }
  return true
}

/**
 * 写入package.json命令
 * @param name
 */
function insertCommander(name) {
  const dev = `npm run ready && cross-env APP=${name} concurrently "npm run serve -- --open" "npm run route watch ${name}"`
  const build = `npm run ready && npm run route build ${name} && npm run theme prod ${name} && cross-env APP=${name} npm run build`
  packageJSON.scripts[`dev:${name}`] = dev
  packageJSON.scripts[`build:${name}`] = build
  utils.writeFile(
    packageFile,
    JSON.stringify(packageJSON, null, 2)
  )
}

/**
 * 删除package.json命令
 * @param name
 */
function removeCommander(name) {
  delete packageJSON.scripts[`dev:${name}`]
  delete packageJSON.scripts[`build:${name}`]
  utils.writeFile(
    packageFile,
    JSON.stringify(packageJSON, null, 2)
  )
}

/**
 * 写入配置
 * @param name
 * @param port
 */
function writeConfig(name, port) {
  appsConfigJSON[name] = {
    name: name,
    port: port,
    autoRoutes: true,
    // 默认自动
    publicPath: null,
    // 默认自动
    outputDir: null,
    // 是否采用独立的静态配置文件，false表示取主应用的配置
    staticConfig: false,
    // 开启模拟数据
    mock: false,
    contentBase: []
  }

  packageJSON.apps = appsConfigJSON

  utils.writeFile(
    packageFile,
    JSON.stringify(packageJSON, null, 2)
  )
}

/**
 * 把应用名称写入到配置文件
 * @param to
 * @param name
 */
function injectAppName(to, name) {
  const file = utils.join(to, 'config.js')
  let content = fs.readFileSync(file, 'utf-8')
  if (content) {
    content = content.replace(/{{appName}}/gi, name)
  }
  utils.writeFile(
    file,
    content
  )
}

/**
 * 清除配置文件
 * @param name
 */
function clearConfig(name) {
  delete appsConfigJSON[name]
  packageJSON.apps = appsConfigJSON

  const content = JSON.stringify(packageJSON, null, 2)
  utils.writeFile(packageFile, content)
}

/**
 * 新增应用
 * @param name 应用名称
 * @param port 开发环境端口号
 */
function add(name, port) {
  if (!validate(name)) return

  // 写入配置文件
  writeConfig(name, port)

  const from = core.AppTemplatePath
  const to = utils.join(core.AppsPath, name)

  // 复制app模板到 apps目录
  utils.copy(from, to).then(() => {
    // 注入应用名称到配置文件
    injectAppName(to, name)
  })

  // 写入 package.json 命令
  insertCommander(name)

  utils.log(`>>>【 ${name} 】站点创建成功！`, 'success')
}

/**
 * 删除应用
 * @param name 应用名称
 */
function remove(name) {

  // 清除命令
  removeCommander(name)

  // 清除命令
  clearConfig(name)

  // 删除应用文件
  utils.rm(utils.join(core.AppsPath, name))

  utils.log(`>>>【 ${name} 】站点删除成功！`, 'success')
}

/**
 * 执行队列函数
 * @param array
 * @param func
 * @param finish
 */
function queue(array, func, finish) {
  if (array.length > 0) {
    const item = array.shift();
    func(item)
      .then(() => {
        queue(array, func, finish);
      })
      .catch(e => {
        queue(array, func, finish);
      });
  } else {
    finish && finish();
  }
}

/**
 * 发布全部应用
 */
function build() {
  const apps = Object.keys(appsConfigJSON)
  const total = apps.length
  if (total === 0) {
    utils.log('没有可发布的子应用', 'warning')
    return
  }
  const startTime = new Date().getTime();
  utils.log('开始发布子应用')
  queue(apps,
    function (name) {
      utils.log(`>>> ${name} ...`)
      return new Promise((resolve, reject) => {
        const cmd = `npm run build:${name}`
        process.exec(cmd, (err, std) => {
          if (err) {
            utils.log(err, 'error')
            utils.log(`>>> 【${name}】应用编译失败，错误信息：`, 'warning')
            utils.log(std)
            reject(err)
            return
          }
          resolve()
          utils.log(`>>>【${name}】应用编译成功！`, 'success')
        })
      })

    },
    function () {
      const endTime = (new Date().getTime() - startTime) / 1000;
      utils.log(`>>> 全部子应用发布完成, 耗时：${endTime}秒, 平均每个应用耗时：${endTime / total}秒`, 'success')
    })

}


module.exports = {
  add,
  remove,
  build
}


