import uiConfig from '$ui/config'
import {MyMasterApp} from '$ui'
import {
  Vue,
  Vuex,
  Router,
  progress,
  Access
} from './enhance'

export {
  Vue,
  Vuex,
  Router,
  progress,
  Access
}

export const getView = require('$ui/import/view/' + process.env.NODE_ENV)

/**
 * 应用渲染函数
 * @param {object} params
 */
export function appRender({el, store, router, access}) {
  return new Vue({
    components: {
      MyMasterApp
    },
    el: el,
    store,
    router,
    access,
    render(h) {
      const props = {...uiConfig.scale}
      return h('my-master-app', {props})
    }
  })
}
