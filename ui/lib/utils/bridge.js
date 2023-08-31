/**
 * 跨窗口消息传递
 * @module $ui/utils/bridge
 */
import Messager from './messager'

import {uid} from './util'

/**
 * 向目标发送信息
 * @param {object} options 参数对象
 * @param {string} options.bridge 目标的桥页面url地址
 * @param {string} options.channel 消息频道名称
 * @param {*} [options.data] 消息内容
 * @param {string} [options.origin] 自身的桥地址，目标可以通过桥联系到自己
 */
export function fire({bridge, channel, data, origin}) {
  return new Messager({
    bridge: bridge,
    origin: origin,
    ready(instance) {
      instance.fire(channel, data)
      setTimeout(() => {
        instance.destroy()
      }, 0)
    }
  })
}

/**
 * 接收目标发送过来的信息
 * @param channel 消息频道名称
 * @param handler 消息处理函数
 * @param opts Messager参数
 * @return {Messager}
 */
export function on(channel, handler, opts = {}) {
  const instance = new Messager(opts)
  instance.on(channel, handler)
  return instance
}

/**
 * 接收目标发送过来的信息, 只接收一次
 * @param channel 消息频道名称
 * @param handler 消息处理函数
 * @return {Messager}
 */
export function once(channel, handler) {
  const instance = on(channel, (data) => {
    handler(data)
    instance.destroy()
  })
  return instance
}

/**
 * 调用消息服务
 * @param {string} name 服务名称
 * @param {string} bridge 服务提供方的桥页面地址
 * @param {*} data 发送的数据
 * @param {string} origin 自己的桥页面地址
 * @param {function} callback 回调函数，服务提供方响应的数据通过回调返回
 *
 * @example
 *
 *   // 请求服务
 service({
        name: 'MyService',
        bridge: 'http://localhost:8001/app1/assets/bridge/index.html',
        origin: 'http://localhost:8000/assets/bridge/index.html',
        data: {
          id: '123'
        },
        callback(res) {
          console.log('服务响应信息', res)
        }
      })
 */
export function service({name, bridge, data, origin, callback}) {
  const _uid = uid()
  const postMessage = {
    uid: _uid,
    data: data
  }
  // 如果有回调，以uid为事件名称的通道接收回调数据
  if (callback) {
    const callbackId = name + _uid
    once(callbackId, message => {
      // uid匹配才触发回调
      if (message.uid === _uid) {
        callback(message.data)
      }
    })
  }
  
  fire({bridge, data: postMessage, origin, channel: name})
}

/**
 * 创建服务提供者
 * @param {string} name 服务名称
 * @param {string} origin 自己的桥页面地址
 * @param {function} handler 服务消息句柄函数，当服务被调用时触发，参数：data（调用服务传过来的数据），callback响应函数，通过回调响应给调用者
 * @return {Messager}
 *
 * @example
 *
 *  // 创建一个服务提供者
 *  const messager = provider({
        name: 'MyService',
        origin: 'http://localhost:8000/assets/bridge/index.html',
        handler: function (data, callback) {
          const response = '响应内容'
          callback(response)
        }
      })
 // 销毁
 messager.destroy()
 */
export function provider({name, origin, handler}) {
  return on(name, (message, bridge) => {
    const callbackId = name + message.uid
    const callback = (data) => {
      fire({
        bridge,
        data: {uid: message.uid, data: data},
        origin,
        channel: callbackId
      })
    }
    
    handler(message.data, callback)
  })
  
}
