/**
 *  开发环境切换主题方式
 *  @author chenhuachun
 *
 *  步骤：
 *  1、通过发送请求通知后台程序更改主题配置文件，触发热更新，是Vue组件内的style更换
 *  2、切换已编译好的Element主题css文件
 *
 */
const axios = require('axios')
const devThemeSwitchServiceApi = '/my/dev-theme-switch-service'

const domId = 'my-skin-style'

function setStyle(content, theme) {
  let styleEl = document.getElementById(domId)
  if (styleEl) {
    styleEl.parentNode.removeChild(styleEl)
  }
  styleEl = document.createElement('style');
  styleEl.innerHTML = content
  styleEl.id = domId
  document.querySelector('head').appendChild(styleEl)
}

module.exports = function (theme) {
  axios.get(devThemeSwitchServiceApi, {
    params: {theme: theme}
  }).then(res => {
    const data = res.data || {}
    if (data.code === 0) {
      setStyle(data.data, theme)
    }
  })
}
