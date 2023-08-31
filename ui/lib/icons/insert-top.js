
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 288.1L719.8 640H304.2L512 288.1m0-64c-21.4 0-42.7 10.5-55.1 31.5L249.1 607.4c-25.2 42.7 5.6 96.5 55.1 96.5h415.6c49.5 0 80.3-53.9 55.1-96.5L567.1 255.5c-12.4-20.9-33.8-31.4-55.1-31.4z"/>
    </svg>
  )
}

Vue.component('icon-insert-top', Icon)
export default Icon

