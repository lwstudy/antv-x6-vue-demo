
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m-32 769V353c0-17.7 14.3-32 32-32s32 14.3 32 32v416c0 8.8-3.6 16.8-9.4 22.6-5.8 5.8-13.8 9.4-22.6 9.4-17.7 0-32-14.3-32-32z m64-543.5c0 8.8-3.6 16.8-9.4 22.6-5.8 5.8-13.8 9.4-22.6 9.4-17.7 0-32-14.3-32-32v-1c0-17.7 14.3-32 32-32s32 14.3 32 32v1z"/>
    </svg>
  )
}

Vue.component('icon-info-fill', Icon)
export default Icon

