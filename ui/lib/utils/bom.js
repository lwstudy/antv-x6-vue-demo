/**
 *  BOM 模块
 *  @module $ui/utils/bom
 */

/**
 * 浏览器全屏
 * @param {HTMLElement} [el=document] 全屏元素
 */
export function fullScreen(el) {
  el = el || document.documentElement;
  const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (typeof rfs !== 'undefined' && rfs) {
    rfs.call(el);
  }
}

/**
 * 退出全屏
 */
export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * 浏览器当前是否全屏
 * @return {*|boolean}
 */
export function isFullScreen() {
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
}
