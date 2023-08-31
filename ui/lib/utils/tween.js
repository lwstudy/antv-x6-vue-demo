/**
 * 缓动动画函数和各类算法
 * @module $ui/utils/tween
 * @author 陈华春
 */

// 动画每秒60帧
const UPDATE_TIME = 1000 / 60

const pow = Math.pow
const sqrt = Math.sqrt
const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5

// 动画执行函数
const rAF = window.requestAnimationFrame || function (cb) {
  setTimeout(cb, UPDATE_TIME)
}

/**
 * 缓动动画函数
 * @param {number} startValue 开始时的值
 * @param {number} endValue 结束时的值
 * @param {number} during 动画持续时间，单位：毫秒
 * @param {Function} easingFunc 缓动算法函数
 * @param {function} stepCb 每次改变的回调函数
 * @returns {Promise} Promise实例
 *
 * @example
 *
 *  import tween, {easeInCubic} from '@/utils/tween'
 *  tween(0, 100, 300, easeInCubic, function(val){
 *      console.log(val)
 *      // to do something
 *  })
 */
export default function (startValue, endValue, during, easingFunc, stepCb) {
  // 改变的值大小
  const changeValue = endValue - startValue
  // 指定时间内更新的次数
  const updateCount = during / UPDATE_TIME
  // 每次更新的值距离
  const perUpdateDistance = 1 / updateCount
  let position = 0
  return new Promise(resolve => {
    function step() {
      const state = startValue + changeValue * easingFunc(position)
      let result = stepCb(state)
      // 如果返回false，停止运行
      if (result === false) return
      position += perUpdateDistance
      if (position < 1) {
        rAF(step)
      } else {
        rAF(() => {
          result = stepCb(endValue)
          if (result === false) return
          resolve()
        })
      }
    }

    step()
  })
}

/**
 * easeInQuad
 * @param {number} x
 * @returns {number}
 */
export function easeInQuad(x) {
  return x * x
}

/**
 * easeOutQuad
 * @param {number} x
 * @returns {number}
 */
export function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x)
}

/**
 * easeInOutQuad
 * @param x
 * @returns {number}
 */
export function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
}

/**
 * easeInCubic
 * @param x
 * @returns {number}
 */
export function easeInCubic(x) {
  return x * x * x
}

/**
 * easeOutCubic
 * @param x
 * @returns {number}
 */
export function easeOutCubic(x) {
  return 1 - pow(1 - x, 3)
}

/**
 * easeInOutCubic
 * @param x
 * @returns {number}
 */
export function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

/**
 * easeInQuart
 * @param x
 * @returns {number}
 */
export function easeInQuart(x) {
  return x * x * x * x;
}

/**
 * easeInQuart
 * @param x
 * @returns {number}
 */
export function easeOutQuart(x) {
  return 1 - pow(1 - x, 4)
}

/**
 * easeInOutQuart
 * @param x
 * @returns {number}
 */
export function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
}

/**
 * easeInQuint
 * @param x
 * @returns {number}
 */
export function easeInQuint(x) {
  return x * x * x * x * x
}

/**
 * easeOutQuint
 * @param x
 * @returns {number}
 */
export function easeOutQuint(x) {
  return 1 - pow(1 - x, 5)
}

/**
 * easeInOutQuint
 * @param x
 * @returns {number}
 */
export function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
}

/**
 * easeInSine
 * @param x
 * @returns {number}
 */
export function easeInSine(x) {
  return 1 - cos(x * PI / 2)
}

/**
 * easeOutSine
 * @param x
 * @returns {number}
 */
export function easeOutSine(x) {
  return sin(x * PI / 2)
}

/**
 * easeInOutSine
 * @param x
 * @returns {number}
 */
export function easeInOutSine(x) {
  return -(cos(PI * x) - 1) / 2
}

/**
 * easeInExpo
 * @param x
 * @returns {number}
 */
export function easeInExpo(x) {
  return x === 0 ? 0 : pow(2, 10 * x - 10)
}

/**
 * easeOutExpo
 * @param x
 * @returns {number}
 */
export function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x)
}

export function easeInOutExpo(x) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2
}

/**
 * easeInCirc
 * @param x
 * @returns {number}
 */
export function easeInCirc(x) {
  return 1 - sqrt(1 - pow(x, 2))
}

/**
 * easeOutCirc
 * @param x
 * @returns {number}
 */
export function easeOutCirc(x) {
  return sqrt(1 - pow(x - 1, 2))
}

export function easeInOutCirc(x) {
  return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
}

/**
 * easeInElastic
 * @param x
 * @returns {number}
 */
export function easeInElastic(x) {
  return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
}

/**
 * easeOutElastic
 * @param x
 * @returns {number}
 */
export function easeOutElastic(x) {
  return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
}

export function easeInOutElastic(x) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1
}

/**
 * easeInBack
 * @param x
 * @returns {number}
 */
export function easeInBack(x) {
  return c3 * x * x * x - c1 * x * x
}

/**
 * easeOutBack
 * @param x
 * @returns {number}
 */
export function easeOutBack(x) {
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
}

/**
 * easeInOutBack
 * @param x
 * @returns {number}
 */
export function easeInOutBack(x) {
  return x < 0.5 ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
}

/**
 * easeInBounce
 * @param x
 * @returns {number}
 */
export function easeInBounce(x) {
  return 1 - easeOutBounce(1 - x)
}

/**
 * easeOutBounce
 * @param x
 * @returns {number}
 */
export function easeOutBounce(x) {
  const n1 = 7.5625
  const d1 = 2.75
  if (x < 1 / d1) {
    return n1 * x * x
  } else if (x < 2 / d1) {
    return n1 * (x -= (1.5 / d1)) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= (2.25 / d1)) * x + 0.9375;
  } else {
    return n1 * (x -= (2.625 / d1)) * x + 0.984375;
  }
}

/**
 * easeInOutBounce
 * @param x
 * @returns {number}
 */
export function easeInOutBounce(x) {
  return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2
}
