
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m256 718.7c0 6.8-8 10.5-13.2 6.1L550.9 551v167.7c0 6.8-8 10.5-13.2 6.1L304 525.6V704h-64V320h64v178.4l233.7-199.1c5.2-4.4 13.2-0.7 13.2 6.1V473l203.9-173.7c5.2-4.4 13.2-0.7 13.2 6.1v413.3z"/>
    </svg>
  )
}

Vue.component('icon-prev-step-fill', Icon)
export default Icon

