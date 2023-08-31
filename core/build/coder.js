/**
 * 代码生成器
 * @author chenhuachun
 */
const fs = require('fs')
const path = require('path')
const {logWithSpinner, stopSpinner} = require('@vue/cli-shared-utils')
const _ = require('lodash')
const pathToRegexp = require('path-to-regexp')
const config = require('../config/coder.config')
const utils = require('../utils')

const schemaFiles = getSchemaFiles(config.schemasDir)
const schemaInfo = getSchemaInfo(schemaFiles)
const schemaJSON = parseSchemas(schemaInfo)
const apiRender = getRender('api.js')
const mockRender = getRender('mock.js')
const storeRender = getRender('store.js')
const mixinRender = getRender('mixin.js')
const typesRender = getRender('types.js')
const iconsRender = getRender('icons.js')

/**
 * 读取模板渲染函数
 * @param file
 */
function getRender(file) {
  return require(path.join(config.templatesDir, file))
}

/**
 * 转换成规范的js命名，如：sys_log.js 转换成 sysLog
 * @param name
 */
function toSchemaName(name) {
  return _.camelCase(name.replace('.js', ''))
}

/**
 * 获取架构配置文件列表
 * @param root 从那个路径开始查找
 * @param parent 当前的目录名称，可选
 * @returns {Array}
 */
function getSchemaFiles(root, parent) {
  let fileList = []
  if (!fs.existsSync(root)) {
    utils.log('警告：schemas已自动创建', 'warning')
    fs.mkdirSync(root)
    return fileList
  }
  const files = fs.readdirSync(root)
  _.each(files, function (file) {
    const filePath = path.join(root, file)
    const stat = fs.lstatSync(filePath)
    if (stat.isDirectory()) {
      fileList = fileList.concat(getSchemaFiles(filePath, file))
    } else {
      if (file.indexOf('.js') > 0) {
        fileList.push({
          name: toSchemaName(parent ? [parent, file].join('_') : file),
          path: filePath
        })
      }
    }
  })
  return fileList
}

/**
 * 根据配置文件生成配置JSON
 * @param files
 * @returns {{}}
 */
function getSchemaInfo(files) {
  const models = {}
  _.each(files, function (file) {
    models[file.name] = require(file.path)
  })
  return models
}

/**
 * 创建文件
 * @param path
 * @param fileName
 * @param content
 */
function writeFile(path, fileName, content) {
  utils.writeFile(utils.join(path, fileName + '.js'), content)
}

function toUpperCase(name) {
  return name.toUpperCase()
}

/**
 * Foo Bar | --foo-bar | __foo_bar__ => fooBar
 * @param name
 */
function toCamelCase(name) {
  return _.camelCase(name)
}

/**
 * Foo Bar | fooBar | --foo-bar => foo_bar
 * @param name
 */
function toSnakeCase(name) {
  return _.snakeCase(name)
}

/**
 * fooBar => foo-bar
 * @param name
 */
function toKebabCase(name) {
  return _.kebabCase(name)
}

function toUpperSnakeCaseName(name) {
  return toUpperCase(toSnakeCase(name))
}


/**
 * JSON转换成字符串，并把双引号转换成单引号
 * @param json
 */
