
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M736 544c-12.5 12.5-32.8 12.5-45.3 0L523.3 376.6c-6.2-6.2-16.4-6.2-22.6 0L333.3 544c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L466.7 320c25-25 65.5-25 90.5 0L736 498.7c12.5 12.5 12.5 32.8 0 45.3z"/>
    </svg>
  )
}

Vue.component('icon-window-up', Icon)
export default Icon

