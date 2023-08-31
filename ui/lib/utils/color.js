/**
 * 颜色相关工具函数
 * @module $ui/utils/color
 * @author 黄吉平
 */
import ColorMap from '$ui/assets/color.json'
/**
 * 判断是否rbg格式颜色值
 * @param {String} rgba rgba字符串
 * @return {boolean}
 * 
 * @example
 * // 传入rgb / rgba 格式的字符串进行判断
 *  isRgb('rgba(0,0,0,1)') true
 *  isRgb('rgb(0, 0, 0)') true
 *  isRgb('rgb(a, b, c)') false
 *  isRgb('0, 0, 0') false
 */
export const isRgb = function (val) {
  const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/
  return !!val.replace(/\s+/g, '').match(regRgba)
}

/**
 * 判断是否Hex格式颜色值
 * @param {String} hex #cccccc
 * @return {boolean}
 * 
 * @example
 * // 传入rgb / rgba 格式的字符串进行判断
 *  isHex('#ffffff') true
 */
export const isHex = function (val) {
  return (/^#/g).test(val)
}

/**
 * rgb颜色转Hex格式颜色值
 * @param {String} rgba 合法的rgba字符串：'rgba(x, y, z, opacity)' / 'rgb(x,y,x)'
 * @return {Object} {hex: 颜色值, alpha: 透明度(0-100)}
 * 
 * @example
 * // 传入rgb / rgba 格式的字符串进行输出
 * rgbToHex('rgba(221,160,221,0.5)') => {hex: "#dda0dd", alpha: 50}
 */
export const rgbToHex = function(val) { // RGB(A)颜色转换为HEX十六进制的颜色值
  let r, g, b, a
  const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/, // 判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
  rsa = val.replace(/\s+/g, '').match(regRgba);
  if(!!rsa) {
      r = parseInt(rsa[1]).toString(16);
      r = r.length === 1 ? '0' + r : r;
      g = (+rsa[2]).toString(16);
      g = g.length === 1 ? '0' + g : g;
      b = (+rsa[3]).toString(16);
      b = b.length === 1 ? '0' + b : b;
      a = (+(rsa[5] ? rsa[5] : 1)) * 100;
      return {hex: '#' + r + g + b, alpha: Math.ceil(a)};
  }else{
      return {hex: val, alpha: 100};
  }    
}

/**
 * Hex颜色转rgb格式颜色值
 * @param {String} hex 合法的Hex字符串：'#778899'
 * @return {Object} {rgba: rgb(119,136,153)}
 * 
 * @example
 * // 传入Hex字符串进行输出
 * hexToRgb('#614700') => {rgba: "rgb(97,71,0)"}
 */
export const hexToRgb = function(val) { // HEX十六进制颜色值转换为RGB(A)颜色值
  let a, b, c
  if ((/^#/g).test(val)) {
    a = val.slice(1, 3)
    b = val.slice(3, 5)
    c = val.slice(5, 7)
    return {
      rgba: 'rgb(' + parseInt(a, 16) + ',' + parseInt(b, 16) + ',' + parseInt(c, 16) + ')'
    };
  } else {
    return {rgba: ''};
  }
}

/**
 * 从rgba() 格式颜色重提取rgb数值
 * @param {String} rgba 合法的rgba字符串：'rgba(221, 160, 221, 0.5)' / 'rgba(221,160,221,1)'
 * @return {String} '221, 160, 221'
 * 
 * @example
 * // 传入合法的rgba格式字符串，提取rgb数值
 * getRgb('rgba(221, 160, 221, 0.5)') => '221, 160, 221'
 */
export const getRgb = function (rgba) {
  const match = rgba.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/)
  return match ? `${match[1]},${match[2]},${match[3]}` : ''
}

/**
 * 传入代表颜色的字符串（包含css合法颜色常量），返回对应的 rgb/rgba/Hex 格式的值
 * @param {String} ColorString 
 * @return {Object|Null} 返回 rgba / rgb / hex 或 null
 * 
 * @example
 * // 传入代表颜色字符串，提取rgb/rgba/hex数值
 * colorData('darkslategray') => {hex: "#2F4F4F",rgba: "rgb(47,79,79)",_rgb: "47,79,79"}
 * colorData('#E1FFFF') => {hex: "#E1FFFF",rgba: "rgb(225,255,255)",_rgb: "225,255,255"}
 * colorData('rgb(72,209,204)') => {rgba: "rgb(72,209,204)", _rgb: "72,209,204", hex: "#48d1cc"}
 * console.log(colorData('wrongColor')) => null
 */
export const colorData = function (colorStr) {
  if (isRgb(colorStr)) {
    return {
      rgba: colorStr,
      _rgb: getRgb(colorStr),
      hex: rgbToHex(colorStr).hex
    }
  } else if (isHex(colorStr)) {
    const rgba = hexToRgb(colorStr).rgba
    return {
      rgba: hexToRgb(colorStr).rgba,
      _rgb: getRgb(rgba),
      hex: colorStr
    }
  } else { 
    if (ColorMap[colorStr]) {
      return {
        rgba: `rgb(${ColorMap[colorStr].rgb})`,
        _rgb: ColorMap[colorStr].rgb,
        hex: ColorMap[colorStr].hex
      }
    } else {
      return null
    }
  }
}

/**
 * 生成不重复一定范围内随机颜色数组
 * @param {Number} number 生成数组长度
 * @param {Array} array [r, g, b] 初始颜色rgb 
 * @param {Object} object 颜色变化量， 默认{r: -5, g: -5, b: -5}  
 * @return {Array} 返回 颜色数组
 * 
 * @example
 * randomColors(10, [147, 39, 39], {r: -8, g: +9, b: -15})
 */
export const randomColors = function(
  number = 10, 
  origin = [255, 255, 255], 
  opts = {
    r: -5,
    g: -5,
    b: -5
  }) {
  const ori = origin
  const colors = []
  for (let index = 0; index < number; index++) {
    const _r = index * (opts && opts.r ? opts.r : -5) * (Math.random() - 0.5 > 0 ? 1 : -1)
    const _g = index * (opts && opts.g ? opts.g : -5) * (Math.random() - 0.5 > 0 ? 1 : -1)
    const _b = index * (opts && opts.b ? opts.b : -5) * (Math.random() - 0.5 > 0 ? 1 : -1)
    ori[0] = Math.max(0, Math.min(ori[0] + _r, 255))
    ori[1] = Math.max(0, Math.min(ori[1] + _g, 255))
    ori[2] = Math.max(0, Math.min(ori[2] + _b, 255))
    const color = colorData(`rgb(${ori[0]}, ${ori[1]}, ${ori[2]})`)
    colors.push(color)
  }
  for (let i = colors.length - 1; i >= 0; i--) { 
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = colors[randomIndex]; 
    colors[randomIndex] = colors[i];
    colors[i] = itemAtIndex;
  } 
  return colors
}