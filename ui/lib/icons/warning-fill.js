
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m-32 769v-1c0-17.7 14.3-32 32-32 8.8 0 16.8 3.6 22.6 9.4 5.8 5.8 9.4 13.8 9.4 22.6v1c0 17.7-14.3 32-32 32s-32-14.3-32-32z m64-128.5c0 17.7-14.3 32-32 32s-32-14.3-32-32v-416c0-17.7 14.3-32 32-32 8.8 0 16.8 3.6 22.6 9.4 5.8 5.8 9.4 13.8 9.4 22.6v416z"/>
    </svg>
  )
}

Vue.component('icon-warning-fill', Icon)
export default Icon

