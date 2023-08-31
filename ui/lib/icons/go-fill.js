
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m344.8 518.1L557.2 772.8c-5.2 4.4-13.2 0.7-13.2-6.1V563.8L285 773.5c-5.2 4.2-13 0.5-13-6.2V256.8c0-6.7 7.8-10.4 13-6.2l259 209.6V257.3c0-6.8 8-10.5 13.2-6.1l299.7 254.7c3.7 3.2 3.7 9-0.1 12.2z"/>
    </svg>
  )
}

Vue.component('icon-go-fill', Icon)
export default Icon

