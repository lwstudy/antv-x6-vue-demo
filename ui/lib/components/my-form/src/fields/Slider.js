/**
 * 文本框组件，继承Base
 * @module $ui/components/my-slider
 */

import {Slider} from 'element-ui'
import Base from '../Base'

export default {
  name: 'MySlider',
  mixins: [Base],
  components: {
    Slider
  },
  props: {
    value: Number
  },
  methods: {
    getDefaultValue() {
      return 0
    }
  },
  render() {
    const vnode = (
      <Slider ref="comp"
              class="my-slider"
              {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
              vModel={this.fieldValue}>
      </Slider>
    )
    
    return this.renderComponent(vnode)
  }
  
}
