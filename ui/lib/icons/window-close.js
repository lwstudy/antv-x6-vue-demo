
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M562.9 517.7l173.1 173c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-173-173.1c-3.1-3.1-8.2-3.1-11.3 0L333.3 736c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l173.1-173.1c3.1-3.1 3.1-8.2 0-11.3L288 333.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l173.1 173.1c3.1 3.1 8.2 3.1 11.3 0l173-173.1c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-173.1 173a8.15 8.15 0 0 0 0 11.4z"/>
    </svg>
  )
}

Vue.component('icon-window-close', Icon)
export default Icon

