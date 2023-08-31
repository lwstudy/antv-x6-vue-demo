/**
 * 单选框组件，继承Base, 支持 el-radio、el-radio-group 的属性、事件、方法
 * @module $ui/components/my-radio
 */
import {Radio, RadioGroup, RadioButton} from 'element-ui'
import Base from '../Base'

/**
 * 插槽
 * @slots
 * @property {string} loading 定义加载中内容
 * @property {string} option 作用域插槽，参数 item， index
 */

export default {
  name: 'MyRadio',
  mixins: [Base],
  components: {
    Radio,
    RadioGroup,
    RadioButton
  },
  /**
   *  通用参数之外的扩展参数
   *  @member props
   *  @property {*} [value] 值，支持双向绑定
   *  @property {boolean} [button] 按钮模式，group=true 才有效
   *  @property {boolean} [group] 使用组模式
   *  @property {string} [optionWidth] 选项的宽度，支持像素、百分比、表达式， 仅对group为true， button为false才有效
   *  @property {string} [loadingText=正在加载选项数据...] 加载中提示, 可以插槽定义
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
        'my-radio': true,
        'has-label-width': ('lable-width' in this.$attrs) || (this.myForm && 'label-width' in this.myForm.$attrs)
      }
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
            <RadioButton {...{props: props}}>
              {scopedSlots(opt, index)}
            </RadioButton>
          )
        })
        : this.currentOptions.map((opt, index) => {
          const props = {...opt, label: opt[value]}
          return (
            <Radio style={this.optionStyle} {...{props: props}}>
              {scopedSlots(opt, index)}
            </Radio>
          )
        })
      
      vnode = this.loading
        ? (
          <div class="my-form__loading my-radio__loading">
            {this.$slots.loading || this.loadingText}
          </div>
        )
        : (
          <RadioGroup ref="comp"
                      class={this.classes}
                      {...{props: this.innerProps, on: this.$listeners}}
                      vModel={this.fieldValue}>
            {items}
          </RadioGroup>
        )
      
    } else {
      vnode = (
        <Radio ref="comp"
               class={this.classes}
               {...{props: this.innerProps, on: this.$listeners}}
               vModel={this.fieldValue}></Radio>
      )
    }
    
    return this.renderComponent(vnode)
  }
}
