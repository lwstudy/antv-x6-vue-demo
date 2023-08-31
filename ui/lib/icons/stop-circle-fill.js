
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m208 716c0 2.2-1.8 4-4 4H308c-2.2 0-4-1.8-4-4V308c0-2.2 1.8-4 4-4h408c2.2 0 4 1.8 4 4v408z"/>
    </svg>
  )
}

Vue.component('icon-stop-circle-fill', Icon)
export default Icon

