
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M992 128H32c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h348c2.2 0 4 1.8 4 4v108H260c-2.2 0-4 1.8-4 4v40c0 2.2 1.8 4 4 4h504c2.2 0 4-1.8 4-4v-40c0-2.2-1.8-4-4-4H640V772c0-2.2 1.8-4 4-4h348c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32zM576 880H448v-96c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v96z"/>
    </svg>
  )
}

Vue.component('icon-lcd-fill', Icon)
export default Icon

