
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M774.9 640.5l-207.8 352c-12.4 21-33.8 31.5-55.1 31.5s-42.7-10.5-55.1-31.5l-207.8-352c-25.2-42.7 5.6-96.5 55.1-96.5h415.6c49.6 0 80.3 53.9 55.1 96.5z"/>
    </svg>
  )
}

Vue.component('icon-sort-down-fill', Icon)
export default Icon

