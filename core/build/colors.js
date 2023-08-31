/**
 * 创建 Ant Design 配色SCSS变量文件
 */
const {logWithSpinner, stopSpinner} = require('@vue/cli-shared-utils')
const palette = require('@ant-design/colors')
const utils = require('../utils')
const core = require('../index')

function getNeutral(color, index) {
  const percents = [1, 0.85, 0.65, 0.45, 0.25, 0.15, 0.09, 0.04, 0.02, 0]
  const val = color === 'black' ? 0 : 255
  return `rgba(${val}, ${val}, ${val}, ${percents[index]})`
}

function createNeutralVars() {
  const neutralBlack = []
  const neutralWhite = []
  
  for (let i = 0; i < 10; i++) {
    neutralBlack.push(getNeutral('black', i))
    neutralWhite.push(getNeutral('white', i))
  }
  return {
    'neutral-black': neutralBlack,
    'neutral-white': neutralWhite
  }
}


// #409EFF
function writeScssVar() {
  logWithSpinner(core.ColorsVarFilePath)
  const colors = palette.presetPalettes
  colors.custom = generate('#409EFF')
  const content = []
  content.push('// base')
  content.push('$black: #000 !default;')
  content.push('$white: #fff !default;')
  content.push('$none: transparent !default;')
  
  Object.keys(colors).forEach(name => {
    const items = colors[name]
    content.push(`// ${name}`)
    content.push(`$${name}-primary: ${items.primary} !default;`)
    items.reverse().forEach((val, index) => {
      content.push(`$${name}-${index + 1}: ${val} !default;`)
    })
  })
  const neutrals = createNeutralVars()
  Object.keys(neutrals).forEach(name => {
    const items = neutrals[name]
    content.push(`// ${name}`)
    items.forEach((val, index) => {
      content.push(`$${name}-${index + 1}: ${val} !default;`)
    })
  })
  
  
  utils.writeFile(core.ColorsVarFilePath, content.join('\n'))
  stopSpinner()
}

function generate(color) {
  const items = palette.generate(color);
  items.primary = color;
  return items;
}

module.exports = {
  write: writeScssVar
}

