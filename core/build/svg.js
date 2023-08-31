const fs = require('fs')
const {logWithSpinner, stopSpinner, failSpinner} = require('@vue/cli-shared-utils')
const utils = require('../utils')
const core = require('../index')
// const constant = require('../constant')
const render = require('../renders/svg-component')
const regex = /(<path[\s\S]*<\/path>)|(<path[\s\S]*\/>)/gi
const fillRegex = /\sfill="[\w#]*"/gi
const svgFiles = utils.getFiles(core.SVGSrcPath)
const saveDir = core.SVGIconPath
const imports = []


logWithSpinner('生成SVG组件')
try {
  svgFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8')
    const matches = content.match(regex) || []
    const cleanPaths = matches.map(n => {
      const fills = n.match(fillRegex) || []
      fills.forEach(f => {
        n = n.replace(f, '')
      })
      n = n.replace(/\s*\/>/gi, '/>')
        .replace(/<g>/gi, '')
        .replace(/<\/g>/gi, '')
        .replace(/\n/gi, ' ')
        .replace(/\t/gi, ' ')
        .replace(/\s\s/gi, ' ')
      return n
    })
    if (cleanPaths.length > 0) {
      const fileMsg = utils.parsePath(file)
      const importPath = `import './${fileMsg.name}'`
      const fileContent = render({paths: cleanPaths, name: fileMsg.name})
      utils.writeFile(utils.join(saveDir, fileMsg.name + '.js'), fileContent)
      imports.push(importPath)
    }
  })

  utils.writeFile(utils.join(saveDir, 'index.js'), imports.join('\n'))
  stopSpinner()
} catch (e) {
  utils.log(e, 'error')
  failSpinner('生成SVG组件失败！')
}
