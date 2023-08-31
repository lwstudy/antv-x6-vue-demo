/**
 * 范围输入框组件，继承Base
 * @module $ui/components/my-range
 */

import {DatePicker, InputNumber, TimeSelect} from 'element-ui'
import Base from '../Base'

export default {
  name: 'MyRange',
  mixins: [Base],
  components: {
    InputNumber,
    DatePicker,
    TimeSelect
  },
  props: {
    // 值
    value: {
      type: Array,
      default() {
        return []
      }
    },
    // 模式
    mode: {
      type: String,
      default: 'number',
      validator(val) {
        return ['number', 'time', 'date', 'datetime'].includes(val)
      }
    },
    // 分隔符
    separator: {
      type: String,
      default: '-'
    } 
  },
  data() {
    return {
      min: '', 
      max: '' 
    }
  },
  watch: {
    fieldValue: {
      immediate: true,
      handler(val) {
        this.min = val[0] || (this.mode === 'number' ? 0 : '')
        this.max = val[1] || (this.mode === 'number' ? 0 : '')
      }
    },
    min(val) {
      this.fieldValue = [val, this.max]
      this.$emit('change', this.fieldValue)
    },
    max(val) {
      this.fieldValue = [this.min, val]
      this.$emit('change', this.fieldValue)
    }
  },
  methods: {
    getDefaultValue() {
      if (this.mode === 'number') {
        return [0, 0]
      } else {
        return ['', '']
      }
    },
    createSeparator() {
      return <span class="my-range__separator">{this.separator}</span>
    },
    renderNumber() {
      return [
        <InputNumber class="my-range__input" {...{props: this.innerProps, attrs: this.innerProps}}
                     vModel={this.min}></InputNumber>,
        this.createSeparator(),
        <InputNumber class="my-range__input" {...{props: this.innerProps, attrs: this.innerProps}}
                     vModel={this.max}></InputNumber>
      ]
    },
    renderDate() {
      return [
        <DatePicker class="my-range__input" {...{props: {...this.innerProps, type: this.mode}, attrs: this.innerProps}}
                    vModel={this.min}></DatePicker>,
        this.createSeparator(),
        <DatePicker class="my-range__input" {...{props: {...this.innerProps, type: this.mode}, attrs: this.innerProps}}
                    vModel={this.max}></DatePicker>
      ]
    },
    renderTime() {
      return [
        <TimeSelect class="my-range__input" {...{props: this.innerProps, attrs: this.innerProps}}
                    vModel={this.min}></TimeSelect>,
        this.createSeparator(),
        <TimeSelect class="my-range__input" {...{props: this.innerProps, attrs: this.innerProps}}
                    vModel={this.max}></TimeSelect>
      ]
    }
  },
  render() {
    const map = {
      number: this.renderNumber,
      date: this.renderDate,
      datetime: this.renderDate,
      time: this.renderTime
    }
    const vnode = (
      <div class="my-range">
        {map[this.mode]()}
      </div>
    )
    return this.renderComponent(vnode)
  }
  
}
