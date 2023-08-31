
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M128 208v552c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8V208c0-17.7-14.3-32-32-32H160c-17.7 0-32 14.3-32 32z m64 460V248c0-4.4 3.6-8 8-8h624c4.4 0 8 3.6 8 8v420c0 2.2-1.8 4-4 4H196c-2.2 0-4-1.8-4-4zM1024 808v24c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32v-24c0-4.4 3.6-8 8-8h432c4.4 0 8 3.6 8 8s3.6 8 8 8h112c4.4 0 8-3.6 8-8s3.6-8 8-8h432c4.4 0 8 3.6 8 8z"/>
    </svg>
  )
}

Vue.component('icon-notebook', Icon)
export default Icon

