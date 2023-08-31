import {CountUp} from 'countup.js'

export default {
  data() {
    this.counter = null
    return {}
  },
  watch: {
    value(val) {
      this.update(val)
    },
    countUpOptions() {
      if (!this.countUpOptions) return
      this.init()
    }
  },
  methods: {
    init: function () {
      this.setCountUp();
      if (this.countUpOptions.auto) {
        this.start()
      }
    },
    /**
     * 生成计数器
     */
    setCountUp: function () {
      if (this.counter) {
        this.counter = null
      }
      this.counter = new CountUp(this.$refs.container, this.value, this.countUpOptions)
    },
    /**
     * 重新启动计数器
     */
    restart() {
      this.setCountUp()
      this.start()
    },
    /**
     * 启动计数器
     */
    start() {
      this.reset()
      this.counter && this.counter.start(this.onComplete)
    },
    /**
     * 切换暂停/恢复计数器
     */
    pauseResume() {
      this.counter && this.counter.pauseResume()
    },
    /**
     * 重置计数器
     */
    reset() {
      this.counter && this.counter.reset()
    },
    /**
     * 更新计数器的结束时间
     * @param num 计数结束值
     */
    update(num) {
      if (num) {
        this.counter && this.counter.update(num)
      } else {
        this.counter && this.counter.update(this.value)
      }
    },
    /**
     * 计数器计数完成的回调方法
     */
    onComplete: function () {
      this.$emit('complete')
    }
  },
  mounted() {
    if (this.countUpOptions) {
      this.init()
    }
  },
  beforeDestroy() {
    this.counter = null
  }
}
