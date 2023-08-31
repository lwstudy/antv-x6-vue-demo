/**
 * 颜色选择器组件，继承Base
 * @module $ui/components/my-color-picker
 */

import {ColorPicker} from 'element-ui'
import Base from '../Base'

export default {
  name: 'MyColorPicker',
  mixins: [Base],
  components: {
    ColorPicker
  },
  props: {
    value: String
  },
  render() {
    const vnode = (
      <ColorPicker ref="comp"
              class="my-color-picker"
              {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
              vModel={this.fieldValue}>
      </ColorPicker>
    )
    
    return this.renderComponent(vnode)
  }
  
}
