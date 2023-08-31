export default {
  // bind(el, binding, vnode) {
  //   const contextmenu = vnode.context.$refs[binding.arg].$refs.contextmenu
  //   if (Array.isArray(contextmenu.$refs.references)) {
  //     contextmenu.$refs.references.push({el, vnode})
  //   } else {
  //     contextmenu.$refs.references = [{el, vnode}]
  //   }
  //
  //   contextmenu.$contextmenuId = el.id || contextmenu._uid // eslint-disable-line no-underscore-dangle
  // },
  // 根据依赖调整指令初始化方式 之所以用 inserted 而不是 bind，是需要确保 contentmenu mounted 后才进行 addRef 操作
  inserted (el, binding, vnode) {
    const contextmenu = vnode.context.$refs[binding.arg].$refs.contextmenu

    contextmenu.addRef({ el, vnode })
    contextmenu.$contextmenuId = el.id || contextmenu._uid // eslint-disable-line no-underscore-dangle
  }
}
