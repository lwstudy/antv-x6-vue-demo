
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m256 512.9c-0.5 17.4-15.2 31.1-32.7 31.1H544c-35.3 0-64-28.7-64-64V160.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32v304c0 8.8 7.2 16 16 16h176c18 0 32.5 14.8 32 32.9z"/>
    </svg>
  )
}

Vue.component('icon-time-fill', Icon)
export default Icon

