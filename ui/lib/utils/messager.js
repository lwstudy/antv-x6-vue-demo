/**
 * 跨域页面消息通信
 * @module $ui/utils/messager
 * @author 陈华春
 */

import {save, LOCAL} from './storage'

export const MESSAGE_TYPE = '__MY_WEB_MESSAGER__'

/**
 * 跨域页面消息通信类
 * @class
 */
export default class Messager {
  /**
   *
   * @param {object} options 实例化参数选项
   * @param {Window} [options.target] 通信目标，使用桥通讯时可以不传
   * @param {string} [options.bridge] 目标桥页面url，如需要跨浏览器窗口传输数据，必须要设置
   * @param {string} [options.origin] 自身的桥，目标可以通过桥联系到自己
   * @param {function} [options.ready] 桥页面加载完成时回调函数
   */
  constructor(options) {
    const o = this.options = {
      target: window,
      bridge: null,
      origin: null,
      ready: null,
      ...options
    }
    /**
     * 通信目标对象
     * @property {Window} target
     * @type {Window | *}
     */
    this.target = o.target
    this.handlers = {}
    this.proxyBridgeHandler = this.bridgeHandler.bind(this)
    window.addEventListener('storage', this.proxyBridgeHandler)
    if (o.bridge) {
      this.buildBridge().then((el) => {
        this.target = el.contentWindow
        this.el = el
        o.ready && o.ready(this)
      })
    } else {
      o.ready && o.ready(this)
    }
  }
  
  /**
   * 侦听消息
   * @param {string} type 消息类型
   * @param {Function} handler 处理函数
   */
  on(type, handler) {
    const listener = function (evt) {
      // message: {type:'XDH_WEB_MESSAGER', data:{type:'事件类型', data:{真正发送的数据},bridge:'' }}
      const message = evt.data || {}
      if (!message) return
      if (message.type === MESSAGE_TYPE && message.data.type === type) {
        handler(message.data.data, message.data.bridge)
      }
    }
    
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type].push(listener)
    window.addEventListener('message', listener)
  }
  
  /**
   * 取消侦听
   * @param {string} [type] 消息类型
   * @param {Function} [handler] 处理函数
   */
  off(type, handler) {
    // 制定类型和事件句柄
    if (type && handler) {
      const handlers = this.handlers[type] || []
      handlers.forEach((h, index) => {
        if (handler === h) {
          handlers.splice(index, 1)
          window.removeEventListener('message', h)
        }
      })
      // 制定事件类型
    } else if (type) {
      const handlers = this.handlers[type] || []
      handlers.forEach(h => {
        window.removeEventListener('message', h)
      })
      delete this.handlers[type]
      // 全不制定，全部取消侦听
    } else {
      Object.keys(this.handlers).forEach(key => {
        this.off(key)
      })
    }
  }
  
  /**
   * 发送消息
   * @param {string} [type] 消息类型
   * @param {Object} [data] 发送数据
   */
  fire(type, data) {
    if (!this.target) return
    
    const message = {
      type: MESSAGE_TYPE,
      data: {
        type,
        data,
        bridge: this.options.origin
      }
    }
    // 桥转发时，数据包多一层
    if (this.options.bridge) {
      const bridge = {
        type: MESSAGE_TYPE,
        data: message
      }
      this.target.postMessage(bridge, '*')
    } else {
      this.target.postMessage(message, '*')
    }
  }
  
  /**
   * 接收消息，只接收一次
   * @param {string} [type] 消息类型
   * @param {Function} [handler] 处理函数
   */
  once(type, handler) {
    this.on(type, () => {
      handler.apply(this, arguments)
      this.off(type, handler)
    })
  }
  
  /**
   * 搭桥，创建iframe，加载桥页面
   * @return {Promise<any>}
   */
  buildBridge() {
    return new Promise((resolve, reject) => {
      const el = document.createElement('iframe');
      el.style.display = 'none'
      el.setAttribute('src', this.options.bridge + '?t=' + new Date().getTime())
      el.onload = () => {
        resolve(el)
      }
      el.onerror = (e) => {
        reject(e)
      }
      document.body.appendChild(el)
    })
    
  }
  
  /**
   * 桥页面传输写入localStorage
   * @param {object} message
   * @param {string} origin 消息来源
   */
  pass(message) {
    save(MESSAGE_TYPE, {
      message: message,
      __t__: (new Date()).getTime()
    }, LOCAL)
  }
  
  /**
   * localStorage 事件处理函数
   * @param {object} evt
   */
  bridgeHandler(evt) {
    if (evt.key !== MESSAGE_TYPE) return
    const value = JSON.parse(evt.newValue)
    if (value && value.message) {
      const message = value.message
      const handlers = this.handlers[message.type] || []
      handlers.forEach(handler => {
        handler({
          data: {
            type: MESSAGE_TYPE,
            data: message
          }
        })
      })
    }
  }
  
  /**
   * 销毁
   */
  destroy() {
    this.off()
    if (this.proxyBridgeHandler) {
      window.removeEventListener('storage', this.proxyBridgeHandler)
    }
    if (this.el) {
      this.el.parentNode.removeChild(this.el)
    }
  }
}



