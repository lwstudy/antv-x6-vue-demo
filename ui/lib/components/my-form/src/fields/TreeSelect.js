/**
 * 标签输入框组件，继承Base
 * @module $ui/components/my-tree-select
 */

import TreeSelect from '../common/TreeSelect'
import Base from '../Base'

export default {
  name: 'MyTreeSelect',
  mixins: [Base],
  components: {
    TreeSelect
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
      <TreeSelect ref="comp"
                  {...{
                    props: {...this.innerProps, size: this.inputSize},
                    on: {
                      ...this.$listeners
                    },
                    scopedSlots: scopedSlots
                  }}
                  size={this.inputSize}
                  options={this.options}
                  keyMap={this.keyMap}
                  vModel={this.fieldValue}>
      </TreeSelect>
    )
    
    return this.renderComponent(vnode)
  }
}
