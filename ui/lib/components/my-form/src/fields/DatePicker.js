/**
 * 文本框组件，继承Base
 * @module $ui/components/my-date-picker
 */

import {DatePicker, TimePicker, TimeSelect} from 'element-ui'
import Base from '../Base'

export default {
  name: 'MyDatePicker',
  mixins: [Base],
  components: {
    DatePicker,
    TimePicker,
    TimeSelect
  },
  props: {
    value: [Date, String, Number, Array],
    mode: {
      type: String,
      default: 'date',
      validator(val) {
        return ['time', 'timeSelect', 'date', 'dateTime', 'dateTimeRange', 'dateRange'].includes(val)
      }
    }
  },
  methods: {},
  render() {
    let vnode = null
    if (this.mode === 'date') {
      vnode = (
        <DatePicker ref="comp"
                    class="my-date-picker"
                    {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
                    vModel={this.fieldValue}>
        </DatePicker>
      )
    } else if (this.mode === 'dateTime' || this.mode === 'dateTimeRange' || this.mode === 'dateRange') {
      const typeMap = {
        dateTime: 'datetime',
        dateTimeRange: 'datetimerange',
        dateRange: 'daterange'
      }
      vnode = (
        <DatePicker ref="comp"
                    class="my-date-picker"
                    {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
                    type={typeMap[this.mode]}
                    vModel={this.fieldValue}>
        </DatePicker>
      )
    } else if (this.mode === 'time') {
      vnode = (
        <TimePicker ref="comp"
                    class="my-date-picker"
                    {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
                    vModel={this.fieldValue}>
        </TimePicker>
      )
    } else if (this.mode === 'timeSelect') {
      vnode = (
        <TimeSelect ref="comp"
                    class="my-date-picker"
                    {...{props: this.innerProps, on: this.$listeners, attrs: this.innerProps}}
                    vModel={this.fieldValue}>
        </TimeSelect>
      )
    }
    
    
    return this.renderComponent(vnode)
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['focus'])
  }
  
}
