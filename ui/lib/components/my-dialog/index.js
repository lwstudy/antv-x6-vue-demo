import Vue from 'vue'
import {install} from '$ui/utils/helper'
import Module from './src/Dialog'

/**
 * 创建窗体服务函数
 * @param {Object} options MyDialog 组件配置
 * @param {Object} options.props 组件参数
 * @param {Object} options.on 组件绑定事件
 * @param {VNode|string} vnode 虚拟DOM
 * @param {object} [extend] Vue实例扩展
 * @return {*}
 */
Module.create = function (options, vnode, extend) {
  const vm = new Vue({
    ...extend,
    render(h) {
      return h(Module, {
        ref: 'dialog',
        props: options.props,
        on: options.on
      }, [vnode])
    }
  })
  vm.$mount()
  return vm.$refs.dialog
}


export default install(Module)
