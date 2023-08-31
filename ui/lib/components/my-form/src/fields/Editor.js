/**
 * 富文本编辑器
 * @module $ui/components/my-editor
 */

import Editor from '../common/Editor'
import Base from '../Base'

export default {
  name: 'MyEditor',
  mixins: [Base],
  components: {
    Editor
  },
  /**
   * 属性参数
   * @member props
   * @property {string} [value] 值，支持双向绑定
   * @property {string|array} toolbar 工具条，预设了 'simple', 'classic', 'all'
   * @property {object} [config] keditor5 配置
   * @property {number} [height] 高度
   * @property {boolean} [readonly] 只读
   * @property {boolean} [disabled] 禁用
   */
  props: {
    value: String,
    height: Number,
    toolbar: [String, Array],
    // 默认阻止回车事件
    stopEnterEvent: {
      type: Boolean,
      default: true
    }
  },
  render() {
    const vnode = (
      <Editor ref="comp"
    {...{
      props: {...this.innerProps, height: this.height, toolbar: this.toolbar},
      on: {
      ...this.$listeners
      }
    }}
    vModel={this.fieldValue}>
      </Editor>
  )

    return this.renderComponent(vnode)
  },
  watch: {
    'myForm.model'() {
      this.resetData()
    }
  },
  methods: {
    resetData() {
      this.$nextTick(() => {
        this.$refs.comp.setData(this.fieldValue)
      })
    }
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['setData', 'getData'])
    if (this.myForm) {
      this.myForm.$on('reset', this.resetData)
    }
  },
  beforeDestroy() {
    if (this.myForm) {
      this.myForm.$off('reset', this.resetData)
    }
  }
}
