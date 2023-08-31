/**
 * 文本框组件，继承Base
 * @module $ui/components/my-rate
 */

import {Rate} from 'element-ui'
import Base from '../Base'

export default {
  name: 'MyRate',
  mixins: [Base],
  components: {
    Rate
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
      <Rate ref="comp"
                class="my-rate"
                {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
                vModel={this.fieldValue}>
      </Rate>
    )
    
    return this.renderComponent(vnode)
  }
  
}
