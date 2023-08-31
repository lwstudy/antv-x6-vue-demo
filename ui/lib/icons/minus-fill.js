
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 432v160c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V432c0-8.8 7.2-16 16-16h992c8.8 0 16 7.2 16 16z"/>
    </svg>
  )
}

Vue.component('icon-minus-fill', Icon)
export default Icon

