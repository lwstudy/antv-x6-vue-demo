/**
 * 下拉组件，继承Base
 * @module $ui/components/my-select
 */

import {Select, Option, OptionGroup} from 'element-ui'
import Base from '../Base'

/**
 * 插槽
 * @member slots
 * @property {string} [option] 作用域插槽，参数: item 数据项，index 索引
 */
export default {
  name: 'MySelect',
  mixins: [Base],
  components: {
    Select,
    Option,
    OptionGroup
  },
  /**
   * 通用参数之外的扩展参数
   * @member props
   * @property {Array} [group] 分组，数据项字段包括 id, label, disabled, options 中的 parentId 字段与分组id相等即标识选项在该分组下
   */
  props: {
    value: [String, Number, Boolean, Array],
    // 分组 [{label, disabled, id}]
    group: {
      type: Array
    }
  },
  methods: {
    getDefaultValue() {
      if (this.props && this.props.multiple) {
        return []
      }
      return ''
    },
    getOptionsByGroupId(groupId) {
      if (!this.currentOptions) return []
      const {parentId} = this.keyMap
      return this.currentOptions.filter(item => item[parentId] === groupId)
    },
    renderOptions(options, isDisabled) {
      if (!options) return []
      
      const scopedSlots = (opt, index) => {
        return this.$scopedSlots.option
          ? this.$scopedSlots.option({
            item: opt,
            index: index
          })
          : opt[label]
      }
      const {label, value, disabled} = this.keyMap
      return options.map((item, index) => {
        const opt = {
          label: item[label],
          value: item[value],
          disabled: isDisabled || item[disabled]
        }
        return (
          <Option {...{props: opt}}>
            {scopedSlots(opt, index)}
          </Option>
        )
      })
    },
    renderItem() {
      if (!this.group) return this.renderOptions(this.currentOptions)
      
      return this.group.map(g => {
        const opts = this.getOptionsByGroupId(g.id)
        return (
          <OptionGroup label={g.label} disabled={g.disabled}>
            {this.renderOptions(opts, g.disabled)}
          </OptionGroup>
        )
      })
    }
  },
  render() {
    const vnode = (
      <Select ref="comp"
              class="my-select"
              {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
              vModel={this.fieldValue}>
        {this.renderItem()}
      </Select>
    )
    
    return this.renderComponent(vnode)
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['focus', 'blur'])
  }
}
