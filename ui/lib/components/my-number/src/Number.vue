<template>
  <div :class="classes" v-on="$listeners">
    <span v-if="prefix||$slots.prefix" class="my-number__prefix"><slot name="prefix">{{prefix}}</slot></span>
    <span class="my-number__value" ref="container">
      <slot :value="value" :displayValue="displayValue">{{displayValue}}</slot>
    </span>
    <span v-if="suffix||$slots.suffix" class="my-number__suffix"><slot name="suffix">{{suffix}}</slot></span>
    <span v-if="trend||$slots.trend"
          class="my-number__trend"
          :class="trendClasses">
      <slot name="trend" :trend="trend"><i :class="trendIcon"></i></slot>
    </span>
  </div>
</template>

<script>
  /**
   * 数字组件
   * @module $ui/components/my-number
   */
  import CountUp from './CountUp'

  const defaultCountUp = {
    auto: true, // 是否自动开始计数，默认为自动开始
    startVal: 0, // 计数初始值，不限正负数，默认值为0
    decimalPlaces: 0, // 计数器数值精度。默认值为0
    duration: 2, // 计数器动画持续时间，即计数器从开始到结束的时间，单位为秒，默认值为2秒
    useEasing: true, // 是否显示渐入渐出效果。默认值为显示
    useGrouping: true, // 计数器是否采用带格式的值，如10,000和10000两种格式（分隔符用separator来定义），默认值为使用
    separator: ',' // 分隔值的符号，默认值为‘,’（英文逗号）
  }
  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义显示内容，参数：value 原始值值，displayValue 显示值
   * @property {string} prefix 前缀内容
   * @property {string} suffix 后缀内容
   * @property {string} trend 个性化趋势显示，参数：trend 趋势方向
   */

  export default {
    name: 'MyNumber',
    mixins: [CountUp],
    /**
     * 属性参数
     * @member props
     * @property {number|string} [value] 原始值
     * @property {number} [defaultValue=0] 默认值，即value无效时取defaultValue, 如果 defaultValue为null，显示空白
     * @property {boolean|Object} [countUp] CountUp配置参数对象
     * @property {boolean} [countUp.auto=true] 是否自动开始计数，默认为自动开始
     * @property {number} [countUp.startVal=0] 计数初始值，不限正负数，默认值为0
     * @property {number} [countUp.duration=2] 计数器动画持续时间，即计数器从开始到结束的时间，单位为秒，默认值为2秒
     * @property {boolean} [countUp.useEasing=true] 是否显示渐入渐出效果。默认值为显示
     * @property {string} [trend] 趋势, 可选值：'up', 'down', '-'
     * @property {number} [precision=0] 精度，保留几位小数
     * @property {string} [separator=,] 分隔值的符号，默认值为‘,’（英文逗号）
     * @property {string} [prefix] 前缀内容，也可以用插槽定义
     * @property {string} [suffix] 后缀内容，也可以用插槽定义
     * @property {boolean} [percentage] 按百分比计算显示, 如value=0.2, 显示为 20%
     * @property {string} [type] 颜色类型, 可选值： 'primary', 'success', 'warning', 'danger', 'info'
     * @property {boolean} [sup] 前缀 和 后缀采用下标显示
     */
    props: {
      // 数字
      value: [Number, String],

      // 默认值
      defaultValue: {
        type: [Number, String],
        default: 0
      },
      // CountUp配置参数对象
      countUp: {
        type: [Boolean, Object]
      },
      // 趋势
      trend: {
        type: String,
        validator(val) {
          return ['up', 'down', '-'].includes(val)
        }
      },
      // 精度，保留几位小数
      precision: {
        type: Number,
        default: 0
      },
      // 分隔符
      separator: {
        type: String,
        default: ','
      },
      // 前缀
      prefix: {
        type: String
      },
      // 后缀
      suffix: String,

      // 按百分比计算显示
      percentage: Boolean,

      // 颜色类型
      type: {
        type: String,
        default: '',
        validator(val) {
          return ['', 'primary', 'success', 'warning', 'danger', 'info'].includes(val)
        }
      },
      // 前缀 和 后缀采用下标显示
      sup: Boolean

    },
    computed: {
      displayValue() {
        if (!this.isNumber(this.value)) {
          return this.defaultValue ? this.getPercent(this.defaultValue) : ''
        }

        if (this.percentage) {
          return this.getPercent(this.value)
        }

        return this.format(this.value, this.precision, this.separator)
      },
      trendIcon() {
        if (!this.trend) return null
        const classes = {
          up: 'el-icon-top',
          down: 'el-icon-bottom',
          '-': 'el-icon-minus'
        }
        return classes[this.trend]
      },
      trendClasses() {
        if (!this.trend) return
        if (this.trend === '-') {
          return 'is-default'
        }
        return `is-${this.trend}`
      },
      classes() {
        return {
          'my-number': true,
          'is-pointer': this.$listeners.click,
          [`is-${this.type}`]: !!this.type
        }
      },
      supClass() {
        return {
          'my-number__sup': !!this.sup
        }
      },
      countUpOptions() {
        if (!this.countUp) return null
        return {
          ...defaultCountUp,
          ...this.countUp,
          separator: this.separator,
          decimalPlaces: this.precision
        }
      }
    },
    methods: {
      isNumber(n) {
        const val = Number.parseFloat(n)
        return !Number.isNaN(val) && Number.isFinite(val)
      },
      getPercent(val) {
        return this.percentage
          ? `${(Number.parseFloat(val) * 100).toFixed(this.precision)}%`
          : val
      },
      /**
       * 数字显示分隔符
       * @param val
       * @param n
       * @param separator
       * @return {string}
       */
      format(val, n, separator) {
        const s = Number.parseFloat(String(val).replace(/[^\d.-]/g, '')).toFixed(n) + '';
        const l = s.split('.')[0].split('').reverse()
        const r = s.split('.')[1]
        let t = ''
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? `${separator}` : '');
        }
        return t.split('').reverse().join('') + (r ? `.${r}` : '')
      }
    }
  }
</script>

