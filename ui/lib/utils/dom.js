/**
 * dom操作模块, 更多dom操作可以使用 element-ui/lib/util/dom
 * @module $ui/utils/dom
 * @author 陈华春
 */


/**
 * 动画滚动到顶部 scrollTop animation
 * @param {HTMLElement} el DOM元素
 * @param {Number} [from=0] 开始位置
 * @param {Number} to  滚动到位置
 * @param {Number} [duration=500] 动画持续时间
 */
export function scrollTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)
  
  function scroll(start, end, step) {
    if (start === end) return
    
    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }
    
    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  
  scroll(from, to, step)
}

/**
 * 在元素前插入元素
 * @param {HTMLElement} newEl 新DOM元素
 * @param {HTMLElement} targetEl 在指定目标DOM元素前插入
 */
export function insertAfter(newEl, targetEl) {
  const parentEl = targetEl.parentNode
  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl)
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling)
  }
}

/**
 * 判断元素是否隐藏
 * @param  {HTMLElement} el 元素DOM对象
 * @return {boolean} 是否隐藏
 */
export function isHidden(el) {
  const style = window.getComputedStyle(el);
  return (style.display === 'none' || style.visibility === 'hidden')
}
