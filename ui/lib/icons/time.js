
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m316.8 828.8c-41.2 41.2-89.1 73.5-142.4 96C631.2 948.2 572.5 960 512 960s-119.2-11.8-174.4-35.2c-53.3-22.6-101.3-54.9-142.4-96-41.2-41.2-73.5-89.1-96-142.4C75.8 631.2 64 572.5 64 512s11.8-119.2 35.2-174.4c22.6-53.3 54.9-101.3 96-142.4 41.2-41.2 89.1-73.5 142.4-96C392.8 75.8 451.5 64 512 64s119.2 11.8 174.4 35.2c53.3 22.6 101.3 54.9 142.4 96 41.2 41.2 73.5 89.1 96 142.4C948.2 392.8 960 451.5 960 512s-11.8 119.2-35.2 174.4c-22.5 53.3-54.8 101.2-96 142.4zM768 512.9c-0.5 17.4-15.2 31.1-32.7 31.1H544c-35.3 0-64-28.7-64-64V160.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32v304c0 8.8 7.2 16 16 16h176c18 0 32.5 14.8 32 32.9z"/>
    </svg>
  )
}

Vue.component('icon-time', Icon)
export default Icon

