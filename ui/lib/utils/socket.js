/**
 * WebSocket 通信模块
 * @module $ui/utils/socket
 */
import Events from './events'

/**
 * 验证参数是否合法
 * @private
 * @param {object} options
 * @returns {boolean}
 */
function validateParam(options = {}) {
  if (!window.WebSocket) {
    throw new Error('浏览器不支持 WebSocket')
  }
  if (!options.server) {
    throw new Error('缺少 server 参数')
  }
  return true
}

/**
 * Socket 类
 * @export
 *
 * @example
 *   const socket = new Socket({
 *    server: WEB_SOCKET_SOCKET
 *   })
 *  socket.$on('open', function () {
 *     socket.send('发送消息')
 *  })
 *  socket.$on('message', function (m) {
 *     console.log('收到信息：' + m)
 *  })
 *
 */
export default class Socket extends Events {
  /**
   * 构造函数
   * @constructor
   * @param {object} options 实例化参数
   * @param {string} options.server 服务器地址，如：ws://127.0.0.1:3000
   * @param {boolean} [options.reconnect=true] 是否自动重连接
   * @param {boolean} [options.reconnectDelay=3000] 重连接延时
   */
  constructor(options = {}) {
    super()
    validateParam(options)
    this.options = {
      server: '',
      reconnect: true,
      reconnectDelay: 3000,
      maxConnectTimes: 0,
      ...options
    }
    this.isConnected = false
    this.ws = null
    this.reconnectTimer = null
    this.isReconnecting = false
    this.connectTimes = 0
    this.connect()
  }
  
  /**
   * 建立连接
   */
  connect() {
    const o = this.options
    this.ws = new WebSocket(o.server)
    this.ws.onmessage = this.handleMessage.bind(this)
    this.ws.onopen = this.handleOpen.bind(this)
    this.ws.onclose = this.handleClose.bind(this)
    this.ws.onerror = this.handleError.bind(this) // this.handleConnect.bind(this)
    this.connectTimes += 1 // 连接次数+1
  }
  
  delayReconnect() {
    if (this.options.maxConnectTimes > 0 && this.connectTimes >= this.options.maxConnectTimes) { // 超过最大重连次数
      console.log('ws stop forever, please run ‘handleConnect’ to restart')
      return
    }
    this.isConnected = false
    this.isReconnecting = true
    this.reconnectTimer = setTimeout(() => {
      this.reconnect()
    }, this.options.reconnectDelay)
  }
  
  handleOpen() {
    this.isConnected = true
    /**
     * 连接建立成功触发
     * @event open
     */
    this.$emit('open', this)
  }
  
  handleClose() {
    /**
     * 连接关闭触发
     * @event close
     */
    this.$emit('close', this)
    if (this.options.reconnect && !this.isReconnecting) {
      this.delayReconnect()
    }
  }
  
  handleError() {
    /**
     * 连接错误触发
     * @event error
     */
    this.$emit('error', this)
    if (this.options.reconnect && !this.isReconnecting) {
      this.delayReconnect()
    }
  }
  
  handleConnect() {
    this.connectTimes = 0
    this.isConnected = false
    this.reconnectTimer = setTimeout(() => {
      this.reconnect()
    }, this.options.reconnectDelay)
  }
  
  handleMessage(evt) {
    let info = evt.data
    if (info) {
      const regex = /^\{[\W\w]*\}$/
      info = regex.test(info) ? JSON.parse(info) : info;
    }
    /**
     * 收到消息触发
     * @event message
     * @param {String|Object} info 消息
     */
    this.$emit('message', info)
  }
  
  /**
   * 重新连接
   */
  reconnect() {
    clearTimeout(this.reconnectTimer)
    if (this.isConnected) return 
    this.isReconnecting = false 
    this.connect()
  }
  
  /**
   * 发送信息
   * @param {Object|String} message 消息内容
   */
  send(message) {
    const str = typeof message === 'object' ? JSON.stringify(message) : message
    this.ws.send(str)
  }
  
  /**
   * 获取WebSocket状态
   * @returns {*}
   */
  getState() {
    // 0: 未连接，1：已连接，2：正在关闭，3：已关闭或连接打不开
    return this.ws.readyState
  }
  
  /**
   * 关闭连接
   */
  close() {
    this.ws.close()
  }
  
  /**
   * 销毁
   */
  destroy() {
    this.close()
    super.destroy()
    this.ws.onmessage = null
    this.ws.onopen = null
    this.ws.onclose = null
    this.ws.onerror = null
    this.ws = null
  }
}

