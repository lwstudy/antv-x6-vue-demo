import '../styles/my-tree-connect.scss'
export default {
  /**
   * 元素在页面渲染时回调，在这里进行实例化selecttext
   * @param {HtmlElement} el 指令的宿主元素
   * @param {Object} binding vue指令binding的对象
   * @param {Object} vnode vue编译生成的虚拟节点
   */
  bind(el, binding, vnode) {
    el.className += ' ' + 'is-line'
  }
}