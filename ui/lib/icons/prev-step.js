
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m316.8 828.8c-41.2 41.2-89.1 73.5-142.4 96C631.2 948.2 572.5 960 512 960s-119.2-11.8-174.4-35.2c-53.3-22.6-101.3-54.9-142.4-96-41.2-41.2-73.5-89.1-96-142.4C75.8 631.2 64 572.5 64 512s11.8-119.2 35.2-174.4c22.6-53.3 54.9-101.3 96-142.4 41.2-41.2 89.1-73.5 142.4-96C392.8 75.8 451.5 64 512 64s119.2 11.8 174.4 35.2c53.3 22.6 101.3 54.9 142.4 96 41.2 41.2 73.5 89.1 96 142.4C948.2 392.8 960 451.5 960 512s-11.8 119.2-35.2 174.4c-22.5 53.3-54.8 101.2-96 142.4zM768 305.3v413.3c0 6.8-8 10.5-13.2 6.1L550.9 551v167.7c0 6.8-8 10.5-13.2 6.1L304 525.6V704h-64V320h64v178.4l233.7-199.1c5.2-4.4 13.2-0.7 13.2 6.1V473l203.9-173.7c5.2-4.5 13.2-0.8 13.2 6z"/>
    </svg>
  )
}

Vue.component('icon-prev-step', Icon)
export default Icon

