/**
 * 标签输入框组件，继承Base
 * @module $ui/components/my-tag-select
 */

import TagSelect from '../common/TagSelect'
import Base from '../Base'

/**
 * 插槽
 * @member slots
 * @property {string} default 作用域插槽，定义每个tag显示内容，参数: item（数据项）,index(索引)
 */
export default {
  name: 'MyTagSelect',
  mixins: [Base],
  components: {
    TagSelect
  },
  props: {
    value: [Array, String, Number]
  },
  computed: {
    inputSize() {
      if (this.size) return this.size
      if (this.myForm) {
        return this.myForm.$attrs.size || ''
      }
      return ''
    }
  },
  methods: {
    getDefaultValue() {
      return this.$attrs.multiple ? [] : ''
    },
    handleChange(val) {
      if (val && val.length) {
        this.clearValidate()
      }
      this.$emit('change', val)
    }
  },
  render() {
    
    const scopedSlots = this.$scopedSlots.default
      ? {
        default: (props) => {
          return this.$scopedSlots.default(props)
        }
        
      }
      : null;
    
    const vnode = (
      <TagSelect ref="comp"
                 {...{
                   props: {...this.innerProps, size: this.inputSize},
                   on: {
                     ...this.$listeners,
                     change: this.handleChange
                   },
                   scopedSlots: scopedSlots
                 }}
                 size={this.inputSize}
                 options={this.options}
                 keyMap={this.keyMap}
                 vModel={this.fieldValue}>
      </TagSelect>
    )
    
    return this.renderComponent(vnode)
  }
}
