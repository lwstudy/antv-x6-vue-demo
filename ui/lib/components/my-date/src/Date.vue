<template>
  <div :class="classes">
    <span v-if="$slots.prefix"><slot name="prefix"></slot></span>
    <span class="my-date__value"><slot :value="value"
                                       :displayValue="displayValue"
                                       :dayjs="dayjs">{{displayValue}}</slot></span>
    <span v-if="$slots.suffix"><slot name="suffix"></slot></span>
  </div>
</template>

<script>
  /**
   * 日期时间格式化组件
   * @module $ui/components/my-date
   */
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import 'dayjs/locale/zh-cn'

  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，自定义显示内容，参数：value 原始值，displayValue 显示值， dayjs 日期时间实例
   * @property {string} prefix 前缀内容
   * @property {string} suffix 后缀内容
   */
  export default {
    name: 'MyDate',
    /**
     * 属性参数
     * @member props
     * @property {string|number|Date} [value] 可转换成日期时间的数据，默认当前时间
     * @property {string|number|Date} [defaultValue] 默认值, 当value无法转换成日期时间时，取该默认值，如果 defaultValue为null，显示空白
     * @property {string} [format=YYYY-MM-DD HH:mm:ss] 日期时间显示格式 对相对时间无效，支持：年Y 月M 日D 时H 分m 秒s 时区Z 上下午A
     * @property {boolean} [relative=false] 启用相对时间显示
     * @property {string} [type] 文本颜色，可选值：'primary', 'success', 'warning', 'danger', 'info'
     * @property {boolean} [tick=false] 时间按秒心跳，保持实时更新, 对相对时间无效
     */
    props: {

      // 原始值
      value: [String, Number, Date],

      // 默认值
      defaultValue: {
        type: [String, Number, Date],
        default() {
          return null
        }
      },

      // 显示格式， 对相对时间无效
      format: {
        type: String,
        default: 'YYYY-MM-DD HH:mm:ss'
      },

      // 启用相对时间模式
      relative: Boolean,

      // 颜色
      type: {
        type: String,
        validator(val) {
          return ['', 'primary', 'success', 'warning', 'danger', 'info'].includes(val)
        }
      },

      // 时间保持实时更新, 对相对时间无效
      tick: Boolean
    },
    data() {
      this.timerId = null
      return {
        /**
         * dayjs实例
         * @member dayjs
         * @type {Dayjs}
         */
        dayjs: null
      }
    },
    computed: {
      classes() {
        return {
          'my-date': true,
          [`is-${this.type}`]: !!this.type
        }
      },
      displayValue() {
        if (!this.dayjs) return ''
        if (this.relative) {
          return this.dayjs.fromNow()
        }
        return this.dayjs.format(this.format)
      }
    },
    watch: {
      value: {
        immediate: true,
        handler() {
          this.stop()
          this.init()
        }
      },
      tick(val) {
        val ? this.start() : this.stop()
      }
    },
    methods: {
      init() {
        let instance = dayjs(this.value)
        if (!instance.isValid()) {
          instance = this.defaultValue ? dayjs(this.defaultValue) : null
        }
        this.dayjs = instance
        this.tick ? this.start() : this.stop()
      },
      start() {
        if (!this.dayjs) return
        clearInterval(this.timerId)
        this.timerId = setInterval(() => {
          this.dayjs = this.dayjs.add(1, 'second')
        }, 1000)
      },
      stop() {
        clearInterval(this.timerId)
        this.timerId = null
      }
    },
    beforeDestroy() {
      this.stop()
      this.dayjs = null
    }
  }
</script>
