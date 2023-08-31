import uiConfig from './config'

let analysisInstalled = false
let components = []
let timerId = null

function trackEvent(componentName) {
  components.push(componentName)
  clearTimeout(timerId)
  timerId = setTimeout(() => {
    if (!window._hmt || !componentName) return
    const category = window.location.host
    const url = window.location.href
    window._hmt.push(['_trackEvent', category, components.join(','), uiConfig.version, url])
    // console.log(category, components.join(','), uiConfig.version, url)
    components = []
  }, 3000)
}


function installAnalysis() {
  if (analysisInstalled) return
  const id = 'c4e5f73318b5cb0c389e3d9a05f831cc'
  const _hmt = window._hmt
  if (!_hmt || (_hmt && _hmt.id !== id)) {
    const hm = document.createElement('script');
    hm.src = `https://hm.baidu.com/hm.js?${id}`;
    const s = document.getElementsByTagName('script')[0];
    s && s.parentNode.insertBefore(hm, s);
  }
  analysisInstalled = true
}

if (uiConfig.analysis) {
  installAnalysis()
}

export default function (Mod) {
  uiConfig.analysis && trackEvent(Mod.name)
}

