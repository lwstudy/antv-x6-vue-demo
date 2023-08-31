
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M384 304.2L735.9 512 384 719.8V304.2m0.1-64.1c-33.4 0-64.1 26.7-64.1 64.1v415.6c0 37.4 30.7 64.1 64.1 64.1 10.8 0 22-2.8 32.4-9l351.9-207.8c41.9-24.8 41.9-85.4 0-110.2L416.5 249.1c-10.4-6.2-21.5-9-32.4-9z"/>
    </svg>
  )
}

Vue.component('icon-insert-right', Icon)
export default Icon

