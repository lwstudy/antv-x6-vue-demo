
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m256 397.3L485.3 680c-25 25-65.5 25-90.5 0L256 541.3c-12.5-12.5-12.5-32.8 0-45.3 6.3-6.3 14.4-9.4 22.6-9.4s16.4 3.1 22.6 9.4l127.4 127.4c6.2 6.2 16.4 6.2 22.6 0L722.7 352c12.5-12.5 32.8-12.5 45.3 0 6.3 6.3 9.4 14.4 9.4 22.6s-3.1 16.4-9.4 22.7z"/>
    </svg>
  )
}

Vue.component('icon-success-fill', Icon)
export default Icon

