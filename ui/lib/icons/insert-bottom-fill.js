
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M774.9 416.6L567.1 768.5c-12.4 21-33.8 31.5-55.1 31.5-21.4 0-42.7-10.5-55.1-31.5L249 416.6c-25.2-42.7 5.6-96.6 55.1-96.6h415.6c49.6 0 80.4 53.9 55.2 96.6z"/>
    </svg>
  )
}

Vue.component('icon-insert-bottom-fill', Icon)
export default Icon

