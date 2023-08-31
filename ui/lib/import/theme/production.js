/**
 * 生产环境切换主题方式,加载对应主题的css文件
 *
 * @author chenhuachun
 *
 */

module.exports = function (key, app, container) {
  const domId = `my-skin-link-${app || 'master'}`
  const mapName = app ? `__MY_THEMES_${app}__` : '__MY_THEMES__'
  const themes = window[mapName] || {}
  const theme = themes[key]
  let linkEl = document.getElementById(domId)
  if (linkEl) {
    linkEl.parentNode.removeChild(linkEl)
  }
  if (theme) {
    linkEl = document.createElement('link')
    linkEl.id = domId
    linkEl.rel = 'stylesheet'
    linkEl.href = theme
    const parent = container || document.getElementById('my-master-app') || document.body
    if (parent) {
      parent.appendChild(linkEl)
    }
  }
}
