import Vue from 'vue'
import {setStyle} from 'element-ui/lib/utils/dom'

// We only handle element & text node.
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;


const wrapperStyle = {
  padding: 0,
  margin: 0,
  display: 'inline',
  lineHeight: 'inherit'
};

/**
 * 像素转换成数字类型
 * @param {string} value
 * @return {number}
 */
function pxToNumber(value) {
  if (!value) return 0;
  
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}

/**
 * 样式对象转换成字符串形式
 * @param {Object} style
 * @return {string}
 */
function styleToString(style) {
  const styleNames = Array.prototype.slice.apply(style);
  return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
}


/**
 * 创建临时容器
 * @param {Object} style
 * @return {HTMLElement}
 */
function createEllipsisContainer(style) {
  const el = document.createElement('div')
  const originCSS = styleToString(style)
  el.setAttribute('style', originCSS)
  setStyle(el, {
    position: 'fixed',
    left: '0',
    height: 'auto',
    minHeight: 'auto',
    maxHeight: 'auto',
    top: '-999999px',
    zIndex: '-1000',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    webkitLineClamp: 'none'
  })
  document.body.appendChild(el)
  return el
}

/**
 *
 * 删除临时容器
 * @param {HTMLElement} el
 */
function removeEllipsisContainer(el) {
  el.parentNode.removeChild(el)
}

/**
 * 实例化用于计算的临时DOM
 * @param el
 * @param content
 * @param fixedContent
 * @return {*}
 */
function instanceVue(el, content, fixedContent) {
  const Container = Vue.extend({
    functional: true,
    render() {
      return (
        <div style={wrapperStyle}>
          <span style={wrapperStyle}>{content}</span>
          <span style={wrapperStyle}>{fixedContent}</span>
        </div>
      )
    }
  })
  
  const vm = new Container()
  vm.$mount()
  el.appendChild(vm.$el)
  return vm
}

/**
 * 销毁临时DOM
 * @param vm
 */
function destroyVue(vm) {
  vm.$destroy()
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 检查是否在范围内，超出范围需要显示省略号
 * @param el
 * @param maxHeight
 * @return {boolean}
 */
function inRange(el, maxHeight) {
  return el.offsetHeight < maxHeight
}

/**
 *  createEllipsisContentHolder
 * @param el
 * @param ellipsisTextNode
 * @return {HTMLSpanElement}
 */
function createEllipsisContentHolder(el, ellipsisTextNode) {
  el.innerHTML = ''
  // Create origin content holder
  const ellipsisContentHolder = document.createElement('span');
  el.appendChild(ellipsisContentHolder);
  ellipsisContentHolder.appendChild(ellipsisTextNode);
  return ellipsisContentHolder
}

/**
 * Append before fixed nodes
 * @param ellipsisContentHolder
 * @param node
 * @param ellipsisTextNode
 */
function appendChildNode(ellipsisContentHolder, node, ellipsisTextNode) {
  ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
}

/**
 * 计算省略文本
 * @param {HTMLElement} originEle
 * @param {Number} rows
 * @param {VNode[]} content
 * @param {VNode[]} fixedContent
 * @param {string} ellipsisStr
 * @return {Object}
 */
export default function (originEle, rows, content, fixedContent, ellipsisStr = '...') {
  
  // 获取原始样式
  const originStyle = window.getComputedStyle(originEle)
  const ellipsisContainer = createEllipsisContainer(originStyle)
  const lineHeight = pxToNumber(originStyle.lineHeight) || 16
  const maxHeight = lineHeight * (rows + 1) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom)
  if (maxHeight === 0) {
    removeEllipsisContainer(ellipsisContainer)
    return {
      content,
      ellipsis: false
    }
  }
  const vm = instanceVue(ellipsisContainer, content, fixedContent)
  
  if (inRange(ellipsisContainer, maxHeight)) {
    destroyVue(vm)
    removeEllipsisContainer(ellipsisContainer)
    return {
      content,
      ellipsis: false
    }
  }
  
  const cloneNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes)
  const childNodes = cloneNodes.filter(nodeType => nodeType !== COMMENT_NODE)
  const fixedNodes = Array.prototype.slice.apply(
    ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes
  )
  
  destroyVue(vm)
  
  // ========================= Find match ellipsis content =========================
  
  const ellipsisChildren = []
  const ellipsisTextNode = document.createTextNode(ellipsisStr)
  const ellipsisContentHolder = createEllipsisContentHolder(ellipsisContainer, ellipsisTextNode)
  
  fixedNodes.forEach(childNode => {
    ellipsisContainer.appendChild(childNode);
  });
  
  function measureText(textNode, fullText, startLoc = 0, endLoc = fullText.length, lastSuccessLoc = 0) {
    const midLoc = Math.floor((startLoc + endLoc) / 2)
    textNode.textContent = fullText.slice(0, midLoc)
    
    if (startLoc >= endLoc - 1) {
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step)
        textNode.textContent = currentStepText
        if (inRange(ellipsisContainer, maxHeight)) {
          return step === fullText.length
            ? {
              finished: false,
              vnode: fullText
            }
            : {
              finished: true,
              vnode: currentStepText
            }
        }
      }
    }
    
    if (inRange(ellipsisContainer, maxHeight)) {
      return measureText(textNode, fullText, midLoc, endLoc, midLoc);
    }
    
    return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc)
  }
  
  function measureNode(childNode, index) {
    const type = childNode.nodeType
    
    if (type === ELEMENT_NODE) {
      appendChildNode(ellipsisContentHolder, childNode, ellipsisTextNode)
      if (inRange(ellipsisContainer, maxHeight)) {
        return {
          finished: false,
          vnode: content[index]
        }
      }
      // Clean up if can not pull in
      ellipsisContentHolder.removeChild(childNode)
      return {
        finished: true,
        vnode: null
      }
    }
    
    if (type === TEXT_NODE) {
      const fullText = childNode.textContent || '';
      const textNode = document.createTextNode(fullText);
      appendChildNode(ellipsisContentHolder, textNode, ellipsisTextNode)
      return measureText(textNode, fullText);
    }
    
    return {
      finished: false,
      vnode: null
    }
  }
  
  
  childNodes.some((childNode, index) => {
    const {finished, vnode} = measureNode(childNode, index);
    if (vnode) {
      ellipsisChildren.push(vnode);
    }
    return finished;
  });
  
  removeEllipsisContainer(ellipsisContainer)
  
  return {
    content: ellipsisChildren,
    ellipsis: true
  }
}