function stringify(json) {
  const str = JSON.stringify(json)
  return str ? str.replace(/'/g, '\\\'').replace(/"/g, '\'') : ''
}

/**
 * 解析models
 * @param schemas
 * @returns {{}}
 */
function parseSchemas(schemas) {
  const result = {}
  _.each(schemas, function (schema, name) {
    result[name] = parseModel(schema.model, name, schema.vuex)
  })
  return result
}

function getTitle(name, item, info) {
  const methodComment = config.methodCommentMap[item.methodType] || item.title || '<%=cname%> ' + (item.upperSnakeCaseName || '')
  return _.template(methodComment)({cname: info[name].name || name})
}

/**
 * 解析单个model
 * @param model
 * @param name
 * @param vuex
 * @returns {Array}
 */
function parseModel(model, name, vuex) {
  let result = []
  if (_.isArray(model)) {
    _.each(model, function (item) {
      if (item.disabled !== true && item.path) {
        result = result.concat(parseModel(item, name, vuex))
      }
    })
  } else {
    if (model.disabled !== true && model.path) {
      if (model.methods === false) {
        if (!model.name) {
          throw Error('methods为false时，必须要设置name')
        }
        if (vuex && (!model.state && !model.method)) {
          throw Error('vuex模式，methods为false，并且method为空时，必须要设置state')
        }
        
        if (model.method && !config.methods.includes(model.method)) {
          throw Error('method的值必须是' + config.methods.join(' ') + '中的一个')
        }
        // ajax请求类型
        const httpMethod = config.methodTypeMap[model.method || model.name] || 'post'
        
        const options = _.extend({}, {method: httpMethod}, model.options || {})
        result.push({
          path: model.path,
          prefix: model.prefix || config.pathPrefix,
          transform: model.transform,
          options: options,
          columns: model.columns,
          methodType: model.method || model.name,
          httpMethod: options.method,
          suffix: '',
          upperSnakeCaseName: toUpperSnakeCaseName(model.name),
          camelCaseName: toCamelCase(model.name),
          template: model.template,
          name: model.name,
          state: model.state,
          title: model.title,
          cache: model.cache,
          socket: model.socket
        })
      } else {
        const methods = model.methods || config.methods
        _.each(methods, function (method) {
          
          // 检测是否开启了批量删除
          if (method === 'batch' && !config.batchEnabled) return
          
          // ajax请求类型
          const httpMethod = config.methodTypeMap[method] || 'get'
          // axios options
          const options = _.extend({}, {method: httpMethod}, model.options || {})
          result.push({
            path: model.path,
            transform: model.transform,
            prefix: model.prefix || config.pathPrefix,
            suffix: config.methodSuffixMap[method] || '',
            options: options,
            columns: model.columns,
            methodType: method,
            httpMethod: httpMethod,
            upperSnakeCaseName: toUpperSnakeCaseName(method + '_' + name),
            camelCaseName: toCamelCase(method + '_' + name),
            template: model.template,
            title: model.title,
            cache: model.cache,
            socket: model.socket
          })
        })
      }
    }
  }
  return result
}

/**
 * 生成api文件
 */
function writeApi(json, info) {
  _.each(json, function (model, name) {
    const items = []
    let configKeys = [], transforms = []
    _.each(model, function (item) {
      if (item.prefix) {
        configKeys.push(item.prefix)
      }
      if (item.transform) {
        transforms.push(item.transform)
      }
      const url = item.path + item.suffix
      const keys = []
      pathToRegexp(url, keys)
      
      // 去重，在数组中已存在的URL不加进去
      if (!items.some(n => n.URL === item.upperSnakeCaseName)) {
        items.push({
          URL: item.upperSnakeCaseName,
          url: item.path + item.suffix,
          prefix: item.prefix,
          params: keys.map(n => n.name),
          camelCaseName: item.camelCaseName,
          options: item.options,
          ajaxParam: 'data',
          transform: item.transform,
          title: getTitle(name, item, info),
          cache: item.cache,
          socket: item.socket
        })
      }
    })
    // 去重
    configKeys = _.uniq(configKeys)
    transforms = _.uniq(transforms)
    writeFile(config.outApiPath, toKebabCase(name), utils.beautifyJs(apiRender({
      cname: info[name].name,
      name: name,
      transforms: transforms,
      configKeys: configKeys,
      items: items
    })))
  })
}

/**
 * 生成mock文件
 */
function writeMock(json) {
  const dbConfig = [], extendsArray = [];
  _.each(json, function (model, name) {
    const kebabCaseName = toKebabCase(name)
    dbConfig.push(`import ${name} from '$my/code/mock/${kebabCaseName}'`)
    extendsArray.push(`...${name}`)
    const mocks = []
    let importApiArray = [], templateArray = []
    _.each(model, function (item) {
      if (item.columns || item.template) {
        importApiArray.push(item.upperSnakeCaseName)
      }
      if (item.template) {
        templateArray.push(item.template)
      }
      if (item.columns || item.template) {
        mocks.push({
          URL: item.upperSnakeCaseName,
          page: config.statePageName || 'page',
          limit: config.statePageSizeName || 'limit',
          total: config.stateTotalName || 'total',
          list: config.stateListName || 'list',
          httpMethod: item.httpMethod,
          methodType: item.methodType,
          columns: stringify(item.columns || {}, '', '\t'),
          template: item.template
        })
      }
    })
    importApiArray = _.uniq(importApiArray)
    templateArray = _.uniq(templateArray)
    writeFile(config.outMockPath, toKebabCase(name), utils.beautifyJs(mockRender({
      importApiArray: importApiArray,
      name: name,
      kebabCaseName: toKebabCase(name),
      mocks: mocks,
      code: config.mockCodeName || 'code',
      data: config.mockDataName || 'data',
      message: config.mockMsgName || 'message',
      templateArray: templateArray,
      codeValue: config.successCodeValue,
      addData: stringify(config.addMockData),
      updateData: stringify(config.updateMockData),
      removeData: stringify(config.removeMockData),
      batchData: stringify(config.batchMockData)
    })))
  })
  dbConfig.push(`export default [${extendsArray.join(', ')}]`)
  writeFile(config.outMockConfig, 'rules', dbConfig.join('\n') + '\n')
}

/**
 * 生成mixin文件
 */
function writeMixin(json, info) {
  _.each(json, function (model, name) {
    if (info[name].vuex) {
      return
    }
    let importTypeArray = [],
      importApiArray = [],
      customStateArray = []
    const items = []
    _.each(model, function (item) {
      importTypeArray.push(item.upperSnakeCaseName)
      importApiArray.push(item.camelCaseName)
      if (item.state) {
        customStateArray.push({
          state: item.state,
          title: item.title || item.upperSnakeCaseName
        })
      }
      const url = item.path + item.suffix
      const keys = []
      pathToRegexp(url, keys)
      
      items.push({
        NAME: item.upperSnakeCaseName,
        name: item.camelCaseName,
        state: item.state,
        params: keys.map(n => n.name),
        httpMethod: item.httpMethod,
        methodType: item.methodType,
        ajaxParam: 'data',
        title: getTitle(name, item, info),
        cache: item.cache
      })
    })
    importTypeArray = _.uniq(importTypeArray)
    importApiArray = _.uniq(importApiArray)
    customStateArray = _.uniq(customStateArray)
    writeFile(config.outMixinPath, toKebabCase(name), utils.beautifyJs(mixinRender({
      name: name,
      cname: info[name].name || name,
      kebabCaseName: toKebabCase(name),
      importTypeArray: importTypeArray,
      importApiArray: importApiArray,
      customStateArray: customStateArray,
      page: config.statePageName || 'page',
      limit: config.statePageSizeName || 'limit',
      total: config.stateTotalName || 'total',
      list: config.stateListName || 'list',
      model: config.stateModelName || 'model',
      items: items
    })))
  })
}

/**
 * 生成store文件
 */
function writeStore(json, info) {
  const types = {}
  const modules = [], extendsArray = []
  _.each(json, function (model, name) {
    if (!info[name].vuex) {
      return
    }
    modules.push(`import {${name}} from '$my/code/store/${toKebabCase(name)}'`)
    extendsArray.push(name)
    
    let importTypeArray = [],
      importApiArray = [],
      customStateArray = []
    const items = []
    types[name] = []
    _.each(model, function (item) {
      types[name].push({
        name: item.upperSnakeCaseName,
        title: getTitle(name, item, info)
      })
      importTypeArray.push(item.upperSnakeCaseName)
      importApiArray.push(item.camelCaseName)
      if (item.state) {
        customStateArray.push({
          state: item.state,
          title: item.title || item.upperSnakeCaseName
        })
      }
      const url = item.path + item.suffix
      const keys = []
      pathToRegexp(url, keys)
      items.push({
        NAME: item.upperSnakeCaseName,
        name: item.camelCaseName,
        state: item.state,
        params: keys.map(n => n.name),
        httpMethod: item.httpMethod,
        methodType: item.methodType,
        ajaxParam: 'data',
        title: getTitle(name, item, info),
        cache: item.cache
      })
    })
    importTypeArray = _.uniq(importTypeArray)
    importApiArray = _.uniq(importApiArray)
    customStateArray = _.uniq(customStateArray)
    writeFile(config.outStorePath, toKebabCase(name), utils.beautifyJs(storeRender({
      name: name,
      cname: info[name].name || name,
      kebabCaseName: toKebabCase(name),
      importTypeArray: importTypeArray,
      importApiArray: importApiArray,
      customStateArray: customStateArray,
      page: config.statePageName || 'page',
      limit: config.statePageSizeName || 'limit',
      total: config.stateTotalName || 'total',
      list: config.stateListName || 'list',
      model: config.stateModelName || 'model',
      items: items
    })))
  })
  
  writeFile(config.outStoreType, 'types', utils.beautifyJs(typesRender({types: types})))
  modules.push(`export default {${extendsArray.join(', ')}}`)
  writeFile(config.outStoreType, 'modules', modules.join('\n') + '\n')
}

function getMyIconData() {
  const content = fs.readFileSync(config.iconCssFile, {encoding: 'utf-8'})
  const regex = /.icon-[\w-_]+:/g
  const matches = content.match(regex)
  return matches.map(function (item) {
    return item.replace('.', '').replace(':', '')
  })
}

function writeIconData() {
  // element-ui icon
  const content = fs.readFileSync(config.elIconCssFile, {encoding: 'utf-8'})
  const regex = /.el-icon-[\w-_]+:/g
  const matches = content.match(regex)
  const elItems = matches.map(function (item) {
    return item.replace('.el-', 'el-').replace(':', '')
  })
  
  const items = getMyIconData()
  
  const fileContent = iconsRender({items: stringify(items), elItems: stringify(elItems)})
  fs.writeFileSync(config.outIconFile,
    utils.beautifyJs(fileContent),
    'utf-8')
}

module.exports = function (force) {
  if (force) {
    utils.rm(config.outDir)
    logWithSpinner('清空目录')
  }
  logWithSpinner('构建代码')
  if (!fs.existsSync(config.outDir)) {
    utils.mkdir(config.outDir)
  }
  writeApi(schemaJSON, schemaInfo)
  writeMock(schemaJSON)
  writeStore(schemaJSON, schemaInfo)
  writeMixin(schemaJSON, schemaInfo)
  writeIconData()
  stopSpinner()
}



