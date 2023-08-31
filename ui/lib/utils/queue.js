/**
 * 队列任务处理模块，可以用来处理依次执行的操作
 * @module $ui/utils/queue
 * @author 陈华春
 */
import Events from './events'

const taskFunc = function (data) {
  return Promise.resolve(data)
}

/**
 * 队列任务处理类  继承 [Events]{@link module:utils/events~Events}
 * @extends Events
 *
 * @example
 *
 *     let queue = new Queue(data => {
 *       return new Promise((resolve, reject) => {
 *          setTimeout(() => {
 *           resolve('ok')
 *          }, 1000)
 *        })
 *       }).start()
 *       queue.push(1)
 *       queue.push(2)
 */
class Queue extends Events {
  /**
   * 构造函数
   * @param {Function} task 任务处理函数，必须返回Promise实例
   * @param {Array} list 初始队列数据
   */
  constructor(task, list = []) {
    super()
    /**
     * 任务列表，任务处理的参数列表
     * @type {Array}
     * @private
     */
    this.__list__ = list
    /**
     * 当前实例是否在等待任务执行结果
     * @type {boolean}
     */
    this.waiting = false
    /**
     * 当前实例是否有任务在执行
     * @type {boolean}
     */
    this.running = false
    
    
    /**
     * 任务处理函数，函数返回值必须是Promise实例
     * @type {Function}
     */
    this.task = task || taskFunc
    
    
  }
  
  /**
   * 在队列中加入需要处理的任务数据，如果
   * @param {*} data 任务数据
   * @returns {Queue}
   */
  push(data) {
    if (Array.isArray(data)) {
      this.__list__ = this.__list__.concat(data)
    } else {
      this.__list__.push(data)
    }
    this.run()
    return this
  }
  
  /**
   *  执行队列处理
   */
  run() {
    if (!this.running || this.waiting || this.__list__.length === 0) return
    this.waiting = true
    const data = this.__list__.shift()
    this.task(data).then(res => {
      this.waiting = false
      /**
       * 当前任务执行成功时触发
       * @event module:utils/queue~Queue#success
       * @param {*} res 任务函数resolve内容
       * @param {*} data 当前任务的参数数据
       */
      this.$emit('success', res, data)
      if (this.__list__.length > 0) {
        this.run()
      } else {
        /**
         * 当前队列任务执行完成时触发
         * @event module:utils/queue~Queue#complete
         */
        this.$emit('complete', this)
      }
    }).catch(e => {
      this.waiting = false
      /**
       * 当前任务执行失败时触发
       * @event module:utils/queue~Queue#error
       * @param {*} e 任务函数reject内容
       * @param {*} data 当前任务的参数数据
       */
      this.$emit('error', e, data, this)
    })
    return this
  }
  
  /**
   * 清空队列任务
   */
  clear() {
    this.__list__ = []
    this.waiting = false
    return this
  }
  
  /**
   * 开始运行队列处理任务
   * @returns {Queue}
   */
  start() {
    this.running = true
    this.run()
    return this
  }
  
  /**
   * 停止队列处理任务
   * @returns {Queue}
   */
  stop() {
    this.running = false
    return this
  }
  
  /**
   * 销毁
   */
  destroy() {
    super.destroy()
    this.stop()
    this.clear()
  }
}

/**
 * 导出Queue
 * @export
 */
export default Queue
