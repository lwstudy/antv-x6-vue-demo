/**
 * 关键字高亮组件
 * @module $ui/components/my-highlight
 */
export default {
  name: 'MyHighlight',
  /**
   * 属性参数
   * @member props
   * @property {string} [tag=span] 容器标签名称
   * @property {string[]} [keys] 需要高亮的关键字
   * @property {string} [type=primary] 高亮颜色，支持 'primary', 'success', 'warning', 'danger'
   */
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    keys: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: 'primary',
      validator(val) {
        return ['primary', 'success', 'warning', 'danger'].includes(val)
      }
    }
  },
  computed: {
    classes() {
      return {
        'my-highlight': true,
        [`my-highlight--${this.type}`]: !!this.type,
        'is-pointer': !!this.$listeners.click
      }
    },
    keyNodes() {
      return this.keys.map(key => {
        return <span class={this.classes} {...{on: this.$listeners}}>{key}</span>
      })
    }
  },
  methods: {
    parseText(text) {
      this.keys.forEach((key, index) => {
        const regexp = new RegExp(key, 'g')
        text = text.replace(regexp, `{{${index}}}`)
      })
      return text.split(/{{|}}/)
    }
  },
  render(h) {
    if (!this.$slots.default) return null
    const node = this.$slots.default[0]
    if (!node || !node.text) {
      console.warn('MyHighlight组件的插槽必须要是文本')
      return this.$slots.default
    }
    const textArray = this.parseText(node.text)
    const regexp = /^[0-9]*$/
    const nodes = textArray.map(t => {
      if (regexp.test(t)) {
        return this.keyNodes[Math.floor(t)] || t
      }
      return t
    })
    return h(this.tag, nodes)
  }
}
