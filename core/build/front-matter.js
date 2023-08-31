// see: https://github.com/jonschlinkert/gray-matter

/*

属性
---
title: 标题
---

数组
---
list:
  - one
  - two
---

对象
---
obj:
  name: kenny
  age: 18
---

数组包含对象
---
list:
  -
    name: kenny
    age: 18
  -
    name: sam
    age: 20
---

 */


const fs = require('fs')
const matter = require('gray-matter');
const _ = require('lodash')
const utils = require('../utils')

const regex = /---\n?[\s\S]*\n?---/gi

/**
 * 解释文件，返回标记数据
 * @param file 文件路径
 * @param isString 是否返回字符串
 * @return {null|*}
 */
function parse(file, isString) {
  const content = fs.readFileSync(file, 'utf-8')
  const matches = content.match(regex) || []
  if (matches.length === 0) {
    return null
  }
  const results = matches.map(block => {
    return matter(block.trim()).data || {}
  });
  const data = _.merge.apply(_.merge, results)
  return _.isPlainObject(data) ? (isString ? utils.stringify(data) : data) : null
}


module.exports = parse
