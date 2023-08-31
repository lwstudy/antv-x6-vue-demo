
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M720 256V32c0-17.7-14.3-32-32-32H336c-17.7 0-32 14.3-32 32v224h-16c-35.3 0-64 28.7-64 64v672c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V320c0-35.3-28.7-64-64-64h-16zM372 64h280c2.2 0 4 1.8 4 4v188H368V68c0-2.2 1.8-4 4-4z m360 896H292c-2.2 0-4-1.8-4-4V336c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v620c0 2.2-1.8 4-4 4zM420 128c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h72c2.2 0 4-1.8 4-4v-56c0-2.2-1.8-4-4-4h-72zM532 128c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h72c2.2 0 4-1.8 4-4v-56c0-2.2-1.8-4-4-4h-72z"/>
    </svg>
  )
}

Vue.component('icon-usb', Icon)
export default Icon

