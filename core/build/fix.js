/**
 * 修复 node_modules 源码的bug
 */
const fs = require('fs')
const chalk = require('chalk')
const ELEMENT_UI_FILE = 'node_modules/element-ui/lib/element-ui.common.js'
const ELEMENT_UI_UPLOAD_AJAX = 'node_modules/element-ui/lib/upload.js'
const AXIOS_FILE = 'node_modules/axios/lib/adapters/xhr.js'
const GOJS_FILE = 'node_modules/gojs/release/go.js'

function fixElementUI(file) {
  try {
    let content = fs.readFileSync(file, 'utf-8')
    // flag1 与 flag2 互换位置
    const flag1 = 'xhr.open(\'post\', action, true);'
    const flag2 = `if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }`;
    if (content.includes('/*flag1*/')) {
      console.log(`fix ${file} ${chalk.yellow('fixed')}`)
      return
    }

    if (content.includes(flag1) && content.includes(flag2)) {
      content = content
        .replace(flag1, `/*flag1*/${flag1}/*flag1*/`)
        .replace(flag2, `/*flag2*/${flag2}/*flag2*/`)


      content = content.replace(`/*flag1*/${flag1}/*flag1*/`, `/*flag1*/${flag2}/*flag1*/`)
        .replace(`/*flag2*/${flag2}/*flag2*/`, `/*flag2*/${flag1}/*flag2*/`)

      fs.writeFileSync(file, content, 'utf-8')

      console.log(`fix ${file} ${chalk.green('success')}`)
    } else {
      console.log(`fix ${file} ${chalk.red('fail')}`)
    }
  } catch (e) {
    console.log(`fix ${file} ${chalk.red('fail')}`)
  }
}

function fixAxios() {
  try {
    let content = fs.readFileSync(AXIOS_FILE, 'utf-8')
    // flag1 移到 flag2 的前面
    const flag1 = `if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }`
    const flag2 = 'request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);'
    if (content.includes('/*flag2*/')) {
      console.log(`fix ${AXIOS_FILE} ${chalk.yellow('fixed')}`)
      return
    }
    // console.log(content.includes(flag1), content.includes(flag2))
    if (content.includes(flag1) && content.includes(flag2)) {

      content = content
        .replace(flag1, `/*flag1*/${flag1}/*flag1*/`)
        .replace(flag2, `/*flag2*/${flag2}/*flag2*/`)

      content = content
        .replace(flag2, `${flag1} \n ${flag2}`)
        .replace(`/*flag1*/${flag1}/*flag1*/`, '')


      fs.writeFileSync(AXIOS_FILE, content, 'utf-8')

      console.log(`fix ${AXIOS_FILE} ${chalk.green('success')}`)
    } else {
      console.log(`fix ${AXIOS_FILE} ${chalk.red('fail')}`)
    }
  } catch (e) {
    console.log(`fix ${AXIOS_FILE} ${chalk.red('fail')}`)
  }
}

function fixGojs(file) {
  try {
    let content = fs.readFileSync(file, 'utf-8')
    if (content.includes('/*flag*/')) {
      console.log(`fix ${file} ${chalk.yellow('fixed')}`)
      return
    }
    // 破解gojs
    const flag = '7eba17a4ca3b1a8346'
    const index = content.indexOf(flag)
    if (index > 0) {
      const start = index - 8, end = index + 32 + flag.length
      const section = content.substring(start, end)
      content = content.replace(section, 'function(){return true;};/*flag*/')
      content = content.replace('bfunction(){return true;}', 'function(){return true;}')
      fs.writeFileSync(file, content, 'utf-8')

      console.log(`fix ${file} ${chalk.green('success')}`)
    } else {
      console.log(`fix ${file} ${chalk.red('fail')}`)
    }
  } catch (e) {
    console.log(`fix ${file} ${chalk.red('fail')}`)
  }
}

fixElementUI(ELEMENT_UI_FILE)
fixElementUI(ELEMENT_UI_UPLOAD_AJAX)
fixAxios()
fixGojs(GOJS_FILE)
fixGojs(GOJS_FILE.replace('go.js', 'go-module.js'))
fixGojs(GOJS_FILE.replace('go.js', 'go-debug.js'))
fixGojs(GOJS_FILE.replace('go.js', 'go-debug-module.js'))
fixGojs(GOJS_FILE.replace('go.js', 'go.mjs'))
fixGojs(GOJS_FILE.replace('go.js', 'go-debug.mjs'))



