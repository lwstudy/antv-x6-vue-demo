
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M736 352v144c0 17.7-14.3 32-32 32s-32-14.3-32-32v-89.1c0-3.6-4.3-5.3-6.8-2.8L404.1 665.2c-2.5 2.5-0.7 6.8 2.8 6.8H496c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-35.3 0-64-28.7-64-64V528c0-17.7 14.3-32 32-32s32 14.3 32 32v89.1c0 3.6 4.3 5.3 6.8 2.8l261.1-261.1c2.5-2.5 0.7-6.8-2.8-6.8H528c-17.7 0-32-14.3-32-32s14.3-32 32-32h144c35.3 0 64 28.7 64 64z"/>
    </svg>
  )
}

Vue.component('icon-window-normal', Icon)
export default Icon

