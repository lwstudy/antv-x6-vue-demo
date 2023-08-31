
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M736 256h-16V32c0-17.7-14.3-32-32-32H336c-17.7 0-32 14.3-32 32v224h-16c-35.3 0-64 28.6-64 64v672c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V320c0-35.4-28.7-64-64-64zM368 68c0-2.2 1.8-4 4-4h280c2.2 0 4 1.8 4 4v188H368V68zM420 128c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h72c2.2 0 4-1.8 4-4v-56c0-2.2-1.8-4-4-4h-72zM532 128c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h72c2.2 0 4-1.8 4-4v-56c0-2.2-1.8-4-4-4h-72z"/>
    </svg>
  )
}

Vue.component('icon-usb-fill', Icon)
export default Icon

