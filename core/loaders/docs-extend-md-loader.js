/**
 * 扩展 markdown loader
 * @author chenhuachun
 */
const path = require('path')
const fs = require('fs')
const crypto = require('crypto-browserify')
const core = require('../index')
const utils = require('../utils')

const CACHE_DIR = core.DocsTempDemoPath

const regex = /^demo(\(?)\s*(.*)(\)?)$/
const nameRegex = /(?<=demo\().+(?=\))/

function getMd5(content) {
  return crypto.createHash('sha1').update(content).digest('hex')
}

function initCacheDir(dir) {
  utils.mkdir(dir)
}

function hasCacheFile(md5) {
  const filePath = path.join(CACHE_DIR, md5 + '.vue')
  return fs.existsSync(filePath)
}

function saveFile(md5, content) {
  const filePath = path.join(CACHE_DIR, md5 + '.vue')
  utils.writeFile(filePath, content)
}

function createCache(content) {
  const md5 = getMd5(content)
  if (!hasCacheFile(md5)) {
    saveFile(md5, content)
  }
  return md5
}

function createFile(name, content) {
  saveFile(name, content)
  return name
}

initCacheDir(CACHE_DIR)

module.exports = (md, d) => {
  md.use(require('markdown-it-container'), 'demo', {
    validate(params) {
      return params.trim().match(regex)
    },
    render(tokens, idx) {
      const token = tokens[idx],
        info = token.info.trim();

      // 匹配 demo(name)
      let titles = info.match(/^demo\(.+\)\s+(.*)$/)
      if (!titles) {
        // 匹配 demo
        titles = info.match(/^demo\s+(.*)$/)
      }

      titles = titles || []

      if (token.nesting === 1) {
        const nextToken = tokens[idx + 1] || {}
        const matchName = info.match(nameRegex)
        // 有命名的demo，采用命名，无即生成md5名称
        const fileName = matchName
          ? createFile(matchName[0], nextToken.content)
          : createCache(nextToken.content)

        let descComponent = ''
        const title = titles[1]
        if (title) {
          const desc = md.render(title).html
          descComponent = !!title ? `<div slot="desc">${desc}</div>` : ''
        }
        return `<Demo>
                     <template v-slot="{fullscreen}">
                      ${descComponent}
                      <MyLazy>
                         <DemoLoader id="${fileName}" :fullscreen="fullscreen" />
                         <MySkeleton slot="skeleton" :title="false" loading active></MySkeleton>
                      </MyLazy>
                      </template>
                      <div slot="code">`
      } else {
        return '</div></Demo>'
      }

    }
  })
}
