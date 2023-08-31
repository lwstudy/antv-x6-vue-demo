/**
 * 文本框组件，继承Base
 * @module $ui/components/my-switch
 */

import {Switch} from 'element-ui'
import Base from '../Base'

export default {
  name: 'MySwitch',
  mixins: [Base],
  components: {
    ElSwitch: Switch
  },
  props: {
    value: [Boolean, String, Number]
  },
  methods: {
    getDefaultValue() {
      return false
    }
  },
  render() {
    const vnode = (
      <ElSwitch ref="comp"
                class="my-switch"
                {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
                vModel={this.fieldValue}>
      </ElSwitch>
    )
    
    return this.renderComponent(vnode)
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['focus'])
  }
  
}
