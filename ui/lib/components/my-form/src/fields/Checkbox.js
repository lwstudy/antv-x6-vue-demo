/**
 * 多选框组件，继承Base, 支持 el-checkbox、el-checkbox-group 的属性、事件、方法
 * @module $ui/components/my-checkbox
 */
import {Checkbox, CheckboxGroup, CheckboxButton} from 'element-ui'
import Base from '../Base'

/**
 * 插槽
 * @slots
 * @property {string} loading 定义加载中内容
 * @property {string} option 作用域插槽，参数 item， index
 */

export default {
  name: 'MyCheckbox',
  mixins: [Base],
  components: {
    Checkbox,
    CheckboxGroup,
    CheckboxButton
  },
  /**
   *  通用参数之外的扩展参数
   *  @member props
   *  @property {*} [value] 值，支持双向绑定
   *  @property {boolean} [button] 按钮模式，group=true 才有效
   *  @property {boolean} [group] 使用组模式
   *  @property {string} [optionWidth] 选项的宽度，支持像素、百分比、表达式， 仅对group为true， button为false才有效
   *  @property {string} [loadingText=正在加载选项数据...] 加载中提示, 可以插槽定义
   *  @property {boolean} [checkAll] 开启全选功能, group=true 才有效
   */
  props: {
    value: {
      type: [Array, String, Number, Boolean]
    },
    
    // 按钮模式
    button: Boolean,
    
    // 组
    group: {
      type: Boolean,
      default: true
    },
    
    // 选项的宽度，支持像素、百分比、表达式， 仅对group为true， button为false才有效
    optionWidth: String,
    
    // 加载中提示
    loadingText: {
      type: String,
      default: '正在加载选项数据...'
    },
    // 开启全选功能
    checkAll: Boolean
  },
  data() {
    return {
      isIndeterminate: false,
      isAll: false
    }
  },
  computed: {
    optionStyle() {
      return {
        width: this.optionWidth
      }
    },
    classes() {
      return {
        'my-checkbox': true,
        'has-label-width': ('lable-width' in this.$attrs) || (this.myForm && 'label-width' in this.myForm.$attrs)
      }
    }
  },
  methods: {
    getDefaultValue() {
      return this.group ? [] : false
    },
    handleCheckAll(val) {
      this.fieldValue = val
        ? this.currentOptions.map(n => n[this.keyMap.value])
        : []
      this.isIndeterminate = false
    },
    handleChange(val) {
      if (this.checkAll && this.group) {
        const count = val.length, total = this.currentOptions.length
        if (total > 0) {
          this.isAll = count === total
          this.isIndeterminate = count > 0 && count < total
        } else {
          this.isAll = false
          this.isIndeterminate = false
        }
      }
      this.$emit('change', val)
    }
  },
  render() {
    let vnode = null
    if (this.group) {
      
      const scopedSlots = (opt, index) => {
        return this.$scopedSlots.option
          ? this.$scopedSlots.option({
            item: opt,
            index: index
          })
          : opt[label]
      }
      // checkbox 的 options 数据只需要 label 和 value
      // ，同时可以设置el-checkbox的私有属性，如： trueLable falseLable disabled name checked
      const {label, value} = this.keyMap
      const items = this.button
        ? this.currentOptions.map((opt, index) => {
          const props = {...opt, label: opt[value]}
          return (
            <CheckboxButton {...{props: props}}>
              {scopedSlots(opt, index)}
            </CheckboxButton>
          )
        })
        : this.currentOptions.map((opt, index) => {
          const props = {
            ...opt, 
            label: opt[value], 
            border: this.props ? this.props.border || false : false
          }
          return (
            <Checkbox style={this.optionStyle} {...{props: props}}>
              {scopedSlots(opt, index)}
            </Checkbox>
          )
        })
      
      vnode = this.loading
        ? (
          <div class="my-form__loading my-checkbox__loading">
            {this.$slots.loading || this.loadingText}
          </div>
        )
        : (
          <CheckboxGroup ref="comp"
                         class={this.classes}
                         {
                           ...{
                             props: this.innerProps,
                             on: {
                               change: this.handleChange
                             }
                           }
                         }
                         vModel={this.fieldValue}>
            {items}
          </CheckboxGroup>
        )
      if (this.checkAll && !this.loading) {
        vnode = (
          <div class="my-checkbox__wrapper">
            <Checkbox indeterminate={this.isIndeterminate} vModel={this.isAll}
                      vOn:change={this.handleCheckAll}>全选</Checkbox>
            {vnode}
          </div>
        )
      }
      
    } else {
      vnode = (
        <Checkbox ref="comp"
                  class={this.classes}
                  {...{props: this.innerProps, on: this.$listeners}}
                  vModel={this.fieldValue}>{this.$slots.default}</Checkbox>
      )
    }
    
    return this.renderComponent(vnode)
  }
}
