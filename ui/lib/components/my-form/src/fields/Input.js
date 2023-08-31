/**
 * 文本框组件，继承Base, 支持 el-input 的属性、事件、方法
 * @module $ui/components/my-input
 */

import {Input} from 'element-ui'
import Base from '../Base'

/**
 * 插槽
 * @member slots
 * @property {string} prefix 输入框头部内容 textarea=false 有效
 * @property {string} suffix 输入框尾部内容 textarea=false 有效
 * @property {string} prepend 输入框前置内容 textarea=false 有效
 * @property {string} append 输入框后置内容 textarea=false 有效
 */
export default {
  name: 'MyInput',
  mixins: [Base],
  components: {
    Input
  },
  /**
   * 扩展属性参数
   * @member props
   * @property {boolean} [textarea] 多行文本模式
   */
  props: {
    value: String,
    textarea: Boolean
  },
  computed: {
    type() {
      return this.textarea ? 'textarea' : 'text'
    }
  },
  render() {
    const vnode = (
      <Input ref="comp"
             class="my-input"
             {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
             type={this.type}
             vModel={this.fieldValue}>
        {this.createSlots(['prefix', 'suffix', 'prepend', 'append'])}
      </Input>
    )
    
    return this.renderComponent(vnode)
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['focus', 'blur', 'select'])
  }
  
}
