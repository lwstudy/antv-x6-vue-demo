
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 0L512 1024l-62.3-436.1c-1-7-6.5-12.6-13.6-13.6L0 512 1024 0z"/>
    </svg>
  )
}

Vue.component('icon-direction-fill', Icon)
export default Icon

