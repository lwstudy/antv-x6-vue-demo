
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 608c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"/>
    </svg>
  )
}

Vue.component('icon-double-circle-fill', Icon)
export default Icon

