const process = require('child_process')
const {logWithSpinner, stopSpinner, failSpinner} = require('@vue/cli-shared-utils')
const utils = require('../utils')

const jsdoc = 'node node_modules/jsdoc/jsdoc.js'

function getConfigPath(dir) {
  return utils.resolve(`core/config/jsdoc.${dir}.config.js`)
}

function builder(dir) {
  const cmd = `${jsdoc} -c ${getConfigPath(dir)} -r`
  logWithSpinner(`${dir}文档生成完成`)
  process.exec(cmd, (err, std) => {
    if (err) {
      failSpinner(`${dir}文档生成失败`)
      utils.log(err, 'error')
      return
    }
    stopSpinner()
  })
}

module.exports = builder
