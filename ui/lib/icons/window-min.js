
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M640 672H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h256c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
    </svg>
  )
}

Vue.component('icon-window-min', Icon)
export default Icon

